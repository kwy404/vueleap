import pc from 'picocolors'
import { compatSnippet } from '../compat.js'
import { RULES_BY_ID } from '../rules.js'
import type { AnalysisResult, Finding, Severity } from '../types.js'

export interface PrettyOptions {
  color?: boolean
  /** Maximum findings printed per rule (default 15). Use Infinity to print all. */
  maxPerRule?: number
  /** Print the @vue/compat configuration (default true). */
  compat?: boolean
}

type Colors = ReturnType<typeof pc.createColors>

function label(c: Colors, severity: Severity): string {
  if (severity === 'error') return c.bold(c.red('error'))
  if (severity === 'warning') return c.bold(c.yellow('warn '))
  return c.bold(c.blue('info '))
}

function plural(count: number, word: string): string {
  return `${count} ${word}${count === 1 ? '' : 's'}`
}

export function formatPretty(result: AnalysisResult, options: PrettyOptions = {}): string {
  const c = pc.createColors(options.color ?? false)
  const max = options.maxPerRule ?? 15
  const out: string[] = []
  const { summary } = result

  out.push(`${c.bold(c.green(result.tool.name))} ${c.dim(`v${result.tool.version}`)}  ${c.dim('Vue 2 to Vue 3 migration report')}`)
  out.push('')

  if (summary.total === 0) {
    out.push(c.green(`No Vue 3 breaking changes found in ${plural(summary.filesScanned, 'file')}.`))
  }

  const byRule = new Map<string, Finding[]>()
  for (const finding of result.findings) {
    const list = byRule.get(finding.ruleId) ?? []
    list.push(finding)
    byRule.set(finding.ruleId, list)
  }

  for (const entry of summary.byRule) {
    const findings = byRule.get(entry.ruleId) ?? []
    const rule = RULES_BY_ID.get(entry.ruleId)
    const fixable = entry.fixable > 0 ? c.green(`  [${entry.fixable} fixable]`) : ''
    out.push(`${label(c, entry.severity)}  ${c.bold(entry.ruleId)}  ${entry.title} ${c.dim(`(${entry.count})`)}${fixable}`)
    out.push(`       ${c.dim(entry.docs)}`)
    const flags = rule?.compatFlags ?? []
    if (flags.length > 0) out.push(`       ${c.dim(`compat: ${flags.join(', ')}`)}`)
    const shown = findings.slice(0, max)
    const width = Math.min(48, Math.max(...shown.map((f) => `${f.file}:${f.line}:${f.column}`.length)))
    for (const finding of shown) {
      const where = `${finding.file}:${finding.line}:${finding.column}`
      out.push(`  ${c.cyan(where.padEnd(width))}  ${finding.message}`)
    }
    if (findings.length > shown.length) out.push(c.dim(`  ... and ${findings.length - shown.length} more (use --verbose to list all)`))
    out.push('')
  }

  if (result.warnings.length > 0) {
    out.push(c.bold('Skipped or partial'))
    for (const warning of result.warnings) out.push(`  ${c.yellow(warning.file)}  ${warning.message}`)
    out.push('')
  }

  out.push(c.bold('Summary'))
  out.push(`  Files scanned     ${summary.filesScanned}`)
  out.push(`  Files affected    ${summary.filesWithFindings}`)
  out.push(
    `  Findings          ${summary.total}  (${c.red(plural(summary.error, 'error'))}, ${c.yellow(plural(summary.warning, 'warning'))}, ${c.blue(`${summary.info} info`)})`,
  )
  out.push(`  Auto fixable      ${summary.fixable}${summary.fixable > 0 ? c.dim('  (preview with --fix, apply with --fix --write)') : ''}`)
  out.push(`  Effort score      ${result.effort.score}  ${c.dim(`(${result.effort.level})`)}`)

  if (options.compat !== false && (result.compat.runtime.length > 0 || result.compat.compiler.length > 0)) {
    out.push('')
    out.push(c.bold('Minimal @vue/compat configuration for this project'))
    for (const line of compatSnippet(result.compat).trimEnd().split('\n')) out.push(`  ${line.startsWith('//') ? c.dim(line) : line}`)
  }

  return `${out.join('\n')}\n`
}

/** Colors a unified diff for the terminal. */
export function formatDiff(diff: string, color: boolean): string {
  const c = pc.createColors(color)
  return diff
    .split('\n')
    .filter((line) => !line.startsWith('====='))
    .map((line) => {
      if (line.startsWith('+++') || line.startsWith('---')) return c.bold(line)
      if (line.startsWith('+')) return c.green(line)
      if (line.startsWith('-')) return c.red(line)
      if (line.startsWith('@@')) return c.cyan(line)
      return line
    })
    .join('\n')
}
