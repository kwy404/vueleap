import { getRule } from './rules.js'
import type { Finding, ScanWarning, TextEdit } from './types.js'

export interface ReportOptions {
  /** Override the compat flags of the rule for this finding. */
  compatFlags?: string[]
  fix?: TextEdit[]
  docs?: string
  effort?: number
}

/** Holds one file's text and collects findings with exact positions. */
export class FileContext {
  readonly findings: Finding[] = []
  readonly warnings: ScanWarning[] = []
  private readonly lineStarts: number[]

  constructor(
    readonly file: string,
    readonly text: string,
    private readonly enabled: (ruleId: string) => boolean,
  ) {
    this.lineStarts = [0]
    for (let i = 0; i < text.length; i++) {
      if (text.charCodeAt(i) === 10) this.lineStarts.push(i + 1)
    }
  }

  isEnabled(ruleId: string): boolean {
    return this.enabled(ruleId)
  }

  position(offset: number): { line: number; column: number } {
    let low = 0
    let high = this.lineStarts.length - 1
    while (low < high) {
      const mid = (low + high + 1) >> 1
      if (this.lineStarts[mid] <= offset) low = mid
      else high = mid - 1
    }
    return { line: low + 1, column: offset - this.lineStarts[low] + 1 }
  }

  lineText(line: number): string {
    const start = this.lineStarts[line - 1] ?? 0
    const next = this.lineStarts[line]
    const end = next === undefined ? this.text.length : next - 1
    return this.text.slice(start, end).replace(/\r$/, '')
  }

  report(ruleId: string, start: number, end: number, message: string, options: ReportOptions = {}): void {
    if (!this.enabled(ruleId)) return
    const rule = getRule(ruleId)
    const from = this.position(start)
    const to = this.position(Math.max(start, end))
    // The same node can be reached twice (for example a template string seen by
    // two visitors), keep one finding per rule and position.
    if (this.findings.some((f) => f.ruleId === ruleId && f.line === from.line && f.column === from.column)) return
    let snippet = this.lineText(from.line).trim()
    if (snippet.length > 160) snippet = `${snippet.slice(0, 157)}...`
    const fix = options.fix && options.fix.length > 0 ? options.fix : undefined
    this.findings.push({
      ruleId,
      severity: rule.severity,
      message,
      file: this.file,
      line: from.line,
      column: from.column,
      endLine: to.line,
      endColumn: to.column,
      docs: options.docs ?? rule.docs,
      compatFlags: options.compatFlags ?? rule.compatFlags,
      fixable: Boolean(fix),
      snippet,
      ...(fix ? { fix } : {}),
      ...(options.effort !== undefined ? { effort: options.effort } : {}),
    })
  }

  warn(message: string): void {
    this.warnings.push({ file: this.file, message })
  }
}
