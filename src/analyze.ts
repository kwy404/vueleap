import { promises as fs } from 'node:fs'
import path from 'node:path'
import { parse as parseTemplate } from '@vue/compiler-dom'
import { collectCompatFlags } from './compat.js'
import { FileContext } from './context.js'
import { listFiles, SCRIPT_EXTENSIONS, STYLE_EXTENSIONS } from './files.js'
import { RULES, RULES_BY_ID } from './rules.js'
import { scanPackageJson } from './scan/package.js'
import { scanScript, type ScriptLang } from './scan/script.js'
import { EMITS_INPUT, scanSfc } from './scan/sfc.js'
import { collectTransitionNames, scanStyle } from './scan/style.js'
import { scanTemplate } from './scan/template.js'
import type {
  AnalysisResult,
  AnalyzeOptions,
  EffortEstimate,
  Finding,
  RuleSummary,
  ScanWarning,
  Severity,
  Summary,
} from './types.js'
import { NAME, VERSION } from './version.js'

const SEVERITY_RANK: Record<Severity, number> = { error: 0, warning: 1, info: 2 }

function ruleFilter(options: AnalyzeOptions): (id: string) => boolean {
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
  const ext = path.extname(file).toLowerCase()
  try {
    if (file === 'package.json') {
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

/**
 * Scans a Vue 2 project and returns every finding that matters for Vue 3.
 *
 * @example
 * const result = await analyze('./my-app')
 * console.log(result.summary.error, result.compat.runtime)
 */
export async function analyze(projectDir: string, options: AnalyzeOptions = {}): Promise<AnalysisResult> {
  const root = path.resolve(projectDir)
  const stat = await fs.stat(root).catch(() => undefined)
  if (!stat?.isDirectory()) throw new Error(`Not a directory: ${root}`)
  const enabled = ruleFilter(options)

  const files = await listFiles(root, { ignore: options.ignore, gitignore: options.gitignore })
  const texts = new Map<string, string>()
  for (const file of files) texts.set(file, await fs.readFile(path.join(root, file), 'utf8'))

  const transitionNames = new Set(['v'])
  for (const [file, text] of texts) {
    if (file.endsWith('.vue') || STYLE_EXTENSIONS.has(path.extname(file).toLowerCase())) collectTransitionNames(text, transitionNames)
  }

  const findings: Finding[] = []
  const warnings: ScanWarning[] = []
  for (const [file, text] of texts) {
    const ctx = analyzeFile(file, text, transitionNames, enabled)
    findings.push(...ctx.findings)
    warnings.push(...ctx.warnings)
  }
  findings.sort((a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : a.line - b.line || a.column - b.column))

  return {
    tool: { name: NAME, version: VERSION },
    projectDir: root,
    findings,
    warnings,
    summary: summarize(findings, files.length),
    effort: estimateEffort(findings),
    compat: collectCompatFlags(findings),
  }
}
