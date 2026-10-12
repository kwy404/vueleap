import { compatSnippet } from '../compat.js'
import type { FileFix } from '../fix.js'
import type { AnalysisResult } from '../types.js'

/** JSON friendly view of a result: positions and metadata, without internal edit lists. */
export function toJson(result: AnalysisResult, fixes?: readonly FileFix[]): Record<string, unknown> {
  return {
    schemaVersion: 1,
    tool: result.tool,
    projectDir: result.projectDir,
    summary: result.summary,
    effort: result.effort,
    compat: { ...result.compat, snippet: compatSnippet(result.compat) },
    findings: result.findings.map(({ fix: _fix, effort: _effort, ...finding }) => finding),
    warnings: result.warnings,
    ...(fixes ? { fixes: fixes.map((f) => ({ file: f.file, count: f.count, diff: f.diff })) } : {}),
  }
}

export function formatJson(result: AnalysisResult, fixes?: readonly FileFix[]): string {
  return `${JSON.stringify(toJson(result, fixes), null, 2)}\n`
}
