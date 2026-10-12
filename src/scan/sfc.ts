import { parse as parseSfc } from '@vue/compiler-sfc'
import type { FileContext } from '../context.js'
import { scanScript, type ScriptLang } from './script.js'
import { scanStyle } from './style.js'
import { scanTemplate } from './template.js'

export const EMITS_INPUT = /\$emit\(\s*['"`]input['"`]/

function scriptLang(lang: string | undefined): ScriptLang {
  if (lang === 'ts' || lang === 'tsx' || lang === 'jsx') return lang
  return 'js'
}

export function scanSfc(
  ctx: FileContext,
  transitionNames: ReadonlySet<string>,
  onTemplateString: (content: string, offset: number) => void,
): void {
  const { descriptor, errors: allErrors } = parseSfc(ctx.text, { filename: ctx.file, sourceMap: false })
  // <template functional> is reported as a finding below, not as a parse problem.
  const errors = allErrors.filter((e) => !(typeof e === 'string' ? e : e.message).includes('<template functional>'))
  if (errors.length > 0) {
    const first = errors[0]
    ctx.warn(`Parse error, results may be incomplete: ${typeof first === 'string' ? first : first.message}`)
  }

  const template = descriptor.template
  if (template) {
    if (template.src) {
      ctx.warn(`Template loaded from "${template.src}" was not scanned.`)
    } else if (template.lang && template.lang !== 'html') {
      ctx.warn(`Skipped <template lang="${template.lang}">: only HTML templates are analyzed. Script and style checks still ran.`)
    } else if (template.ast) {
      scanTemplate(ctx, template.ast)
    }
    if (template.attrs.functional) {
      const tagStart = ctx.text.lastIndexOf('<template', template.loc.start.offset)
      const attr = ctx.text.indexOf('functional', tagStart)
      const start = attr === -1 || attr > template.loc.start.offset ? tagStart : attr
      ctx.report(
        'functional-components',
        start,
        start + 'functional'.length,
        '<template functional> is removed: use a regular component (or a plain function).',
      )
    }
  }

  const emitsInput = EMITS_INPUT.test(ctx.text)
  for (const block of [descriptor.script, descriptor.scriptSetup]) {
    if (!block || block.src) continue
    scanScript(ctx, block.content, {
      offset: block.loc.start.offset,
      lang: scriptLang(block.lang),
      isSfc: block === descriptor.script,
      emitsInput,
      onTemplateString,
    })
  }

  for (const style of descriptor.styles) {
    if (style.src) continue
    scanStyle(ctx, style.content, style.loc.start.offset, transitionNames)
  }
}
