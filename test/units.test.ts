import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { analyze, compatSnippet, estimateEffort, findFilters, formatHtml, listFiles } from '../src/index.js'
import { FAVICON_SVG, MASCOT_SVG } from '../src/report/mascot.js'
import { majorOf } from '../src/scan/package.js'
import { APP } from './helpers.js'

// En and em dashes, miscellaneous symbols and dingbats, and emoji blocks.
const BANNED_CHARACTERS = new RegExp(
  `[${String.fromCharCode(0x2013, 0x2014)}${String.fromCharCode(0x2600)}-${String.fromCharCode(0x27bf)}]|[${String.fromCodePoint(0x1f000)}-${String.fromCodePoint(0x1faff)}]`,
  'u',
)

describe('findFilters', () => {
  it('finds filters like the Vue 2 compiler', () => {
    expect(findFilters('price | currency')).toEqual([{ name: 'currency', offset: 6 }])
    expect(findFilters("price | currency('EUR') | trim").map((f) => f.name)).toEqual(['currency', 'trim'])
  })

  it('ignores logical or, strings, brackets and regular expressions', () => {
    expect(findFilters('a || b')).toEqual([])
    expect(findFilters("'a | b'")).toEqual([])
    expect(findFilters('`a | b`')).toEqual([])
    expect(findFilters('fn(a | b)')).toEqual([])
    expect(findFilters('[a | b]')).toEqual([])
    expect(findFilters('/a|b/.test(x)')).toEqual([])
    expect(findFilters('a / b | round')).toEqual([{ name: 'round', offset: 6 }])
  })
})

describe('listFiles', () => {
  it('skips node_modules, dist and gitignored paths, including nested .gitignore files', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'vueleap-files-'))
    const write = async (file: string, content = '') => {
      await fs.mkdir(path.dirname(path.join(root, file)), { recursive: true })
      await fs.writeFile(path.join(root, file), content)
    }
    await write('package.json', '{}')
    await write('src/a.vue')
    await write('src/b.ts')
    await write('src/types.d.ts')
    await write('src/c.css')
    await write('src/readme.md')
    await write('node_modules/lib/index.js')
    await write('dist/bundle.js')
    await write('packages/web/dist/x.js')
    await write('.gitignore', 'tmp/\n')
    await write('tmp/skip.js')
    await write('packages/web/.gitignore', 'secret.js\n')
    await write('packages/web/secret.js')
    await write('packages/web/ok.js')
    expect(await listFiles(root)).toEqual(['package.json', 'packages/web/ok.js', 'src/a.vue', 'src/b.ts', 'src/c.css'])
    expect(await listFiles(root, { gitignore: false })).toContain('tmp/skip.js')
  })
})

describe('majorOf', () => {
  it('reads the major version of common ranges', () => {
    expect(majorOf('^2.6.14')).toBe(2)
    expect(majorOf('~2.7.0')).toBe(2)
    expect(majorOf('2.x')).toBe(2)
    expect(majorOf('>=3.0.0')).toBe(3)
    expect(majorOf('latest')).toBeUndefined()
    expect(majorOf('npm:@vue/compat@^3.4.0')).toBeUndefined()
    expect(majorOf('github:vuejs/vue')).toBeUndefined()
  })
})

describe('effort and compat', () => {
  it('estimates zero effort for a clean project', () => {
    expect(estimateEffort([])).toEqual({ score: 0, level: 'none' })
  })

  it('prints a no-op snippet when no flag is needed', () => {
    expect(compatSnippet({ runtime: [], compiler: [] })).toContain('No @vue/compat flags needed')
  })

  it('omits the compiler config when no compiler flag is needed', () => {
    const snippet = compatSnippet({ runtime: ['GLOBAL_MOUNT'], compiler: [] })
    expect(snippet).toContain('GLOBAL_MOUNT: true')
    expect(snippet).not.toContain('compatConfig')
  })
})

describe('html report', async () => {
  const result = await analyze(APP)
  const html = formatHtml(result, { projectName: 'shop <front>', generatedAt: new Date('2026-01-01T00:00:00Z') })

  it('is standalone and escapes user content', () => {
    expect(html).not.toMatch(/<script[^>]+src=/)
    expect(html).not.toMatch(/<link[^>]+stylesheet/)
    expect(html).toContain('shop &lt;front&gt;')
    expect(html).toContain('2026-01-01 00:00 UTC')
    expect(html).toContain('prefers-color-scheme:dark')
    expect((html.match(/class="finding"/g) ?? []).length).toBe(result.findings.length)
  })

  it('uses no emoji or dash punctuation', () => {
    expect(html).not.toMatch(BANNED_CHARACTERS)
  })

  it('embeds the mascot that ships in assets', async () => {
    const assets = path.join(APP, '..', '..', '..', 'assets')
    const mascot = (await fs.readFile(path.join(assets, 'mascot.svg'), 'utf8')).replace(/ width="400" height="300"/, '').trim()
    const favicon = (await fs.readFile(path.join(assets, 'favicon.svg'), 'utf8')).trim()
    expect(MASCOT_SVG).toBe(mascot)
    expect(FAVICON_SVG).toBe(favicon)
    expect(html).toContain('<title id="hop-title">')
  })
})
