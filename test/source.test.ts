import { promises as fs } from 'node:fs'
import path from 'node:path'
import { parse as parseSfc } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { analyze, analyzeSource, fix, fixSource } from '../src/index.js'
import { APP, copyFixture } from './helpers.js'

const PRICE_TAG = `<template>
  <div>
    <p>{{ price | currency }}</p>
    <input @keyup.13="save" :value.sync="price">
  </div>
</template>

<script>
export default {
  props: ['price'],
  filters: {
    currency: (value) => '$' + value.toFixed(2),
  },
  beforeDestroy() {
    this.$off('save')
  },
}
</script>
`

describe('analyzeSource', () => {
  it('finds the same problems as analyze for a project file', async () => {
    const file = 'src/components/ProductList.vue'
    const text = await fs.readFile(path.join(APP, file), 'utf8')
    const project = await analyze(APP)
    const single = analyzeSource(text, { filename: file })
    const key = (f: { ruleId: string; line: number; column: number }) => `${f.ruleId}@${f.line}:${f.column}`
    expect(single.findings.map(key)).toEqual(project.findings.filter((f) => f.file === file).map(key))
    expect(single.summary.filesScanned).toBe(1)
  })

  it('treats code as a single file component by default', () => {
    const result = analyzeSource(PRICE_TAG)
    expect(result.filename).toBe('Component.vue')
    expect(result.findings.map((f) => f.ruleId)).toEqual(
      expect.arrayContaining(['filters', 'keycode-modifiers', 'sync-modifier', 'destroy-hooks', 'event-emitter']),
    )
    expect(result.compat.compiler).toContain('COMPILER_FILTERS')
    expect(result.compat.runtime).toContain('INSTANCE_EVENT_EMITTER')
  })

  it('picks the parser from the file name', () => {
    const css = '.fade-enter { opacity: 0 }\n.fade-enter-active { transition: opacity 1s }'
    expect(analyzeSource(css, { filename: 'a.css' }).findings.map((f) => f.ruleId)).toEqual(['transition-classes'])
    expect(analyzeSource('export default { destroyed() {} }', { filename: 'mixin.ts' }).findings.map((f) => f.ruleId)).toEqual(['destroy-hooks'])
    expect(analyzeSource('{"dependencies":{"vue":"^2.6.14"}}', { filename: 'package.json' }).findings.length).toBeGreaterThan(0)
    expect(analyzeSource('plain text', { filename: 'notes.txt' }).findings).toEqual([])
  })

  it('honors rule filters and rejects unknown rules', () => {
    expect(analyzeSource(PRICE_TAG, { rules: ['filters'] }).findings.every((f) => f.ruleId === 'filters')).toBe(true)
    expect(() => analyzeSource(PRICE_TAG, { rules: ['nope'] })).toThrow(/Unknown rule/)
  })

  it('reports a parse problem as a warning instead of throwing', () => {
    const result = analyzeSource('export default { destroyed( {', { filename: 'broken.js' })
    expect(result.findings).toEqual([])
    expect(result.warnings.length).toBe(1)
  })
})

describe('fixSource', () => {
  it('rewrites the safe changes and keeps the rest as findings', () => {
    const result = fixSource(PRICE_TAG)
    expect(result.code).toContain('@keyup.enter="save"')
    expect(result.code).toContain('v-model:value="price"')
    expect(result.code).toContain('beforeUnmount()')
    expect(result.code).toContain('{{ price | currency }}')
    expect(parseSfc(result.code).errors).toEqual([])
    expect(result.fixed.map((f) => f.ruleId).sort()).toEqual(['destroy-hooks', 'keycode-modifiers', 'sync-modifier'])
    expect(result.remaining.map((f) => f.ruleId)).toEqual(expect.arrayContaining(['filters', 'event-emitter']))
    expect(result.remaining.some((f) => f.fixable)).toBe(false)
    expect(result.compat.compiler).not.toContain('COMPILER_V_BIND_SYNC')
  })

  it('marks every rewritten range in the output', () => {
    const result = fixSource(PRICE_TAG)
    const texts = result.changes.map((r) => result.code.slice(r.start, r.end))
    expect(texts).toEqual(expect.arrayContaining(['enter', 'beforeUnmount']))
    for (let i = 1; i < result.changes.length; i++) expect(result.changes[i].start).toBeGreaterThanOrEqual(result.changes[i - 1].end)
  })

  it('returns the input untouched when nothing is fixable', () => {
    const code = '<template><p>{{ a | b }}</p></template>\n'
    const result = fixSource(code)
    expect(result.code).toBe(code)
    expect(result.fixed).toEqual([])
    expect(result.changes).toEqual([])
    expect(result.remaining.map((f) => f.ruleId)).toEqual(['filters'])
  })

  it('produces the same output as fix --write on every fixture file', async () => {
    const dir = await copyFixture('vue2-app')
    const outcome = await fix(dir, { write: true })
    for (const file of outcome.files) {
      expect(fixSource(file.original, { filename: file.file }).code).toBe(file.fixed)
    }
  })
})
