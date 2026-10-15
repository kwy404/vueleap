export { analyze, analyzeFile, estimateEffort, summarize } from './analyze.js'
export { collectCompatFlags, compatSnippet, COMPILER_FLAGS } from './compat.js'
export { applyEdits, fix, planFixes } from './fix.js'
export type { FileFix, FixOptions, FixResult } from './fix.js'
export { findFilters } from './filters.js'
export { listFiles } from './files.js'
export { analyzeSource, fixSource } from './source.js'
export type { SourceAnalysis, SourceFixResult, SourceOptions, SourceRange } from './source.js'
export { formatHtml } from './report/html.js'
export type { HtmlOptions } from './report/html.js'
export { formatJson, toJson } from './report/json.js'
export { formatDiff, formatPretty } from './report/pretty.js'
export type { PrettyOptions } from './report/pretty.js'
export { getRule, RULES, RULES_BY_ID } from './rules.js'
export { VERSION } from './version.js'
export type {
  AnalysisResult,
  AnalyzeOptions,
  CompatFlags,
  EffortEstimate,
  Finding,
  RuleCategory,
  RuleMeta,
  RuleSummary,
  ScanWarning,
  Severity,
  Summary,
  TextEdit,
} from './types.js'
