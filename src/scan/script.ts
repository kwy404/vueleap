import { parse, type ParserPlugin } from '@babel/parser'
import type * as t from '@babel/types'
import type { FileContext } from '../context.js'
import type { TextEdit } from '../types.js'

export type ScriptLang = 'js' | 'jsx' | 'ts' | 'tsx'

export interface ScriptScanOptions {
  /** Offset of the script inside the file (non zero for SFC blocks). */
  offset: number
  lang: ScriptLang
  /** True for the `<script>` block of a `.vue` file: its default export is a component. */
  isSfc: boolean
  /** True when the file calls `$emit('input')` somewhere. */
  emitsInput: boolean
  /** Called for `template: '...'` strings found in component options. */
  onTemplateString?: (content: string, offset: number) => void
}

type AnyNode = t.Node
type ObjectMember = t.ObjectProperty | t.ObjectMethod

const SKIP_KEYS = new Set(['loc', 'start', 'end', 'extra', 'leadingComments', 'trailingComments', 'innerComments', 'range', 'type'])

/** Option keys that only make sense on a Vue component definition. */
const COMPONENT_KEYS = new Set([
  'data',
  'props',
  'computed',
  'methods',
  'watch',
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'activated',
  'deactivated',
  'beforeDestroy',
  'destroyed',
  'components',
  'directives',
  'filters',
  'mixins',
  'extends',
  'render',
  'template',
  'inject',
  'provide',
  'inheritAttrs',
  'functional',
  'model',
  'emits',
  'setup',
])

/** Keys strong enough to identify a component (usually a mixin) on their own. */
const SOLO_COMPONENT_HOOKS = new Set(['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed'])
const SOLO_COMPONENT_MAPS = new Set(['methods', 'computed'])

const DESTROY_HOOKS: Readonly<Record<string, string>> = { beforeDestroy: 'beforeUnmount', destroyed: 'unmounted' }

const OLD_DIRECTIVE_HOOKS: Readonly<Record<string, string | null>> = {
  bind: 'beforeMount',
  inserted: 'mounted',
  update: null,
  componentUpdated: 'updated',
  unbind: 'unmounted',
}
const DISTINCT_DIRECTIVE_HOOKS = new Set(['inserted', 'componentUpdated', 'unbind'])
const ALL_DIRECTIVE_KEYS = new Set([
  ...Object.keys(OLD_DIRECTIVE_HOOKS),
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeUnmount',
  'unmounted',
  'deep',
  'getSSRProps',
])

const GLOBAL_API_FLAGS: Readonly<Record<string, string[]>> = {
  observable: ['GLOBAL_OBSERVABLE'],
  util: ['GLOBAL_PRIVATE_UTIL'],
}
const GLOBAL_API_REPLACEMENTS: Readonly<Record<string, string>> = {
  component: 'app.component()',
  use: 'app.use()',
  mixin: 'app.mixin()',
  directive: 'app.directive()',
  nextTick: "import { nextTick } from 'vue'",
  observable: "import { reactive } from 'vue'",
  version: "import { version } from 'vue'",
  compile: "import { compile } from 'vue'",
  util: 'nothing (private API removed)',
}
const CONFIG_FLAGS: Readonly<Record<string, string[]>> = {
  silent: ['CONFIG_SILENT'],
  devtools: ['CONFIG_DEVTOOLS'],
  optionMergeStrategies: ['CONFIG_OPTION_MERGE_STRATS'],
}

function isFunctionLike(node: AnyNode | null | undefined): boolean {
  return Boolean(
    node && (node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression' || node.type === 'ObjectMethod'),
  )
}

/** True when a value has the shape Vue expects for that option, so `{ destroyed: true }` is not a component. */
function plausibleOption(name: string, value: AnyNode): boolean {
  const fn = isFunctionLike(value) || value.type === 'Identifier'
  switch (name) {
    case 'data':
    case 'provide':
    case 'inject':
    case 'props':
    case 'emits':
      return fn || value.type === 'ObjectExpression' || value.type === 'ArrayExpression'
    case 'computed':
    case 'methods':
    case 'watch':
    case 'components':
    case 'directives':
    case 'filters':
    case 'model':
      return value.type === 'ObjectExpression' || value.type === 'Identifier'
    case 'mixins':
      return value.type === 'ArrayExpression'
    case 'extends':
      return value.type === 'Identifier' || value.type === 'ObjectExpression'
    case 'template':
      return value.type === 'StringLiteral' || value.type === 'TemplateLiteral'
    case 'inheritAttrs':
    case 'functional':
      return value.type === 'BooleanLiteral'
    default:
      return fn
  }
}

function unwrap(node: AnyNode | null | undefined): AnyNode | null | undefined {
  let current = node
  while (
    current &&
    (current.type === 'TSAsExpression' ||
      current.type === 'TSSatisfiesExpression' ||
      current.type === 'TSTypeAssertion' ||
      current.type === 'TSNonNullExpression' ||
      current.type === 'ParenthesizedExpression')
  ) {
    current = current.expression
  }
  return current
}

function keyName(member: AnyNode): string | undefined {
  if ((member.type !== 'ObjectProperty' && member.type !== 'ObjectMethod' && member.type !== 'ClassMethod') || member.computed) {
    return undefined
  }
  const key = member.key
  if (key.type === 'Identifier') return key.name
  if (key.type === 'StringLiteral') return key.value
  return undefined
}

function memberValue(member: ObjectMember): AnyNode {
  return member.type === 'ObjectMethod' ? member : member.value
}

function propertyName(node: t.MemberExpression | t.OptionalMemberExpression): string | undefined {
  if (!node.computed && node.property.type === 'Identifier') return node.property.name
  if (node.computed && node.property.type === 'StringLiteral') return node.property.value
  return undefined
}

function stringArg(node: AnyNode | undefined): string | undefined {
  if (!node) return undefined
  if (node.type === 'StringLiteral') return node.value
  if (node.type === 'TemplateLiteral' && node.expressions.length === 0) return node.quasis[0]?.value.cooked ?? undefined
  return undefined
}

function pluginsFor(lang: ScriptLang): ParserPlugin[] {
  const plugins: ParserPlugin[] = ['decorators-legacy']
  if (lang === 'ts' || lang === 'tsx') plugins.push('typescript')
  if (lang !== 'ts') plugins.push('jsx')
  return plugins
}

export function scanScript(ctx: FileContext, code: string, options: ScriptScanOptions): void {
  let program: t.File
  try {
    program = parse(code, {
      sourceType: 'module',
      errorRecovery: true,
      allowReturnOutsideFunction: true,
      allowImportExportEverywhere: true,
      allowAwaitOutsideFunction: true,
      plugins: pluginsFor(options.lang),
    })
  } catch (error) {
    ctx.warn(`Could not parse script, skipped: ${(error as Error).message}`)
    return
  }
  new ScriptScanner(ctx, options).run(program)
}

class ScriptScanner {
  private readonly vueNames = new Set(['Vue'])
  private readonly components = new WeakSet<AnyNode>()
  private readonly directives = new WeakSet<AnyNode>()
  private readonly checked = new WeakSet<AnyNode>()

  constructor(
    private readonly ctx: FileContext,
    private readonly options: ScriptScanOptions,
  ) {}

  run(file: t.File): void {
    for (const statement of file.program.body) {
      if (statement.type !== 'ImportDeclaration' || statement.source.value !== 'vue') continue
      for (const spec of statement.specifiers) {
        if (spec.type === 'ImportDefaultSpecifier' || spec.type === 'ImportNamespaceSpecifier') this.vueNames.add(spec.local.name)
      }
    }
    this.walk(file.program, [])
  }

  private start(node: AnyNode): number {
    return (node.start ?? 0) + this.options.offset
  }

  private end(node: AnyNode): number {
    return (node.end ?? 0) + this.options.offset
  }

  private report(ruleId: string, node: AnyNode, message: string, extra: { compatFlags?: string[]; fix?: TextEdit[] } = {}): void {
    this.ctx.report(ruleId, this.start(node), this.end(node), message, extra)
  }

  private walk(node: AnyNode, ancestors: AnyNode[]): void {
    this.enter(node, ancestors)
    ancestors.push(node)
    for (const key of Object.keys(node)) {
      if (SKIP_KEYS.has(key)) continue
      const value = (node as unknown as Record<string, unknown>)[key]
      if (Array.isArray(value)) {
        for (const item of value) {
          if (item && typeof item === 'object' && typeof (item as AnyNode).type === 'string') this.walk(item as AnyNode, ancestors)
        }
      } else if (value && typeof value === 'object' && typeof (value as AnyNode).type === 'string') {
        this.walk(value as AnyNode, ancestors)
      }
    }
    ancestors.pop()
  }

  private enter(node: AnyNode, ancestors: AnyNode[]): void {
    const parent = ancestors[ancestors.length - 1]
    switch (node.type) {
      case 'ImportDeclaration':
        this.checkImport(node)
        break
      case 'ExportDefaultDeclaration': {
        const decl = unwrap(node.declaration as AnyNode)
        if (decl?.type === 'ObjectExpression' && (this.options.isSfc || this.looksLikeComponent(decl))) this.components.add(decl)
        break
      }
      case 'NewExpression':
        if (node.callee.type === 'Identifier' && this.vueNames.has(node.callee.name)) {
          this.ctx.report(
            'global-mount',
            this.start(node),
            this.end(node.callee),
            'new Vue() is removed: create the app with createApp(App) and call app.mount().',
          )
          const options = unwrap(node.arguments[0] as AnyNode)
          if (options?.type === 'ObjectExpression') this.components.add(options)
        }
        break
      case 'CallExpression':
        this.markCallContext(node)
        break
      case 'MemberExpression':
      case 'OptionalMemberExpression':
        this.checkMember(node, parent, ancestors)
        break
      case 'ObjectExpression':
        this.checkObject(node)
        break
      case 'ClassDeclaration':
      case 'ClassExpression':
        this.checkClass(node)
        break
    }
  }

  private checkImport(node: t.ImportDeclaration): void {
    const source = node.source.value
    if (source === '@vue/composition-api') {
      this.report('composition-api-plugin', node.source, "@vue/composition-api is built into Vue 3: import these APIs from 'vue' and remove the plugin.")
      return
    }
    if (source !== 'vue') return
    for (const spec of node.specifiers) {
      if (spec.type !== 'ImportSpecifier') continue
      const imported = spec.imported.type === 'Identifier' ? spec.imported.name : spec.imported.value
      if (imported === 'set' || imported === 'del') {
        this.report('set-delete', spec, `"${imported}" is exported by Vue 2.7 but not by Vue 3: assign or delete the property directly.`, {
          compatFlags: [imported === 'set' ? 'GLOBAL_SET' : 'GLOBAL_DELETE'],
        })
      }
    }
  }

  private markCallContext(node: t.CallExpression): void {
    const callee = node.callee
    const first = unwrap(node.arguments[0] as AnyNode)
    const second = unwrap(node.arguments[1] as AnyNode)
    if (callee.type === 'Identifier' && callee.name === 'defineComponent' && first?.type === 'ObjectExpression') {
      this.components.add(first)
      return
    }
    if (callee.type !== 'MemberExpression') return
    const name = propertyName(callee)
    const isVue = callee.object.type === 'Identifier' && this.vueNames.has(callee.object.name)
    if (name === 'directive' && second?.type === 'ObjectExpression') this.directives.add(second)
    if (!isVue) return
    if (name === 'component' && second?.type === 'ObjectExpression') this.components.add(second)
    if ((name === 'extend' || name === 'mixin') && first?.type === 'ObjectExpression') this.components.add(first)
  }

  private checkMember(node: t.MemberExpression | t.OptionalMemberExpression, parent: AnyNode | undefined, ancestors: AnyNode[]): void {
    const name = propertyName(node)
    if (!name) return

    if (node.object.type === 'Identifier' && this.vueNames.has(node.object.name)) {
      this.checkGlobal(node, name, parent, ancestors)
      return
    }

    switch (name) {
      case '$listeners':
        this.report('listeners', node.property, '$listeners is removed: listeners are now included in $attrs.')
        break
      case '$scopedSlots': {
        const fix = !node.computed
          ? [{ start: this.start(node.property), end: this.end(node.property), text: '$slots' }]
          : undefined
        this.report('scoped-slots', node.property, '$scopedSlots is removed: use $slots, which now exposes slots as functions.', { fix })
        break
      }
      case '$children':
        this.report('children', node.property, '$children is removed: use template refs to access child components.')
        break
      case '$destroy':
        this.report('destroy', node.property, '$destroy is removed: unmount the app or remove the component with v-if.')
        break
      case '$set':
      case '$delete':
        this.report('set-delete', node.property, `${name} is removed: ${name === '$set' ? 'assign the property directly' : 'use the delete operator'}, Vue 3 tracks it.`, {
          compatFlags: [name === '$set' ? 'INSTANCE_SET' : 'INSTANCE_DELETE'],
        })
        break
      case '$attrs':
        this.report('attrs-class-style', node.property, '$attrs now also contains class and style (and listeners).')
        break
      case '$on':
      case '$off':
      case '$once': {
        const event = parent?.type === 'CallExpression' && parent.callee === node ? stringArg(parent.arguments[0] as AnyNode) : undefined
        if (event?.startsWith('hook:')) {
          this.report('hook-events', node.property, `${name}('${event}') no longer works: use the lifecycle hook directly, or @vue:${DESTROY_HOOKS[event.slice(5)] ?? event.slice(5)} on the parent template.`, {
            compatFlags: ['INSTANCE_EVENT_HOOKS', 'INSTANCE_EVENT_EMITTER'],
          })
        } else {
          this.report('event-emitter', node.property, `${name} is removed: instances are no longer event emitters (use props and emits, provide/inject, a store, or mitt).`)
        }
        break
      }
    }
  }

  private checkGlobal(node: t.MemberExpression | t.OptionalMemberExpression, name: string, parent: AnyNode | undefined, ancestors: AnyNode[]): void {
    const vue = (node.object as t.Identifier).name
    switch (name) {
      case 'set':
      case 'delete':
        this.report('set-delete', node, `${vue}.${name} is removed: ${name === 'set' ? 'assign the property directly' : 'use the delete operator'}, Vue 3 tracks it.`, {
          compatFlags: [name === 'set' ? 'GLOBAL_SET' : 'GLOBAL_DELETE'],
        })
        return
      case 'extend':
        this.report('global-extend', node, `${vue}.extend is removed: use defineComponent() or the extends option.`)
        return
      case 'prototype':
        this.report('global-prototype', node, `${vue}.prototype is removed: use app.config.globalProperties or provide/inject.`)
        return
      case 'filter':
        this.report('filters', node, `${vue}.filter is removed: expose a helper through app.config.globalProperties or import a function.`, {
          compatFlags: ['FILTERS'],
        })
        return
      case 'config':
        this.checkConfig(node, parent, ancestors)
        return
    }
    const replacement = GLOBAL_API_REPLACEMENTS[name]
    if (replacement) {
      this.report('global-api', node, `${vue}.${name} is removed from the global API: use ${replacement}.`, {
        compatFlags: GLOBAL_API_FLAGS[name] ?? [],
      })
    }
  }

  private checkConfig(node: t.MemberExpression | t.OptionalMemberExpression, parent: AnyNode | undefined, ancestors: AnyNode[]): void {
    const option =
      parent && (parent.type === 'MemberExpression' || parent.type === 'OptionalMemberExpression') && parent.object === node
        ? propertyName(parent)
        : undefined
    const target = option && parent ? parent : node
    switch (option) {
      case 'productionTip': {
        const assignment = ancestors[ancestors.length - 2]
        const statement = ancestors[ancestors.length - 3]
        let fix: TextEdit[] | undefined
        if (assignment?.type === 'AssignmentExpression' && assignment.left === parent && statement?.type === 'ExpressionStatement') {
          fix = [this.removeStatement(statement)]
        }
        this.report('config-production-tip', target, 'Vue.config.productionTip is removed: delete this line.', { fix })
        return
      }
      case 'ignoredElements':
        this.report('config-ignored-elements', target, 'Vue.config.ignoredElements is removed: use compilerOptions.isCustomElement (a function).')
        return
      case 'keyCodes':
        this.report('config-key-codes', target, 'Vue.config.keyCodes is removed: use kebab-case key names in v-on modifiers.')
        return
      default:
        this.report('global-config', target, `Vue.config${option ? `.${option}` : ''} is not available in Vue 3: use app.config on the instance returned by createApp().`, {
          compatFlags: option ? (CONFIG_FLAGS[option] ?? []) : [],
        })
    }
  }

  /** Removes a statement and, when it is alone on its line, the whole line. */
  private removeStatement(statement: AnyNode): TextEdit {
    const text = this.ctx.text
    let start = this.start(statement)
    let end = this.end(statement)
    const lineStart = text.lastIndexOf('\n', start - 1) + 1
    let after = end
    while (text[after] === ' ' || text[after] === '\t') after++
    if (text.slice(lineStart, start).trim() === '') {
      if (text[after] === '\r') after++
      if (text[after] === '\n' || after >= text.length) {
        start = lineStart
        end = Math.min(after + 1, text.length)
      }
    }
    return { start, end, text: '' }
  }

  private looksLikeComponent(node: t.ObjectExpression): boolean {
    let strong = 0
    let solo = false
    for (const member of node.properties) {
      const name = keyName(member)
      if (!name || !COMPONENT_KEYS.has(name)) continue
      const value = memberValue(member as ObjectMember)
      if (!plausibleOption(name, unwrap(value) ?? value)) continue
      strong++
      if (SOLO_COMPONENT_HOOKS.has(name) && isFunctionLike(value)) solo = true
      if (SOLO_COMPONENT_MAPS.has(name) && value.type === 'ObjectExpression') solo = true
    }
    return strong >= 2 || solo
  }

  private looksLikeDirective(node: t.ObjectExpression): boolean {
    if (node.properties.length === 0) return false
    let hasOld = false
    let distinct = false
    let elParam = false
    for (const member of node.properties) {
      const name = keyName(member)
      if (!name || !ALL_DIRECTIVE_KEYS.has(name)) return false
      if (name in OLD_DIRECTIVE_HOOKS) hasOld = true
      if (DISTINCT_DIRECTIVE_HOOKS.has(name)) distinct = true
      const value = memberValue(member as ObjectMember)
      if (isFunctionLike(value)) {
        const param = (value as t.Function).params[0]
        if (param?.type === 'Identifier' && param.name === 'el') elParam = true
      }
    }
    return hasOld && (distinct || elParam)
  }

  private checkObject(node: t.ObjectExpression): void {
    if (this.checked.has(node)) return
    if (this.components.has(node) || this.looksLikeComponent(node)) {
      this.checked.add(node)
      this.checkComponent(node)
    } else if (this.directives.has(node) || this.looksLikeDirective(node)) {
      this.checked.add(node)
      this.checkDirective(node)
    }
  }

  /** Builds an edit that renames an object key, keeping shorthand properties valid. */
  private renameKey(member: AnyNode, next: string): TextEdit[] | undefined {
    if (member.type !== 'ObjectProperty' && member.type !== 'ObjectMethod' && member.type !== 'ClassMethod') return undefined
    if (member.computed) return undefined
    const key = member.key
    if (member.type === 'ObjectProperty' && member.shorthand && key.type === 'Identifier') {
      return [{ start: this.start(member), end: this.end(member), text: `${next}: ${key.name}` }]
    }
    if (key.type === 'Identifier') return [{ start: this.start(key), end: this.end(key), text: next }]
    if (key.type === 'StringLiteral') return [{ start: this.start(key) + 1, end: this.end(key) - 1, text: next }]
    return undefined
  }

  private checkComponent(node: t.ObjectExpression): void {
    const names = new Set(node.properties.map((m) => keyName(m)).filter(Boolean))
    const members = node.properties.filter((m): m is ObjectMember => m.type === 'ObjectProperty' || m.type === 'ObjectMethod')

    for (const member of members) {
      const name = keyName(member)
      if (!name) continue
      const value = memberValue(member)
      switch (name) {
        case 'beforeDestroy':
        case 'destroyed': {
          if (!isFunctionLike(value) && value.type !== 'Identifier') break
          const next = DESTROY_HOOKS[name]
          this.report('destroy-hooks', member.key, `${name} is renamed to ${next} and is ignored by Vue 3.`, {
            compatFlags: [name === 'beforeDestroy' ? 'OPTIONS_BEFORE_DESTROY' : 'OPTIONS_DESTROYED'],
            fix: names.has(next) ? undefined : this.renameKey(member, next),
          })
          break
        }
        case 'data':
          if (unwrap(value)?.type === 'ObjectExpression') {
            this.report('data-object', member.key, 'data must be a function: use data() { return { ... } }.')
          }
          break
        case 'filters':
          if (value.type === 'ObjectExpression') {
            for (const filter of value.properties) {
              const filterName = keyName(filter)
              if (!filterName) continue
              this.report('filters', (filter as ObjectMember).key, `Local filter "${filterName}" is removed: turn it into a method or a computed property.`, {
                compatFlags: ['FILTERS'],
              })
            }
          }
          break
        case 'functional':
          if (value.type === 'BooleanLiteral' && value.value) {
            this.report('functional-components', member, 'functional: true is removed: use a regular component or a plain function.')
          }
          break
        case 'model':
          if (value.type === 'ObjectExpression') {
            this.report('component-v-model', member.key, 'The model option is removed: v-model now uses the modelValue prop and the update:modelValue event (or v-model:name arguments).')
          }
          break
        case 'props':
          if (this.options.emitsInput && !names.has('model')) this.checkValueProp(value)
          break
        case 'render':
          if (isFunctionLike(value)) {
            const param = (value as t.Function).params[0]
            if (param) {
              this.report('render-function-h', param, `render(${param.type === 'Identifier' ? param.name : 'h'}) no longer receives h: import { h } from 'vue' and update the VNode props format.`)
            }
          }
          break
        case 'directives':
          if (value.type === 'ObjectExpression') {
            for (const dir of value.properties) {
              if (dir.type !== 'ObjectProperty') continue
              const def = unwrap(dir.value)
              if (def?.type === 'ObjectExpression') this.directives.add(def)
            }
          }
          break
        case 'watch':
          if (value.type === 'ObjectExpression') this.checkWatch(node, value)
          break
        case 'template': {
          const inner = unwrap(value)
          if (!this.options.onTemplateString || !inner) break
          if (inner.type === 'StringLiteral' && String(inner.extra?.raw ?? '').slice(1, -1) === inner.value) {
            this.options.onTemplateString(inner.value, this.start(inner) + 1)
          } else if (inner.type === 'TemplateLiteral' && inner.expressions.length === 0) {
            const quasi = inner.quasis[0]
            if (quasi && quasi.value.raw === quasi.value.cooked) this.options.onTemplateString(quasi.value.raw, this.start(quasi))
          }
          break
        }
      }
    }
  }

  private checkValueProp(value: AnyNode): void {
    const props = unwrap(value)
    const message = "Prop \"value\" combined with $emit('input'): v-model on components now passes modelValue and listens to update:modelValue."
    if (props?.type === 'ArrayExpression') {
      for (const element of props.elements) {
        if (element?.type === 'StringLiteral' && element.value === 'value') this.report('component-v-model', element, message)
      }
    } else if (props?.type === 'ObjectExpression') {
      for (const member of props.properties) {
        if (keyName(member) === 'value') this.report('component-v-model', (member as ObjectMember).key, message)
      }
    }
  }

  private checkWatch(component: t.ObjectExpression, watch: t.ObjectExpression): void {
    const arrays = this.arrayDataKeys(component)
    if (arrays.size === 0) return
    for (const member of watch.properties) {
      const name = keyName(member)
      if (!name || !arrays.has(name)) continue
      const value = unwrap(memberValue(member as ObjectMember))
      if (value?.type === 'ObjectExpression') {
        const deep = value.properties.some((p) => keyName(p) === 'deep' && p.type === 'ObjectProperty' && p.value.type === 'BooleanLiteral' && p.value.value)
        if (deep) continue
      }
      this.report('watch-array', (member as ObjectMember).key, `"${name}" is an array: this watcher only fires when the array is replaced. Add deep: true to react to mutations.`)
    }
  }

  private arrayDataKeys(component: t.ObjectExpression): Set<string> {
    const keys = new Set<string>()
    const data = component.properties.find((m) => keyName(m) === 'data') as ObjectMember | undefined
    if (!data) return keys
    const fn = memberValue(data)
    let returned: AnyNode | null | undefined
    if (fn.type === 'ArrowFunctionExpression' && fn.body.type !== 'BlockStatement') {
      returned = unwrap(fn.body)
    } else if (isFunctionLike(fn)) {
      const body = (fn as t.Function).body
      if (body.type === 'BlockStatement') {
        const ret = body.body.find((s): s is t.ReturnStatement => s.type === 'ReturnStatement')
        returned = unwrap(ret?.argument)
      }
    }
    if (returned?.type !== 'ObjectExpression') return keys
    for (const member of returned.properties) {
      const name = keyName(member)
      if (name && member.type === 'ObjectProperty' && unwrap(member.value)?.type === 'ArrayExpression') keys.add(name)
    }
    return keys
  }

  private checkDirective(node: t.ObjectExpression): void {
    const names = new Set(node.properties.map((m) => keyName(m)).filter(Boolean))
    for (const member of node.properties) {
      const name = keyName(member)
      if (!name || !(name in OLD_DIRECTIVE_HOOKS)) continue
      const next = OLD_DIRECTIVE_HOOKS[name]
      const key = (member as ObjectMember).key
      if (next === null) {
        this.report('directive-hooks', key, 'The update directive hook is removed: use updated (or beforeUpdate) instead.', { compatFlags: ['CUSTOM_DIR'] })
        continue
      }
      this.report('directive-hooks', key, `Directive hook ${name} is renamed to ${next}.`, {
        fix: names.has(next) ? undefined : this.renameKey(member, next),
      })
    }
  }

  private checkClass(node: t.ClassDeclaration | t.ClassExpression): void {
    const decorated = (node.decorators ?? []).some((d) => {
      const expr = d.expression.type === 'CallExpression' ? d.expression.callee : d.expression
      return expr.type === 'Identifier' && (expr.name === 'Component' || expr.name === 'Options')
    })
    const superClass = node.superClass
    const extendsVue =
      (superClass?.type === 'Identifier' && this.vueNames.has(superClass.name)) ||
      (superClass?.type === 'CallExpression' && superClass.callee.type === 'Identifier' && superClass.callee.name === 'Mixins')
    if (!decorated && !extendsVue) return
    const names = new Set(node.body.body.map((m) => keyName(m)).filter(Boolean))
    for (const member of node.body.body) {
      if (member.type !== 'ClassMethod') continue
      const name = keyName(member)
      if (name === 'beforeDestroy' || name === 'destroyed') {
        const next = DESTROY_HOOKS[name]
        this.report('destroy-hooks', member.key, `${name} is renamed to ${next} and is ignored by Vue 3.`, {
          compatFlags: [name === 'beforeDestroy' ? 'OPTIONS_BEFORE_DESTROY' : 'OPTIONS_DESTROYED'],
          fix: names.has(next) ? undefined : this.renameKey(member, next),
        })
      } else if (name === 'render' && member.params[0]) {
        this.report('render-function-h', member.params[0], "render(h) no longer receives h: import { h } from 'vue'.")
      }
    }
  }
}
