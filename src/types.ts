export type Severity = 'error' | 'warning' | 'info'

export type RuleCategory = 'template' | 'script' | 'style' | 'dependencies'

export interface RuleMeta {
  /** Stable identifier, used in output and in `--rule` / `--skip-rule`. */
  id: string
  /** Short human title. */
  title: string
  severity: Severity
  category: RuleCategory
  /** Link to the official migration guide (or the library migration guide). */
  docs: string
  /** `@vue/compat` flags (runtime DeprecationTypes or COMPILER_* types) related to this rule. */
  compatFlags: string[]
  /** Whether `--fix` can rewrite at least some findings of this rule. */
  fixable: boolean
  /** Relative effort weight for a single finding, used by the effort score. */
  effort: number
  /** One or two sentences explaining what changed and what to do. */
  description: string
}

/** A text replacement in a file, expressed with absolute character offsets. */
export interface TextEdit {
  start: number
  end: number
  text: string
}

export interface Finding {
  ruleId: string
  severity: Severity
  message: string
  /** Path relative to the project root, always with forward slashes. */
  file: string
  /** 1 based line. */
  line: number
  /** 1 based column. */
  column: number
  endLine: number
  endColumn: number
  /** Link to the migration guide entry. */
  docs: string
  /** The `@vue/compat` flags that keep this code working on the migration build. */
  compatFlags: string[]
  /** True when `--fix` will rewrite this finding. */
  fixable: boolean
  /** The trimmed source line, handy for reports. */
  snippet: string
  /** Edits applied by `--fix`. Present only when `fixable` is true. */
  fix?: TextEdit[]
  /** Optional effort override (used by dependency findings). */
  effort?: number
}

export interface ScanWarning {
  file: string
  message: string
}

export interface AnalyzeOptions {
  /** Extra ignore patterns, gitignore syntax, relative to the project root. */
  ignore?: string[]
  /** Only run these rule ids. */
  rules?: string[]
  /** Never run these rule ids. */
  skipRules?: string[]
  /** Honor .gitignore files (default true). */
  gitignore?: boolean
}

export interface RuleSummary {
  ruleId: string
  title: string
  severity: Severity
  docs: string
  count: number
  fixable: number
}

export interface Summary {
  filesScanned: number
  filesWithFindings: number
  total: number
  error: number
  warning: number
  info: number
  fixable: number
  byRule: RuleSummary[]
}

export interface EffortEstimate {
  /** Weighted score. Roughly one point per hour of focused work on a typical codebase. */
  score: number
  level: 'none' | 'small' | 'moderate' | 'large' | 'very large'
}

export interface CompatFlags {
  /** Flags for `configureCompat()` at runtime. */
  runtime: string[]
  /** Flags for `compilerOptions.compatConfig` in the build tool. */
  compiler: string[]
}

export interface AnalysisResult {
  tool: { name: string; version: string }
  projectDir: string
  findings: Finding[]
  warnings: ScanWarning[]
  summary: Summary
  effort: EffortEstimate
  compat: CompatFlags
}
