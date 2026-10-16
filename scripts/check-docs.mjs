// Checks the built docs site in docs/:
//   - every internal link and asset resolves, including #fragments
//   - no emoji, no en or em dashes, no other CSS framework names
//   - every class in the markup is a Monsoon class or is defined in docs/style.css
//     (needs a Monsoon checkout next to this repo, or MONSOON_DIR; skipped otherwise)
//
//   node scripts/check-docs.mjs
import { existsSync, promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const docs = path.join(root, 'docs')
const BASE = '/vueleap/'
// Built from code points so this file does not contain the characters it bans.
const DASHES = new RegExp(`[${String.fromCharCode(0x2013, 0x2014)}]`)
const SYMBOLS = new RegExp(`[${String.fromCharCode(0xa9, 0xae, 0x2122)}]`, 'g')
const errors = []
const warnings = []

const pages = (await fs.readdir(docs)).filter((f) => f.endsWith('.html'))
const html = Object.fromEntries(await Promise.all(pages.map(async (p) => [p, await fs.readFile(path.join(docs, p), 'utf8')])))
const idsOf = (source) => new Set([...source.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))
const ids = Object.fromEntries(pages.map((p) => [p, idsOf(html[p])]))

// 1. Links and assets.
let checked = 0
for (const page of pages) {
  const source = html[page].replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
  for (const [, attr, raw] of source.matchAll(/\s(href|src)="([^"]*)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(raw)) continue
    checked++
    let [file, hash] = raw.split('#')
    if (file.startsWith(BASE)) file = file.slice(BASE.length)
    else if (file.startsWith('/')) {
      errors.push(`${page}: ${attr}="${raw}" points outside the site`)
      continue
    }
    file = file.replace(/^\.\//, '')
    const target = file === '' ? (raw.startsWith('#') ? page : 'index.html') : file
    if (!existsSync(path.join(docs, target))) {
      errors.push(`${page}: broken ${attr}="${raw}"`)
      continue
    }
    if (hash && target.endsWith('.html') && !ids[target]?.has(hash)) errors.push(`${page}: missing anchor ${raw}`)
  }
}

// 2. Content rules, on the site files and the scripts that write them.
const textFiles = [
  ...pages.map((p) => path.join(docs, p)),
  path.join(docs, 'style.css'),
  path.join(docs, 'site.js'),
  path.join(docs, 'live/view.js'),
  path.join(docs, 'live/demo.js'),
  path.join(root, 'scripts/live/examples.mjs'),
  path.join(root, 'scripts/build-live.mjs'),
  path.join(root, 'scripts/season-art.mjs'),
  path.join(root, 'assets/seasons/seasons.js'),
  path.join(root, 'assets/seasons/fx.js'),
  path.join(root, 'assets/seasons/seasons.css'),
  ...['build-docs.mjs', 'highlight-docs.mjs', 'site-art.mjs', 'frame-parts.mjs', 'check-docs.mjs', 'render-assets.mjs'].map((f) => path.join(root, 'scripts', f)),
]
for (const file of textFiles) {
  const name = path.relative(root, file)
  const text = await fs.readFile(file, 'utf8')
  if (DASHES.test(text)) errors.push(`${name}: en or em dash`)
  if (/\p{Extended_Pictographic}/u.test(text.replace(SYMBOLS, ''))) errors.push(`${name}: emoji`)
  for (const word of ['tailwind', 'bulma', 'materialize', 'foundation css', 'claude', 'chatgpt']) {
    if (name.endsWith('check-docs.mjs')) continue
    if (text.toLowerCase().includes(word)) errors.push(`${name}: mentions "${word}"`)
  }
  if (!name.endsWith('check-docs.mjs') && /\bbootstrap\b/i.test(text.replace(/bootstrap-?vue[\w-]*/gi, ''))) warnings.push(`${name}: mentions bootstrap`)
}

// 3. Classes: Monsoon or docs/style.css.
const monsoonDir = process.env.MONSOON_DIR ?? path.join(root, '..', 'monsoon')
if (existsSync(path.join(monsoonDir, 'scripts/classes.json'))) {
  const known = new Set()
  const index = JSON.parse(await fs.readFile(path.join(monsoonDir, 'scripts/classes.json'), 'utf8'))
  for (const entry of index.classes) {
    known.add(entry.class)
    for (const variant of entry.variants ?? []) known.add(`${variant}:${entry.class}`)
  }
  const manifests = (await fs.readdir(path.join(monsoonDir, 'src/components'))).filter((f) => f.endsWith('.json'))
  for (const manifest of manifests) {
    for (const component of JSON.parse(await fs.readFile(path.join(monsoonDir, 'src/components', manifest), 'utf8')).components) {
      for (const cls of component.classes) known.add(cls)
    }
  }
  const css = (await fs.readFile(path.join(docs, 'style.css'), 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '')
  for (const m of css.matchAll(/\.([a-zA-Z_][\w-]*)/g)) known.add(m[1])
  // Classes written by Shiki and by the ANSI to HTML step of the demo terminal.
  for (const cls of ['shiki', 'shiki-themes', 'light-plus', 'dark-plus', 'line', 'b', 'd']) known.add(cls)
  const unknown = new Map()
  for (const page of pages) {
    if (page === 'report-example.html') continue
    for (const [, list] of html[page].matchAll(/\sclass="([^"]*)"/g)) {
      for (const cls of list.split(/\s+/).filter(Boolean)) if (!known.has(cls)) unknown.set(cls, page)
    }
  }
  for (const [cls, page] of unknown) errors.push(`${page}: class "${cls}" is not a Monsoon class and not in style.css`)
} else {
  warnings.push(`Monsoon checkout not found at ${monsoonDir}, class check skipped`)
}

for (const w of warnings) console.warn(`warning: ${w}`)
if (errors.length) {
  for (const e of errors) console.error(`error: ${e}`)
  console.error(`${errors.length} problems in ${pages.length} pages`)
  process.exit(1)
}
console.log(`${pages.length} pages, ${checked} internal links and assets checked, no problems`)
