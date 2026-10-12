import { promises as fs } from 'node:fs'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { analyze } from './analyze.js'
import { compatSnippet } from './compat.js'
import { fix } from './fix.js'
import { formatHtml } from './report/html.js'
import { formatJson } from './report/json.js'
import { formatDiff, formatPretty } from './report/pretty.js'
import { RULES } from './rules.js'
import type { AnalysisResult, Severity } from './types.js'
import { NAME, VERSION } from './version.js'

export interface CliIO {
  stdout: (text: string) => void
  stderr: (text: string) => void
  cwd: string
  color: boolean
}

const HELP = `${NAME} ${VERSION}
Find everything that breaks when you migrate from Vue 2 to Vue 3.

Usage
  npx vueleap [dir] [options]

Options
  --json               Print the report as JSON
  --html <file>        Also write a standalone HTML report
  --fix                Preview the safe automatic fixes as a diff (dry run)
  --write              With --fix, write the fixes to disk
  --fail-on <level>    Exit with code 1 when a finding at or above this level
                       exists: error, warning, info or none (default: none)
  --compat             Print only the @vue/compat configuration
  --rule <id>          Only run this rule (repeatable)
  --skip-rule <id>     Do not run this rule (repeatable)
  --ignore <pattern>   Extra ignore pattern in .gitignore syntax (repeatable)
  --no-gitignore       Do not read .gitignore files
  --list-rules         List every rule and exit
  --verbose            Print every finding (default: 15 per rule)
  --no-color           Disable colors
  -v, --version        Print the version
  -h, --help           Print this help

Examples
  npx vueleap                         scan the current directory
  npx vueleap ./app --html report.html
  npx vueleap --fix                   preview safe fixes
  npx vueleap --fix --write           apply safe fixes
  npx vueleap --json --fail-on error  for CI

Docs: https://kwy404.github.io/vueleap/
`

const LEVELS: Record<string, Severity[]> = {
  error: ['error'],
  warning: ['error', 'warning'],
  info: ['error', 'warning', 'info'],
  none: [],
}

function failed(result: AnalysisResult, level: string): boolean {
  const severities = LEVELS[level] ?? []
  return result.findings.some((f) => severities.includes(f.severity))
}

function listRules(): string {
  const width = Math.max(...RULES.map((r) => r.id.length))
  const lines = RULES.map(
    (r) => `${r.id.padEnd(width)}  ${r.severity.padEnd(7)}  ${r.fixable ? 'fix' : '   '}  ${r.title}`,
  )
  return `${lines.join('\n')}\n\n${RULES.length} rules, ${RULES.filter((r) => r.fixable).length} with automatic fixes.\n`
}

/** Runs the command line interface and returns the exit code. */
export async function main(argv: string[], io: CliIO): Promise<number> {
  let parsed
  try {
    parsed = parseArgs({
      args: argv,
      allowPositionals: true,
      options: {
        json: { type: 'boolean' },
        html: { type: 'string' },
        fix: { type: 'boolean' },
        write: { type: 'boolean' },
        'fail-on': { type: 'string' },
        compat: { type: 'boolean' },
        rule: { type: 'string', multiple: true },
        'skip-rule': { type: 'string', multiple: true },
        ignore: { type: 'string', multiple: true },
        'no-gitignore': { type: 'boolean' },
        'list-rules': { type: 'boolean' },
        verbose: { type: 'boolean' },
        'no-color': { type: 'boolean' },
        version: { type: 'boolean', short: 'v' },
        help: { type: 'boolean', short: 'h' },
      },
    })
  } catch (error) {
    io.stderr(`${(error as Error).message}\nRun "vueleap --help" for usage.\n`)
    return 2
  }
  const { values, positionals } = parsed

  if (values.help) {
    io.stdout(HELP)
    return 0
  }
  if (values.version) {
    io.stdout(`${VERSION}\n`)
    return 0
  }
  if (values['list-rules']) {
    io.stdout(listRules())
    return 0
  }
  const failOn = values['fail-on'] ?? 'none'
  if (!(failOn in LEVELS)) {
    io.stderr(`Invalid --fail-on value "${failOn}": use error, warning, info or none.\n`)
    return 2
  }
  if (values.write && !values.fix) {
    io.stderr('--write only works together with --fix.\n')
    return 2
  }
  if (positionals.length > 1) {
    io.stderr('Pass a single project directory.\n')
    return 2
  }

  const color = io.color && !values['no-color'] && !values.json
  const projectDir = path.resolve(io.cwd, positionals[0] ?? '.')
  const options = {
    rules: values.rule,
    skipRules: values['skip-rule'],
    ignore: values.ignore,
    gitignore: !values['no-gitignore'],
  }

  try {
    let result: AnalysisResult
    if (values.fix) {
      const outcome = await fix(projectDir, { ...options, write: Boolean(values.write) })
      result = outcome.result
      const count = outcome.files.reduce((sum, f) => sum + f.count, 0)
      if (values.json) {
        const after = outcome.written ? await analyze(projectDir, options) : result
        io.stdout(formatJson(after, outcome.files))
        return failed(after, failOn) ? 1 : 0
      }
      if (outcome.files.length === 0) {
        io.stdout('No automatic fixes available.\n')
      } else if (!outcome.written) {
        for (const file of outcome.files) io.stdout(`${formatDiff(file.diff, color)}\n`)
        io.stdout(`${count} fixes in ${outcome.files.length} files (dry run, nothing written). Run with --fix --write to apply them.\n`)
        return failed(result, failOn) ? 1 : 0
      } else {
        for (const file of outcome.files) io.stdout(`fixed  ${file.file}  (${file.count})\n`)
        io.stdout(`Applied ${count} fixes in ${outcome.files.length} files. Remaining findings:\n\n`)
        result = await analyze(projectDir, options)
      }
    } else {
      result = await analyze(projectDir, options)
    }

    if (values.html) {
      const target = path.resolve(io.cwd, values.html)
      await fs.writeFile(target, formatHtml(result), 'utf8')
      if (!values.json) io.stderr(`HTML report written to ${path.relative(io.cwd, target) || target}\n`)
    }

    if (values.json) io.stdout(formatJson(result))
    else if (values.compat) io.stdout(compatSnippet(result.compat))
    else io.stdout(formatPretty(result, { color, maxPerRule: values.verbose ? Infinity : 15 }))

    return failed(result, failOn) ? 1 : 0
  } catch (error) {
    io.stderr(`${NAME}: ${(error as Error).message}\n`)
    return 2
  }
}
