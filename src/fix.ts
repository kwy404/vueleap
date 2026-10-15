import { promises as fs } from 'node:fs'
import path from 'node:path'
import { createTwoFilesPatch } from 'diff'
import { analyze } from './analyze.js'
import { applyEdits } from './source.js'
import type { AnalysisResult, AnalyzeOptions, Finding } from './types.js'

export interface FileFix {
  /** Path relative to the project root. */
  file: string
  original: string
  fixed: string
  /** Unified diff between the original and the fixed content. */
  diff: string
  /** Number of findings fixed in this file. */
  count: number
}

export interface FixOptions extends AnalyzeOptions {
  /** Write the changes to disk. Defaults to false (dry run). */
  write?: boolean
}

export interface FixResult {
  /** The analysis the fixes were computed from. */
  result: AnalysisResult
  files: FileFix[]
  written: boolean
}

export { applyEdits }

/** Resolves a project relative path and refuses anything outside the project. */
async function resolveInside(root: string, file: string): Promise<string> {
  const absolute = path.resolve(root, file)
  const relative = path.relative(root, absolute)
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Refusing to touch a file outside the project: ${file}`)
  }
  const [realRoot, realFile] = await Promise.all([fs.realpath(root), fs.realpath(absolute)])
  const realRelative = path.relative(realRoot, realFile)
  if (!realRelative || realRelative.startsWith('..') || path.isAbsolute(realRelative)) {
    throw new Error(`Refusing to touch a file outside the project: ${file}`)
  }
  return absolute
}

/** Computes the fixed content of every file that has fixable findings. */
export async function planFixes(result: AnalysisResult): Promise<FileFix[]> {
  const byFile = new Map<string, Finding[]>()
  for (const finding of result.findings) {
    if (!finding.fix) continue
    const list = byFile.get(finding.file) ?? []
    list.push(finding)
    byFile.set(finding.file, list)
  }
  const fixes: FileFix[] = []
  for (const [file, findings] of byFile) {
    const absolute = await resolveInside(result.projectDir, file)
    const original = await fs.readFile(absolute, 'utf8')
    const fixed = applyEdits(
      original,
      findings.flatMap((f) => f.fix ?? []),
    )
    if (fixed === original) continue
    const diff = createTwoFilesPatch(`a/${file}`, `b/${file}`, original, fixed, '', '', { context: 2 })
      .split('\n')
      .filter((line) => !line.startsWith('====='))
      .map((line) => (line.startsWith('--- ') || line.startsWith('+++ ') ? line.trimEnd() : line))
      .join('\n')
    fixes.push({ file, original, fixed, diff, count: findings.length })
  }
  return fixes.sort((a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : 0))
}

/**
 * Analyzes a project and applies the safe automatic fixes. Nothing is written
 * unless `write: true` is passed.
 */
export async function fix(projectDir: string, options: FixOptions = {}): Promise<FixResult> {
  const result = await analyze(projectDir, options)
  const files = await planFixes(result)
  if (options.write) {
    for (const file of files) {
      const absolute = await resolveInside(result.projectDir, file.file)
      const current = await fs.readFile(absolute, 'utf8')
      if (current !== file.original) throw new Error(`File changed during the fix, aborting: ${file.file}`)
      await fs.writeFile(absolute, file.fixed, 'utf8')
    }
  }
  return { result, files, written: Boolean(options.write) }
}
