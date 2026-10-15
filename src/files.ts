import { promises as fs } from 'node:fs'
import path from 'node:path'
import ignore, { type Ignore } from 'ignore'
import { SCRIPT_EXTENSIONS, STYLE_EXTENSIONS } from './source.js'

/** Directories that are never scanned. */
export const ALWAYS_SKIPPED = new Set(['node_modules', 'dist', '.git', '.nuxt', '.output', 'coverage'])

export { SCRIPT_EXTENSIONS, STYLE_EXTENSIONS }

export interface ListFilesOptions {
  ignore?: string[]
  gitignore?: boolean
}

interface Matcher {
  /** Directory of the .gitignore file, relative to the root, '' for the root. */
  base: string
  ig: Ignore
}

export function isScannable(rel: string): boolean {
  if (rel === 'package.json') return true
  if (rel.endsWith('.d.ts')) return false
  const ext = path.extname(rel).toLowerCase()
  return ext === '.vue' || SCRIPT_EXTENSIONS.has(ext) || STYLE_EXTENSIONS.has(ext)
}

function isIgnored(matchers: Matcher[], rel: string, isDir: boolean): boolean {
  for (const { base, ig } of matchers) {
    if (base && !rel.startsWith(`${base}/`)) continue
    const local = base ? rel.slice(base.length + 1) : rel
    if (ig.ignores(isDir ? `${local}/` : local)) return true
  }
  return false
}

/**
 * Lists the files vueleap can analyze, relative to `root` with forward slashes.
 * Symbolic links are never followed, so every returned path is inside `root`.
 */
export async function listFiles(root: string, options: ListFilesOptions = {}): Promise<string[]> {
  const results: string[] = []
  const base: Matcher[] = []
  if (options.ignore && options.ignore.length > 0) base.push({ base: '', ig: ignore().add(options.ignore) })

  async function walk(dir: string, rel: string, inherited: Matcher[]): Promise<void> {
    const matchers = [...inherited]
    if (options.gitignore !== false) {
      try {
        const content = await fs.readFile(path.join(dir, '.gitignore'), 'utf8')
        matchers.push({ base: rel, ig: ignore().add(content) })
      } catch {
        // no .gitignore in this directory
      }
    }
    const entries = await fs.readdir(dir, { withFileTypes: true })
    entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
    for (const entry of entries) {
      if (entry.isSymbolicLink()) continue
      const childRel = rel ? `${rel}/${entry.name}` : entry.name
      if (entry.isDirectory()) {
        if (ALWAYS_SKIPPED.has(entry.name) || isIgnored(matchers, childRel, true)) continue
        await walk(path.join(dir, entry.name), childRel, matchers)
      } else if (entry.isFile() && isScannable(childRel) && !isIgnored(matchers, childRel, false)) {
        results.push(childRel)
      }
    }
  }

  await walk(root, '', base)
  return results
}
