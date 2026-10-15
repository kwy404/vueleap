import { promises as fs } from 'node:fs'
import path from 'node:path'
import { collectCompatFlags } from './compat.js'
import { listFiles, STYLE_EXTENSIONS } from './files.js'
import { collectTransitionNames } from './scan/style.js'
import { analyzeFile, estimateEffort, ruleFilter, summarize } from './source.js'
import type { AnalysisResult, AnalyzeOptions, Finding, ScanWarning } from './types.js'
import { NAME, VERSION } from './version.js'

export { analyzeFile, estimateEffort, summarize }

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
