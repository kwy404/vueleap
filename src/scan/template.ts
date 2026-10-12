import type {
  AttributeNode,
  DirectiveNode,
  ElementNode,
  ExpressionNode,
  RootNode,
  SimpleExpressionNode,
  TemplateChildNode,
} from '@vue/compiler-dom'
import type { FileContext } from '../context.js'
import { findFilters } from '../filters.js'

// Values of the compiler enums. They are stable across Vue 3 releases and
// hard coding them avoids depending on how enums are exported.
const ELEMENT = 1
const SIMPLE_EXPRESSION = 4
const INTERPOLATION = 5
const ATTRIBUTE = 6
const DIRECTIVE = 7
const TAG_TEMPLATE = 3

/** Key codes that map to exactly one Vue 3 key modifier. */
export const KEY_CODE_NAMES: Readonly<Record<string, string>> = {
  '8': 'backspace',
  '9': 'tab',
  '13': 'enter',
  '27': 'esc',
  '32': 'space',
  '37': 'left',
  '38': 'up',
  '39': 'right',
  '40': 'down',
}

const HOOK_EVENT_NAMES: Readonly<Record<string, string>> = {
  beforeDestroy: 'beforeUnmount',
  destroyed: 'unmounted',
}

const TRANSITION_TAGS = new Set(['transition', 'Transition', 'transition-group', 'TransitionGroup'])
const TRANSITION_GROUP_TAGS = new Set(['transition-group', 'TransitionGroup'])
const TRANSITION_CLASS_PROPS: Readonly<Record<string, string>> = {
  'enter-class': 'enter-from-class',
  'leave-class': 'leave-from-class',
  enterClass: 'enterFromClass',
  leaveClass: 'leaveFromClass',
}

/** Instance properties that changed, looked up in template expressions. */
const INSTANCE_PROPERTY = /(?<![\w$.])\$(listeners|scopedSlots|children|attrs|set|delete|destroy|on|off|once)\b/g

type Prop = AttributeNode | DirectiveNode

function modifierName(modifier: unknown): string {
  return typeof modifier === 'string' ? modifier : (modifier as SimpleExpressionNode).content
}

function staticArg(dir: DirectiveNode): SimpleExpressionNode | undefined {
  const arg = dir.arg as SimpleExpressionNode | undefined
  return arg && arg.type === SIMPLE_EXPRESSION && arg.isStatic ? arg : undefined
}

function isDirective(prop: Prop, name: string): prop is DirectiveNode {
  return prop.type === DIRECTIVE && prop.name === name
}

function hasProp(node: ElementNode, name: string): boolean {
  return node.props.some(
    (p) => (p.type === ATTRIBUTE && p.name === name) || (p.type === DIRECTIVE && p.name === 'bind' && staticArg(p)?.content === name),
  )
}

function findDirective(node: ElementNode, name: string): DirectiveNode | undefined {
  return node.props.find((p): p is DirectiveNode => isDirective(p, name))
}

export function scanTemplate(ctx: FileContext, root: RootNode | ElementNode): void {
  for (const child of root.children) walk(ctx, child)
}

function walk(ctx: FileContext, node: TemplateChildNode): void {
  if (node.type === INTERPOLATION) {
    checkExpression(ctx, node.content, true)
    return
  }
  if (node.type !== ELEMENT) return
  checkElement(ctx, node)
  for (const child of node.children) walk(ctx, child)
}

function checkExpression(ctx: FileContext, exp: ExpressionNode | undefined, filtersAllowed: boolean): void {
  if (!exp || exp.type !== SIMPLE_EXPRESSION) return
  const source = exp.loc.source
  const base = exp.loc.start.offset

  if (filtersAllowed) {
    for (const filter of findFilters(source)) {
      const at = base + filter.offset
      ctx.report(
        'filters',
        at,
        at + 1,
        `Filter "${filter.name}" used in a template expression. Call a method or use a computed property instead.`,
        { compatFlags: ['COMPILER_FILTERS'] },
      )
    }
  }

  for (const match of source.matchAll(INSTANCE_PROPERTY)) {
    const name = match[1]
    const at = base + (match.index ?? 0)
    const end = at + match[0].length
    switch (name) {
      case 'listeners':
        ctx.report('listeners', at, end, '$listeners is removed: listeners are now included in $attrs.')
        break
      case 'scopedSlots':
        ctx.report('scoped-slots', at, end, '$scopedSlots is removed: use $slots, which now exposes slots as functions.', {
          fix: [{ start: at, end, text: '$slots' }],
        })
        break
      case 'children':
        ctx.report('children', at, end, '$children is removed: use template refs.')
        break
      case 'attrs':
        ctx.report('attrs-class-style', at, end, '$attrs now also contains class and style.')
        break
      case 'set':
      case 'delete':
        ctx.report('set-delete', at, end, `$${name} is removed: assign or delete the property directly.`, {
          compatFlags: [name === 'set' ? 'INSTANCE_SET' : 'INSTANCE_DELETE'],
        })
        break
      case 'destroy':
        ctx.report('destroy', at, end, '$destroy is removed.')
        break
      default:
        ctx.report('event-emitter', at, end, `$${name} is removed: instances are no longer event emitters.`)
    }
  }
}

function checkElement(ctx: FileContext, node: ElementNode): void {
  const props = node.props as Prop[]
  const vFor = findDirective(node, 'for')
  const vIf = findDirective(node, 'if')

  if (vFor && vIf) {
    ctx.report(
      'v-if-v-for',
      vIf.loc.start.offset,
      vIf.loc.end.offset,
      'v-if and v-for on the same element: in Vue 3 v-if runs first and cannot see the loop variable.',
    )
  }

  if (vFor && node.tag === 'template' && node.tagType === TAG_TEMPLATE) {
    for (const child of node.children) {
      if (child.type !== ELEMENT) continue
      const key = (child.props as Prop[]).find(
        (p) => (p.type === ATTRIBUTE && p.name === 'key') || (p.type === DIRECTIVE && p.name === 'bind' && staticArg(p)?.content === 'key'),
      )
      if (key) {
        ctx.report(
          'template-v-for-key',
          key.loc.start.offset,
          key.loc.end.offset,
          `Move this key to the parent <template v-for>: keys on children of <template v-for> are a compile error in Vue 3.`,
        )
      }
    }
  }

  if (TRANSITION_GROUP_TAGS.has(node.tag) && !hasProp(node, 'tag')) {
    ctx.report(
      'transition-group-root',
      node.loc.start.offset,
      node.loc.start.offset + node.tag.length + 1,
      '<transition-group> without a tag prop no longer renders a wrapper <span>.',
    )
  }

  props.forEach((prop, index) => {
    if (prop.type === ATTRIBUTE) {
      checkAttribute(ctx, node, prop)
      return
    }
    switch (prop.name) {
      case 'bind':
        checkBind(ctx, node, prop, props.slice(0, index))
        break
      case 'on':
        checkOn(ctx, prop)
        break
      case 'slot':
      case 'for':
        break
      default:
        checkExpression(ctx, prop.exp, false)
    }
  })
}

function checkAttribute(ctx: FileContext, node: ElementNode, attr: AttributeNode): void {
  const start = attr.loc.start.offset
  const nameEnd = start + attr.name.length
  switch (attr.name) {
    case 'inline-template':
      ctx.report('inline-template', start, nameEnd, 'inline-template is removed: move the markup into the component or pass it as a slot.')
      break
    case 'slot':
      if (node.tag !== 'slot') {
        ctx.report('deprecated-slot-syntax', start, nameEnd, 'The slot attribute is removed: use v-slot (or #name) on a <template>.')
      }
      break
    case 'slot-scope':
      ctx.report('deprecated-slot-syntax', start, nameEnd, 'slot-scope is removed: use v-slot="props" (or #name="props").')
      break
    case 'scope':
      if (node.tag === 'template') {
        ctx.report('deprecated-slot-syntax', start, nameEnd, 'The scope attribute is removed: use v-slot="props".')
      }
      break
    case 'is':
      if (node.tag !== 'component' && !(attr.value?.content ?? '').startsWith('vue:')) {
        ctx.report(
          'is-on-element',
          start,
          attr.loc.end.offset,
          `is="${attr.value?.content ?? ''}" on <${node.tag}> creates a customized built-in element in Vue 3. Use is="vue:${attr.value?.content ?? ''}" to render a component.`,
        )
      }
      break
    default:
      if (TRANSITION_TAGS.has(node.tag) && TRANSITION_CLASS_PROPS[attr.name]) {
        const next = TRANSITION_CLASS_PROPS[attr.name]
        ctx.report('transition-classes', start, nameEnd, `${attr.name} is renamed to ${next}.`, {
          fix: [{ start, end: nameEnd, text: next }],
        })
      }
  }
}

function checkBind(ctx: FileContext, node: ElementNode, dir: DirectiveNode, before: Prop[]): void {
  const start = dir.loc.start.offset
  const modifiers = dir.modifiers.map(modifierName)
  const arg = staticArg(dir)
  const rawName = dir.rawName ?? ''

  checkExpression(ctx, dir.exp, true)

  if (modifiers.includes('sync')) {
    const exp = dir.exp as SimpleExpressionNode | undefined
    const canFix = Boolean(arg && exp && modifiers.length === 1 && rawName && ctx.text.startsWith(rawName, start))
    ctx.report(
      'sync-modifier',
      start,
      start + (rawName.length || 1),
      arg
        ? `.sync is removed: use v-model:${arg.content}="${exp?.content ?? ''}" instead.`
        : 'v-bind.sync with an object is removed: use one v-model:prop per property.',
      canFix && arg ? { fix: [{ start, end: start + rawName.length, text: `v-model:${arg.content}` }] } : {},
    )
  }

  if (!dir.arg && dir.exp && !modifiers.includes('sync')) {
    const overridden = before
      .map((p) => (p.type === ATTRIBUTE ? p.name : p.type === DIRECTIVE && p.name === 'bind' ? staticArg(p)?.content : undefined))
      .filter((name): name is string => Boolean(name) && !['class', 'style', 'key', 'ref'].includes(name as string))
    if (overridden.length > 0) {
      ctx.report(
        'v-bind-object-order',
        start,
        dir.loc.end.offset,
        `v-bind="${(dir.exp as SimpleExpressionNode).content}" comes after ${overridden.join(', ')}: in Vue 3 the object now overrides those attributes. Move it first to keep Vue 2 behavior.`,
      )
    }
  }

  if (arg?.content === 'is' && node.tag !== 'component') {
    ctx.report('is-on-element', start, dir.loc.end.offset, `:is on <${node.tag}> only renders a component with a "vue:" prefixed value in Vue 3.`)
  }

  if (arg && arg.content === 'slot' && node.tag !== 'slot') {
    ctx.report('deprecated-slot-syntax', start, start + (rawName.length || 1), 'The slot attribute is removed: use v-slot (or #name) on a <template>.')
  }

  if (arg && TRANSITION_TAGS.has(node.tag) && TRANSITION_CLASS_PROPS[arg.content]) {
    const next = TRANSITION_CLASS_PROPS[arg.content]
    ctx.report('transition-classes', arg.loc.start.offset, arg.loc.end.offset, `${arg.content} is renamed to ${next}.`, {
      fix: [{ start: arg.loc.start.offset, end: arg.loc.end.offset, text: next }],
    })
  }
}

function checkOn(ctx: FileContext, dir: DirectiveNode): void {
  checkExpression(ctx, dir.exp, false)
  const arg = staticArg(dir)

  for (const modifier of dir.modifiers) {
    const name = modifierName(modifier)
    const loc = typeof modifier === 'string' ? undefined : (modifier as SimpleExpressionNode).loc
    const start = loc ? loc.start.offset : dir.loc.start.offset
    const end = loc ? loc.end.offset : dir.loc.end.offset
    if (name === 'native') {
      ctx.report(
        'native-modifier',
        start - 1,
        end,
        `.native is removed: declare the events the child emits with "emits", other listeners fall through to its root element.`,
      )
    } else if (/^\d+$/.test(name)) {
      const key = KEY_CODE_NAMES[name]
      ctx.report(
        'keycode-modifiers',
        start - 1,
        end,
        key ? `KeyCode modifier .${name} is removed: use .${key}.` : `KeyCode modifier .${name} is removed: use the kebab-case key name instead.`,
        key && loc ? { fix: [{ start, end, text: key }] } : {},
      )
    }
  }

  if (arg && arg.content.startsWith('hook:')) {
    const hook = arg.content.slice(5)
    const next = `vue:${HOOK_EVENT_NAMES[hook] ?? hook}`
    ctx.report('hook-events', arg.loc.start.offset, arg.loc.end.offset, `@${arg.content} is now @${next}.`, {
      fix: [{ start: arg.loc.start.offset, end: arg.loc.end.offset, text: next }],
    })
  }
}
