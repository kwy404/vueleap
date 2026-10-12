import type { FileContext } from '../context.js'

const TRANSITION_TAG_NAME = /<(?:transition|transition-group|Transition|TransitionGroup)\b[^>]*?\sname\s*=\s*["']([A-Za-z_][\w-]*)["']/g
const TRANSITION_ACTIVE_CLASS = /\.([A-Za-z_][\w-]*?)-(?:enter|leave)-(?:active|to)(?![\w-])/g
const OLD_TRANSITION_CLASS = /\.([A-Za-z_][\w-]*?)-(enter|leave)(?![\w-])/g

/**
 * Collects transition names used by a project: names given to `<transition>`
 * in templates, plus names that have `-enter-active` style classes in CSS.
 * Only classes built on these names are rewritten by `--fix`, so an unrelated
 * `.btn-enter` class is left alone.
 */
export function collectTransitionNames(text: string, names: Set<string>): void {
  for (const match of text.matchAll(TRANSITION_TAG_NAME)) names.add(match[1])
  for (const match of text.matchAll(TRANSITION_ACTIVE_CLASS)) names.add(match[1])
}

/** Replaces comments with spaces so offsets stay valid. */
function blankComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\r\n]/g, ' '))
}

export function scanStyle(ctx: FileContext, css: string, offset: number, transitionNames: ReadonlySet<string>): void {
  const source = blankComments(css)
  for (const match of source.matchAll(OLD_TRANSITION_CLASS)) {
    const name = match[1]
    if (!transitionNames.has(name)) continue
    const start = offset + (match.index ?? 0)
    const end = start + match[0].length
    const next = `${match[0]}-from`
    ctx.report('transition-classes', start, end, `${match[0]} is renamed to ${next} in Vue 3.`, {
      fix: [{ start: end, end, text: '-from' }],
    })
  }
}
