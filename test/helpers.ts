import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Finding } from '../src/types.js'

export const FIXTURES = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures')
export const APP = path.join(FIXTURES, 'vue2-app')
export const EDGE = path.join(FIXTURES, 'edge-cases')

/** Copies a fixture into a fresh temporary directory. */
export async function copyFixture(name: string): Promise<string> {
  const target = await fs.mkdtemp(path.join(os.tmpdir(), `vueleap-${name}-`))
  await fs.cp(path.join(FIXTURES, name), target, { recursive: true })
  return target
}

/** Compact, stable representation of findings for snapshots. */
export function compact(findings: readonly Finding[]): string[] {
  return findings.map(
    (f) =>
      `${f.file}:${f.line}:${f.column} ${f.severity} ${f.ruleId}${f.fixable ? ' [fix]' : ''}${
        f.compatFlags.length > 0 ? ` {${f.compatFlags.join(',')}}` : ''
      } ${f.message}`,
  )
}
