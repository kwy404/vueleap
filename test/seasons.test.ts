import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

interface Seasons {
  easter(year: number): Date
  seasonFor(date: Date, lang?: string): string | null
  label(id: string, lang?: string): string
  ids: string[]
}

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = await fs.readFile(path.join(root, 'assets/seasons/seasons.js'), 'utf8')

/** Runs seasons.js the way a page would, with an optional fake browser. */
function load(browser?: { search?: string; lang?: string; stored?: Record<string, string>; now?: Date }): { api: Seasons; html: Map<string, string>; chip: () => string } {
  const html = new Map<string, string>()
  let chipHtml = ''
  const sandbox: Record<string, unknown> = {}
  if (browser) {
    const stored = { ...(browser.stored ?? {}) }
    sandbox.document = {
      documentElement: { setAttribute: (k: string, v: string) => html.set(k, v), removeAttribute: (k: string) => html.delete(k) },
      currentScript: null,
      body: {
        appendChild: (el: { innerHTML: string }) => {
          chipHtml = el.innerHTML
        },
      },
      createElement: () => ({
        className: '',
        innerHTML: '',
        setAttribute() {},
        classList: { toggle() {} },
        querySelector: () => ({ setAttribute() {}, addEventListener() {} }),
      }),
      addEventListener() {},
    }
    sandbox.navigator = { languages: [browser.lang ?? 'en-US'], language: browser.lang ?? 'en-US' }
    sandbox.location = { search: browser.search ?? '' }
    sandbox.localStorage = { getItem: (k: string) => stored[k] ?? null, setItem: (k: string, v: string) => (stored[k] = v), removeItem: (k: string) => delete stored[k] }
    sandbox.matchMedia = () => ({ matches: true })
  }
  const RealDate = Date
  const now = browser?.now
  const FakeDate = now
    ? (class extends RealDate {
        constructor(...args: ConstructorParameters<typeof Date>) {
          if (args.length === 0) super(now.getTime())
          else super(...args)
        }
      } as DateConstructor)
    : RealDate
  new Function('window', 'globalThis', 'Date', source)(browser ? sandbox : undefined, sandbox, FakeDate)
  return { api: sandbox.vueleapSeasons as Seasons, html, chip: () => chipHtml }
}

const { api } = load()
const at = (y: number, m: number, d: number, lang?: string) => api.seasonFor(new Date(y, m - 1, d), lang)

describe('seasons: Easter', () => {
  const KNOWN: Array<[number, number, number]> = [
    [2024, 3, 31],
    [2025, 4, 20],
    [2026, 4, 5],
    [2027, 3, 28],
    [2028, 4, 16],
    [2029, 4, 1],
    [2030, 4, 21],
  ]
  it.each(KNOWN)('falls on the right day in %i', (y, m, d) => {
    const e = api.easter(y)
    expect([e.getFullYear(), e.getMonth() + 1, e.getDate()]).toEqual([y, m, d])
  })
})

describe('seasons: windows', () => {
  it('New Year runs from Dec 30 to Jan 2', () => {
    expect(at(2026, 12, 29)).toBe(null)
    expect(at(2026, 12, 30)).toBe('newyear')
    expect(at(2027, 1, 1)).toBe('newyear')
    expect(at(2027, 1, 2)).toBe('newyear')
    expect(at(2027, 1, 3)).toBe(null)
  })

  it('Carnival runs from the Saturday before Ash Wednesday through Ash Wednesday', () => {
    // Easter 2026 is April 5, so Ash Wednesday is February 18.
    expect(at(2026, 2, 13)).toBe(null)
    expect(at(2026, 2, 14)).toBe('carnival')
    expect(at(2026, 2, 17)).toBe('carnival')
    expect(at(2026, 2, 18)).toBe('carnival')
    expect(at(2026, 2, 19)).toBe(null)
    // Easter 2025 is April 20, so Ash Wednesday is March 5.
    expect(at(2025, 3, 1)).toBe('carnival')
    expect(at(2025, 3, 5)).toBe('carnival')
    expect(at(2025, 2, 28)).toBe(null)
  })

  it('Easter runs from Good Friday to Easter Sunday', () => {
    expect(at(2026, 4, 2)).toBe(null)
    expect(at(2026, 4, 3)).toBe('easter')
    expect(at(2026, 4, 5)).toBe('easter')
    expect(at(2026, 4, 6)).toBe(null)
  })

  it("Valentine's is Feb 14, and June 12 for pt-BR visitors", () => {
    expect(at(2027, 2, 13)).toBe(null)
    expect(at(2027, 2, 14)).toBe('valentine')
    expect(at(2027, 2, 15)).toBe(null)
    expect(at(2026, 6, 12)).toBe(null)
    expect(at(2026, 6, 12, 'pt-BR')).toBe('valentine')
    expect(at(2026, 6, 12, 'pt-PT')).toBe(null)
  })

  it('Festa Junina runs from June 13 to June 29, named Midsummer outside pt-BR', () => {
    expect(at(2026, 6, 13)).toBe('junina')
    expect(at(2026, 6, 29, 'pt-BR')).toBe('junina')
    expect(at(2026, 6, 30)).toBe(null)
    expect(api.label('junina', 'pt-BR')).toBe('Festa Junina')
    expect(api.label('junina', 'en-US')).toBe('Midsummer')
    expect(api.label('halloween', 'pt-BR')).toBe('Halloween')
  })

  it('Halloween runs from Oct 24 to Oct 31', () => {
    expect(at(2026, 10, 23)).toBe(null)
    expect(at(2026, 10, 24)).toBe('halloween')
    expect(at(2026, 10, 31)).toBe('halloween')
    expect(at(2026, 11, 1)).toBe(null)
  })

  it('Christmas runs from Dec 18 to Dec 26', () => {
    expect(at(2026, 12, 17)).toBe(null)
    expect(at(2026, 12, 18)).toBe('christmas')
    expect(at(2026, 12, 26)).toBe('christmas')
    expect(at(2026, 12, 27)).toBe(null)
  })
})

describe('seasons: in the page', () => {
  it('sets data-season and adds the chip on a season day', () => {
    const page = load({ now: new Date(2026, 9, 31) })
    expect(page.html.get('data-season')).toBe('halloween')
    expect(page.chip()).toContain('Halloween mode')
  })

  it('does nothing on an ordinary day', () => {
    const page = load({ now: new Date(2026, 9, 15) })
    expect(page.html.has('data-season')).toBe(false)
    expect(page.chip()).toBe('')
  })

  it('?season= forces a season and ?season=off disables it', () => {
    expect(load({ search: '?season=christmas', now: new Date(2026, 9, 15) }).html.get('data-season')).toBe('christmas')
    expect(load({ search: '?season=off', now: new Date(2026, 9, 31) }).html.has('data-season')).toBe(false)
    expect(load({ search: '?season=nope', now: new Date(2026, 9, 15) }).html.has('data-season')).toBe(false)
  })

  it('remembers that a visitor turned a season off, per season', () => {
    const off = { 'vueleap-season-off:halloween': '1' }
    const page = load({ now: new Date(2026, 9, 31), stored: off })
    expect(page.html.has('data-season')).toBe(false)
    expect(page.chip()).toContain('Halloween mode')
    expect(load({ now: new Date(2026, 11, 20), stored: off }).html.get('data-season')).toBe('christmas')
  })

  it('names Midsummer for visitors outside pt-BR', () => {
    expect(load({ now: new Date(2026, 5, 20), lang: 'en-GB' }).chip()).toContain('Midsummer mode')
    expect(load({ now: new Date(2026, 5, 20), lang: 'pt-BR' }).chip()).toContain('Festa Junina mode')
  })

  it('stays small', () => {
    expect(source.length).toBeLessThan(6000)
  })
})
