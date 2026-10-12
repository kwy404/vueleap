import { promises as fs } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { analyze, RULES } from '../src/index.js'
import { APP, compact, EDGE } from './helpers.js'

const require = createRequire(import.meta.url)

async function enumMembers(file: string, name: string): Promise<Set<string>> {
  const source = await fs.readFile(file, 'utf8')
  const start = source.indexOf(`enum ${name} {`)
  if (start === -1) throw new Error(`enum ${name} not found in ${file}`)
  const body = source.slice(start, source.indexOf('}', start))
  return new Set([...body.matchAll(/([A-Z_]+) =/g)].map((m) => m[1]))
}

describe('analyze: realistic Vue 2 app', async () => {
  const result = await analyze(APP)

  it('matches the findings snapshot', () => {
    expect(compact(result.findings)).toMatchSnapshot()
  })

  it('reports summary, effort and compat flags', () => {
    expect(result.summary.filesScanned).toBe(21)
    expect(result.summary.total).toBe(result.findings.length)
    expect(result.summary.error + result.summary.warning + result.summary.info).toBe(result.summary.total)
    expect(result.effort.score).toBeGreaterThan(0)
    expect(result.compat.compiler).toContain('COMPILER_FILTERS')
    expect(result.compat.runtime).toContain('INSTANCE_EVENT_EMITTER')
    expect(result.warnings).toEqual([])
  })

  it('respects .gitignore and always skips dist', () => {
    const files = [...new Set(result.findings.map((f) => f.file))]
    expect(files.some((f) => f.startsWith('generated/'))).toBe(false)
    expect(files.some((f) => f.startsWith('dist/'))).toBe(false)
    expect(files).not.toContain('src/config.local.js')
  })

  it('does not flag look-alike CSS classes or comments', () => {
    const transitions = result.findings.filter((f) => f.ruleId === 'transition-classes').map((f) => f.snippet)
    expect(transitions.join(' ')).not.toContain('btn-enter')
    expect(transitions.some((s) => s.includes('/*'))).toBe(false)
  })

  it('does not treat || as a filter', () => {
    expect(result.findings.some((f) => f.ruleId === 'filters' && f.snippet.includes("|| 'n/a'"))).toBe(false)
  })

  it('points at exact lines and columns', () => {
    const keycode = result.findings.find((f) => f.ruleId === 'keycode-modifiers')
    expect(keycode).toMatchObject({ file: 'src/components/TheHeader.vue', line: 5 })
    const lines = keycode?.snippet ?? ''
    expect(lines).toContain('@keyup.13')
    const listeners = result.findings.find((f) => f.ruleId === 'listeners')
    expect(listeners).toMatchObject({ file: 'src/components/BaseInput.vue', line: 4, column: 49 })
  })
})

describe('analyze: edge cases', async () => {
  const result = await analyze(EDGE)

  it('matches the findings snapshot', () => {
    expect(compact(result.findings)).toMatchSnapshot()
  })

  it('skips Pug templates and unparsable files with a warning', () => {
    expect(result.warnings.map((w) => w.file)).toEqual(['src/Broken.js', 'src/PugComponent.vue'])
    expect(result.warnings[1].message).toContain('lang="pug"')
    // The script block of the Pug component is still analyzed.
    expect(result.findings.some((f) => f.file === 'src/PugComponent.vue' && f.ruleId === 'destroy-hooks')).toBe(true)
  })

  it('handles TypeScript SFCs, class components, TSX and Vue 2.7 script setup', () => {
    const files = new Set(result.findings.map((f) => f.file))
    for (const file of ['src/TsComponent.vue', 'src/ClassComponent.vue', 'src/Button.tsx', 'src/SetupComponent.vue']) {
      expect(files.has(file), file).toBe(true)
    }
  })

  it('ignores plain objects that only look like Vue options', () => {
    expect(result.findings.filter((f) => f.file === 'src/not-vue.js')).toEqual([])
  })

  it('skips declaration files', () => {
    expect(result.findings.some((f) => f.file.endsWith('.d.ts'))).toBe(false)
  })

  it('does not offer a fix that would duplicate a key', () => {
    const mixed = result.findings.filter((f) => f.file === 'src/mixed-hooks.js')
    expect(mixed.find((f) => f.message.startsWith('destroyed'))?.fixable).toBe(false)
    expect(mixed.find((f) => f.message.startsWith('beforeDestroy'))?.fixable).toBe(true)
  })

  it('does not report Vue 3 ready dependencies', () => {
    const deps = result.findings.filter((f) => f.file === 'package.json').map((f) => f.message)
    expect(deps.some((m) => m.startsWith('vue-router'))).toBe(false)
    expect(deps.some((m) => m.startsWith('pinia'))).toBe(false)
  })
})

describe('analyze: options', () => {
  it('runs only selected rules', async () => {
    const result = await analyze(APP, { rules: ['filters'] })
    expect(new Set(result.findings.map((f) => f.ruleId))).toEqual(new Set(['filters']))
  })

  it('skips rules', async () => {
    const result = await analyze(APP, { skipRules: ['filters', 'global-api'] })
    expect(result.findings.some((f) => f.ruleId === 'filters' || f.ruleId === 'global-api')).toBe(false)
  })

  it('accepts extra ignore patterns', async () => {
    const result = await analyze(APP, { ignore: ['src/components/'] })
    expect(result.findings.some((f) => f.file.startsWith('src/components/'))).toBe(false)
  })

  it('rejects unknown rules and missing directories', async () => {
    await expect(analyze(APP, { rules: ['nope'] })).rejects.toThrow(/Unknown rule/)
    await expect(analyze(path.join(APP, 'missing'))).rejects.toThrow(/Not a directory/)
  })
})

describe('rules', () => {
  it('are all exercised by the fixtures', async () => {
    const [app, edge] = await Promise.all([analyze(APP), analyze(EDGE)])
    const seen = new Set([...app.findings, ...edge.findings].map((f) => f.ruleId))
    expect(RULES.map((r) => r.id).filter((id) => !seen.has(id))).toEqual([])
  })

  it('have unique ids, https docs and complete metadata', () => {
    expect(new Set(RULES.map((r) => r.id)).size).toBe(RULES.length)
    for (const rule of RULES) {
      expect(rule.docs).toMatch(/^https:\/\//)
      expect(rule.title.length).toBeGreaterThan(5)
      expect(rule.description.length).toBeGreaterThan(20)
    }
  })

  it('only use compat flags that exist in @vue/compat', async () => {
    const runtimeDts = require.resolve('@vue/runtime-core/dist/runtime-core.d.ts', { paths: [path.dirname(require.resolve('vue'))] })
    const compilerDts = require.resolve('@vue/compiler-core/dist/compiler-core.d.ts')
    const runtime = await enumMembers(runtimeDts, 'DeprecationTypes$1')
    const compiler = await enumMembers(compilerDts, 'CompilerDeprecationTypes')
    expect(runtime.has('GLOBAL_MOUNT')).toBe(true)
    expect(compiler.has('COMPILER_FILTERS')).toBe(true)
    for (const rule of RULES) {
      for (const flag of rule.compatFlags) expect(runtime.has(flag) || compiler.has(flag), `${rule.id}: ${flag}`).toBe(true)
    }
  })

  it('never use dash punctuation in user facing text', async () => {
    const [app, edge] = await Promise.all([analyze(APP), analyze(EDGE)])
    const text = JSON.stringify([RULES, app.findings, edge.findings])
    expect(text).not.toMatch(/[–—]/)
  })
})
