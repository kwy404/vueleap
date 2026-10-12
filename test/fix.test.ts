import { promises as fs } from 'node:fs'
import path from 'node:path'
import { parse as parseScript } from '@babel/parser'
import { parse as parseSfc } from '@vue/compiler-sfc'
import { describe, expect, it } from 'vitest'
import { analyze, applyEdits, fix, planFixes } from '../src/index.js'
import { APP, copyFixture } from './helpers.js'

describe('applyEdits', () => {
  it('applies edits from right to left semantics regardless of order', () => {
    expect(
      applyEdits('abcdef', [
        { start: 4, end: 5, text: 'E' },
        { start: 0, end: 1, text: 'A' },
      ]),
    ).toBe('AbcdEf')
  })

  it('drops overlapping edits and keeps the first', () => {
    expect(
      applyEdits('abcdef', [
        { start: 1, end: 3, text: 'X' },
        { start: 2, end: 4, text: 'Y' },
      ]),
    ).toBe('aXdef')
  })

  it('supports insertions and deletions', () => {
    expect(applyEdits('.v-enter {}', [{ start: 8, end: 8, text: '-from' }])).toBe('.v-enter-from {}')
    expect(applyEdits('a\nb\nc', [{ start: 2, end: 4, text: '' }])).toBe('a\nc')
  })
})

describe('fix', () => {
  it('previews diffs without writing by default', async () => {
    const dir = await copyFixture('vue2-app')
    const before = await fs.readFile(path.join(dir, 'src/main.js'), 'utf8')
    const outcome = await fix(dir)
    expect(outcome.written).toBe(false)
    expect(await fs.readFile(path.join(dir, 'src/main.js'), 'utf8')).toBe(before)
    expect(outcome.files.map((f) => f.diff).join('\n')).toMatchSnapshot()
  })

  it('writes safe fixes, keeps code parseable and is idempotent', async () => {
    const dir = await copyFixture('vue2-app')
    const outcome = await fix(dir, { write: true })
    expect(outcome.files.length).toBe(9)

    const fixed: Record<string, string> = {}
    for (const file of outcome.files) {
      const content = await fs.readFile(path.join(dir, file.file), 'utf8')
      expect(content).toBe(file.fixed)
      fixed[file.file] = content
      if (file.file.endsWith('.vue')) {
        expect(parseSfc(content).errors).toEqual([])
      } else if (file.file.endsWith('.js')) {
        expect(() => parseScript(content, { sourceType: 'module', plugins: ['jsx'] })).not.toThrow()
      }
    }
    expect(fixed).toMatchSnapshot()

    const after = await analyze(dir)
    expect(after.findings.filter((f) => f.fixable)).toEqual([])
    // Findings that cannot be fixed automatically are still there.
    expect(after.findings.some((f) => f.ruleId === 'filters')).toBe(true)

    const again = await fix(dir, { write: true })
    expect(again.files).toEqual([])
  })

  it('only fixes the selected rules', async () => {
    const dir = await copyFixture('vue2-app')
    const outcome = await fix(dir, { rules: ['destroy-hooks'], write: true })
    expect(outcome.files.map((f) => f.file)).toEqual(['src/components/Modal.vue', 'src/components/ProductList.vue', 'src/mixins/tracking.js'])
    const main = await fs.readFile(path.join(dir, 'src/main.js'), 'utf8')
    expect(main).toContain('productionTip')
  })

  it('refuses to touch files outside the project', async () => {
    const result = await analyze(APP)
    const evil = {
      ...result,
      findings: [{ ...result.findings[0], file: '../outside.js', fix: [{ start: 0, end: 0, text: 'x' }], fixable: true }],
    }
    await expect(planFixes(evil)).rejects.toThrow(/outside the project/)
  })
})
