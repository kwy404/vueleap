// Analysis and fixes for code held in memory. Nothing in this module touches
// the file system or Node built-ins, so it also runs in a browser.
import { parse as parseTemplate } from '@vue/compiler-dom'
import { collectCompatFlags } from './compat.js'
import { FileContext } from './context.js'
import { RULES, RULES_BY_ID } from './rules.js'
import { scanPackageJson } from './scan/package.js'
import { scanScript, type ScriptLang } from './scan/script.js'
import { EMITS_INPUT, scanSfc } from './scan/sfc.js'
import { collectTransitionNames, scanStyle } from './scan/style.js'
import { scanTemplate } from './scan/template.js'
import type {
  AnalyzeOptions,
  CompatFlags,
  EffortEstimate,
  Finding,
  RuleSummary,
  ScanWarning,
  Severity,
  Summary,
  TextEdit,
} from './types.js'

export const SCRIPT_EXTENSIONS = new Set(['.js', '.mjs', '.cjs', '.jsx', '.ts', '.mts', '.cts', '.tsx'])
export const STYLE_EXTENSIONS = new Set(['.css', '.scss', '.sass', '.less', '.styl', '.stylus', '.pcss', '.postcss'])

const SEVERITY_RANK: Record<Severity, number> = { error: 0, warning: 1, info: 2 }

/** Lowercase extension with the dot, like `path.extname` but without Node. */
export function extensionOf(file: string): string {
  const name = file.slice(file.lastIndexOf('/') + 1)
  const dot = name.lastIndexOf('.')
  return dot > 0 ? name.slice(dot).toLowerCase() : ''
}

export function ruleFilter(options: Pick<AnalyzeOptions, 'rules' | 'skipRules'>): (id: string) => boolean {
  for (const id of [...(options.rules ?? []), ...(options.skipRules ?? [])]) {
    if (!RULES_BY_ID.has(id)) throw new Error(`Unknown rule "${id}". Run "vueleap --list-rules" to see all rules.`)
  }
  const only = options.rules && options.rules.length > 0 ? new Set(options.rules) : undefined
  const skip = new Set(options.skipRules ?? [])
  return (id) => (!only || only.has(id)) && !skip.has(id)
}

function scriptLangFor(ext: string): ScriptLang {
  if (ext === '.ts' || ext === '.mts' || ext === '.cts') return 'ts'
  if (ext === '.tsx') return 'tsx'
  return 'jsx'
}

/**
 * Scans a template given as a string (for example `template: '...'` in a
 * component). The string is parsed behind a blank prefix of the same length
 * as the code before it, so every location is already a file offset.
 */
function templateStringScanner(ctx: FileContext): (content: string, offset: number) => void {
  return (content, offset) => {
    if (!content.includes('<')) return
    try {
      const padding = ctx.text.slice(0, offset).replace(/[^\r\n]/g, ' ')
      const ast = parseTemplate(padding + content, { onError: () => undefined })
      scanTemplate(ctx, ast)
    } catch {
      ctx.warn('Could not parse an inline template string, skipped.')
    }
  }
}

export function analyzeFile(file: string, text: string, transitionNames: ReadonlySet<string>, enabled: (id: string) => boolean): FileContext {
  const ctx = new FileContext(file, text, enabled)
  const ext = extensionOf(file)
  try {
    if (file === 'package.json' || file.endsWith('/package.json')) {
      scanPackageJson(ctx)
    } else if (ext === '.vue') {
      scanSfc(ctx, transitionNames, templateStringScanner(ctx))
    } else if (SCRIPT_EXTENSIONS.has(ext)) {
      scanScript(ctx, text, {
        offset: 0,
        lang: scriptLangFor(ext),
        isSfc: false,
        emitsInput: EMITS_INPUT.test(text),
        onTemplateString: templateStringScanner(ctx),
      })
    } else if (STYLE_EXTENSIONS.has(ext)) {
      scanStyle(ctx, text, 0, transitionNames)
    }
  } catch (error) {
    ctx.warn(`Analysis failed for this file: ${(error as Error).message}`)
  }
  return ctx
}

export function summarize(findings: readonly Finding[], filesScanned: number): Summary {
  const byRule = new Map<string, RuleSummary>()
  for (const finding of findings) {
    const rule = RULES_BY_ID.get(finding.ruleId)
    let entry = byRule.get(finding.ruleId)
    if (!entry) {
      entry = {
        ruleId: finding.ruleId,
        title: rule?.title ?? finding.ruleId,
        severity: finding.severity,
        docs: rule?.docs ?? finding.docs,
        count: 0,
        fixable: 0,
      }
      byRule.set(finding.ruleId, entry)
    }
    entry.count++
    if (finding.fixable) entry.fixable++
  }
  const order = new Map(RULES.map((rule, index) => [rule.id, index]))
  const rules = [...byRule.values()].sort(
    (a, b) =>
      SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity] ||
      b.count - a.count ||
      (order.get(a.ruleId) ?? 0) - (order.get(b.ruleId) ?? 0),
  )
  return {
    filesScanned,
    filesWithFindings: new Set(findings.map((f) => f.file)).size,
    total: findings.length,
    error: findings.filter((f) => f.severity === 'error').length,
    warning: findings.filter((f) => f.severity === 'warning').length,
    info: findings.filter((f) => f.severity === 'info').length,
    fixable: findings.filter((f) => f.fixable).length,
    byRule: rules,
  }
}

/**
 * Relative effort score. Each finding adds its rule weight (fixable findings
 * count for a tenth, since `--fix` handles them). As a rough guide one point
 * is about an hour of focused work, but treat it as a comparison tool.
 */
export function estimateEffort(findings: readonly Finding[]): EffortEstimate {
  let total = 0
  for (const finding of findings) {
    const weight = finding.effort ?? RULES_BY_ID.get(finding.ruleId)?.effort ?? 0.5
    total += finding.fixable ? weight / 10 : weight
  }
  const score = total === 0 ? 0 : Math.max(1, Math.round(total))
  const level: EffortEstimate['level'] =
    score === 0 ? 'none' : score < 8 ? 'small' : score < 40 ? 'moderate' : score < 120 ? 'large' : 'very large'
  return { score, level }
}

/** Applies non overlapping edits to a text. Overlapping edits are dropped, the first one wins. */
export function applyEdits(text: string, edits: readonly TextEdit[]): string {
  return applyEditsWithRanges(text, edits).text
}

function applyEditsWithRanges(text: string, edits: readonly TextEdit[]): { text: string; ranges: SourceRange[] } {
  const sorted = [...edits].sort((a, b) => a.start - b.start || a.end - b.end)
  let output = ''
  let cursor = 0
  const ranges: SourceRange[] = []
  for (const edit of sorted) {
    if (edit.start < cursor || edit.end < edit.start || edit.end > text.length) continue
    output += text.slice(cursor, edit.start)
    ranges.push({ start: output.length, end: output.length + edit.text.length })
    output += edit.text
    cursor = edit.end
  }
  return { text: output + text.slice(cursor), ranges }
}

export interface SourceOptions extends Pick<AnalyzeOptions, 'rules' | 'skipRules'> {
  /**
   * File name used to pick the parser: `.vue`, a script extension, a style
   * extension or `package.json`. Defaults to `Component.vue`.
   */
  filename?: string
}

export interface SourceAnalysis {
  filename: string
  findings: Finding[]
  warnings: ScanWarning[]
  summary: Summary
  effort: EffortEstimate
  compat: CompatFlags
}

/** A range of characters, as offsets into a text. */
export interface SourceRange {
  start: number
  end: number
}

export interface SourceFixResult {
  filename: string
  /** The code with every safe fix applied, or the input when nothing was fixable. */
  code: string
  /** The findings that were rewritten, with positions in the original code. */
  fixed: Finding[]
  /** Where the rewritten text sits in `code`, handy for highlighting it. */
  changes: SourceRange[]
  /** What is left to migrate by hand, with positions in `code`. */
  remaining: Finding[]
  /** The `@vue/compat` flags `code` still needs. */
  compat: CompatFlags
  warnings: ScanWarning[]
}

/**
 * Analyzes one file held in memory, for example a component pasted in an
 * editor. Works without a project folder and without Node built-ins.
 *
 * @example
 * const { findings } = analyzeSource(code, { filename: 'Price.vue' })
 */
export function analyzeSource(code: string, options: SourceOptions = {}): SourceAnalysis {
  const filename = (options.filename ?? 'Component.vue').replace(/\\/g, '/')
  const enabled = ruleFilter(options)
  const transitionNames = new Set(['v'])
  const ext = extensionOf(filename)
  if (ext === '.vue' || STYLE_EXTENSIONS.has(ext)) collectTransitionNames(code, transitionNames)
  const ctx = analyzeFile(filename, code, transitionNames, enabled)
  const findings = [...ctx.findings].sort((a, b) => a.line - b.line || a.column - b.column)
  return {
    filename,
    findings,
    warnings: ctx.warnings,
    summary: summarize(findings, 1),
    effort: estimateEffort(findings),
    compat: collectCompatFlags(findings),
  }
}

/**
 * Applies the safe automatic fixes to one file held in memory and reports
 * what is left to do by hand. The same codemods as `vueleap --fix`.
 *
 * @example
 * const { code: vue3, remaining } = fixSource(vue2Component)
 */
export function fixSource(code: string, options: SourceOptions = {}): SourceFixResult {
  const before = analyzeSource(code, options)
  const fixed = before.findings.filter((f) => f.fix)
  const { text, ranges } = applyEditsWithRanges(
    code,
    fixed.flatMap((f) => f.fix ?? []),
  )
  const after = text === code ? before : analyzeSource(text, options)
  return {
    filename: before.filename,
    code: text,
    fixed: text === code ? [] : fixed,
    changes: text === code ? [] : ranges,
    remaining: after.findings,
    compat: after.compat,
    warnings: after.warnings,
  }
}
