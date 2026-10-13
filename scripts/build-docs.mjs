// Writes the static documentation site in docs/ (served by GitHub Pages as is).
// The rule tables are generated from the rule registry so they never drift.
//
//   npm run build && node scripts/build-docs.mjs
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { analyze, compatSnippet, formatPretty, RULES, VERSION } from '../dist/index.js'
import { copyButton, fileIcon } from './frame-parts.mjs'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const docs = path.join(root, 'docs')
const SITE = 'https://kwy404.github.io/vueleap/'
const REPO = 'https://github.com/kwy404/vueleap'
const NPM = 'https://www.npmjs.com/package/vueleap'
const DATE = '2026-10-12'
const AUTHOR = { '@type': 'Person', name: 'Alexandre Kohler', url: 'https://github.com/kwy404' }

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const md = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>')
const slugify = (s) =>
  s
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// Code blocks are written as plain escaped HTML here, then highlighted at build
// time by scripts/highlight-docs.mjs (Shiki, VS Code Light+ and Dark+ themes)
// and wrapped in a VS Code style editor or terminal window.
const DEFAULT_TITLES = { bash: 'Terminal', js: 'main.js', ts: 'main.ts', vue: 'Component.vue', html: 'index.html', yaml: 'ci.yml' }
const code = (lang, source, title = DEFAULT_TITLES[lang] ?? lang, bareId = '') =>
  `<pre data-title="${esc(title)}"${bareId ? ` data-frame="bare" data-id="${bareId}"` : ''}><code class="language-${lang}">${esc(source.trim())}</code></pre>`
const compare = (lang, before, after, beforeLabel = 'Vue 2', afterLabel = 'Vue 3', titles = []) =>
  `<div class="compare"><figure class="before"><figcaption>${beforeLabel}</figcaption>${code(lang, before, titles[0])}</figure><figure class="after"><figcaption>${afterLabel}</figcaption>${code(lang, after, titles[1])}</figure></div>`

const svg = (cls, body) =>
  `<svg class="${cls}" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`
const ICON = {
  github:
    '<svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>',
  npm: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M1 7h22v9H12v1.6H7.2V16H1V7Zm1.3 1.3v6.4h3.2V9.9h1.6v4.8h1.6V8.3H2.3Zm8 0v8h3.2v-1.6h3.2V8.3h-6.4Zm3.2 1.6h1.6v3.2h-1.6V9.9Zm4.8-1.6v6.4h3.2V9.9h1.6v4.8h1.6V8.3h-6.4Z"/></svg>',
  moon: svg('moon', '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/>'),
  sun: svg('sun', '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
  menu: svg('open', '<path d="M4 7h16M4 12h16M4 17h16"/>'),
  close: svg('close', '<path d="M6 6l12 12M18 6 6 18"/>'),
  arrow: svg('arrow', '<path d="M5 12h14M13 6l6 6-6 6"/>'),
}

const PACKAGE_MANAGERS = [
  ['npm', 'npx vueleap', 'npm install --save-dev vueleap'],
  ['pnpm', 'pnpm dlx vueleap', 'pnpm add --save-dev vueleap'],
  ['yarn', 'yarn dlx vueleap', 'yarn add --dev vueleap'],
  ['bun', 'bunx vueleap', 'bun add --dev vueleap'],
]

/** Terminal window with npm, pnpm, yarn and bun tabs. Every command stays in the static HTML. */
function installTabs(id) {
  const tabs = PACKAGE_MANAGERS.map(
    ([pm], index) =>
      `<button type="button" role="tab" class="tab" id="${id}-tab-${pm}" aria-controls="${id}-${pm}" aria-selected="${index === 0}" :aria-selected="pm === '${pm}' ? 'true' : 'false'" @click="pm = '${pm}'; $storage.set('vueleap-pm', '${pm}')">${fileIcon('terminal')}<span>${pm}</span></button>`,
  ).join('')
  const panels = PACKAGE_MANAGERS.map(
    ([pm, run, add], index) =>
      `<div class="pm-panel" role="tabpanel" id="${id}-${pm}" aria-labelledby="${id}-tab-${pm}" :hidden="pm !== '${pm}'"${index === 0 ? '' : ' hidden'}>${code(
        'bash',
        `# run it once, nothing to install\n${run}\n\n# or add it to the project\n${add}`,
        `Terminal (${pm})`,
        `${id}-${pm}-code`,
      )}${copyButton(`${id}-${pm}-code`, `${pm} commands`)}</div>`,
  ).join('')
  return `<div class="window terminal install" v-data="{ pm: $storage.get('vueleap-pm') || 'npm' }"><div class="window-bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><div class="tabs" role="tablist" aria-label="Package manager">${tabs}</div></div>${panels}</div>`
}

// The CLI demo: real output of the built CLI on the sample app, rendered as
// HTML text so it sizes to its content and stays readable on any screen.
const demoResult = await analyze(path.join(root, 'test/fixtures/vue2-app'))
const demoLines = formatPretty(demoResult, { color: true }).split('\n')
// eslint-disable-next-line no-control-regex
const stripAnsi = (line) => line.replace(/\x1b\[[0-9;]*m/g, '')
function ruleGroup(ruleId) {
  const start = demoLines.findIndex((l) => stripAnsi(l).includes(`  ${ruleId}  `))
  if (start === -1) throw new Error(`rule ${ruleId} not in output`)
  let end = start + 1
  while (end < demoLines.length && stripAnsi(demoLines[end]).trim() !== '') end++
  return demoLines.slice(start, end + 1)
}
function ansiToHtml(line) {
  const flags = new Set()
  let color = ''
  let out = ''
  // eslint-disable-next-line no-control-regex
  for (const part of line.split(/(\x1b\[[0-9;]*m)/)) {
    // eslint-disable-next-line no-control-regex
    const m = /^\x1b\[([0-9;]*)m$/.exec(part)
    if (m) {
      const n = Number(m[1])
      if (n === 1) flags.add('b')
      else if (n === 2) flags.add('d')
      else if (n === 22) flags.clear()
      else if (n === 39) color = ''
      else if ([31, 32, 33, 34, 36].includes(n)) color = `c${n}`
      continue
    }
    if (!part) continue
    const cls = [color, ...flags].filter(Boolean).join(' ')
    out += cls ? `<span class="${cls}">${esc(part)}</span>` : esc(part)
  }
  return out
}
function demoTerminal() {
  const summaryStart = demoLines.findIndex((l) => stripAnsi(l) === 'Summary')
  const excerpt = [
    ...demoLines.slice(0, 2),
    ...ruleGroup('filters'),
    ...ruleGroup('destroy-hooks'),
    ...ruleGroup('keycode-modifiers'),
    `\x1b[2m  ... ${demoResult.summary.byRule.length - 3} more rule groups in the full report\x1b[22m`,
    '',
    ...demoLines.slice(summaryStart, summaryStart + 6),
  ]
  const prompt = '<span class="ps1">~/shop-front</span> <span class="d">$</span> '
  const lines = [`${prompt}npx vueleap`, ...excerpt.map(ansiToHtml), `${prompt}<span class="caret"></span>`]
  const body = lines.map((line, i) => `<span class="tl" style="--i:${i}">${line}</span>`).join('')
  return `<div class="demo" v-data="{ seen: false }" :class="{ armed: true, play: seen }" @visible="seen = true">
<div class="window terminal"><div class="window-bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="panel-tab">Terminal</span><span class="panel-shell">${fileIcon('terminal')}<span>bash: shop-front</span></span></div>
<pre class="term-out" tabindex="0" aria-label="Output of npx vueleap on a sample Vue 2 app"><code>${body}</code></pre></div>
</div>`
}

const NAV = [
  ['migrate-vue-2-to-vue-3.html', 'Migration guide'],
  ['vue-3-breaking-changes-checklist.html', 'Breaking changes'],
  ['vue-compat-build-flags.html', 'Compat flags'],
  ['report-example.html', 'Sample report'],
]

const GUIDES = [
  ['migrate-vue-2-to-vue-3.html', 'How to migrate Vue 2 to Vue 3', 'A step by step plan using the migration build and vueleap.'],
  ['vue-3-breaking-changes-checklist.html', 'Vue 3 breaking changes checklist', `All ${RULES.length} checks, with severity, compat flag and fix.`],
  ['vue-compat-build-flags.html', '@vue/compat build flags explained', 'How configureCompat works and which flags you need.'],
  ['vue-filters-removed-vue-3.html', 'Vue filters removed in Vue 3', 'Replace filters with methods, computed properties or globals.'],
  ['vue-event-bus-vue-3.html', 'Event bus in Vue 3', 'Replace $on, $off and $once with mitt, props or a store.'],
  ['v-model-changes-vue-3.html', 'v-model changes in Vue 3', 'modelValue, update:modelValue, v-model arguments and .sync.'],
  ['vue-2-end-of-life.html', 'Vue 2 end of life', 'What the end of support means and how to plan the upgrade.'],
]

// Sibling projects listed in the footer, the current one excluded.
const MORE = [
  ['graphemely', 'https://kwy404.github.io/graphemely/', 'Truncate, slice and count strings with emoji safely.'],
  ['edgegoat', 'https://kwy404.github.io/edgegoat/', 'Edge case test inputs: time zones, DST, unicode and numbers.'],
  ['numberparrot', 'https://kwy404.github.io/numberparrot/', 'Parse localized number and currency strings back into numbers.'],
  ['breakhound', 'https://github.com/kwy404/breakhound', 'Find bugs in any JavaScript library automatically, no tests needed.'],
  ['Voodoo.js', 'https://github.com/kwy404/Voodoo.js', 'The HTML first framework behind the interactive parts of this site.'],
]

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
}

function article(slug, title, description, extra = {}) {
  return {
    '@type': 'TechArticle',
    headline: title,
    description,
    url: SITE + slug,
    mainEntityOfPage: SITE + slug,
    image: `${SITE}og.png`,
    datePublished: DATE,
    dateModified: DATE,
    inLanguage: 'en',
    author: AUTHOR,
    publisher: AUTHOR,
    about: ['Vue.js', 'Vue 3 migration'],
    ...extra,
  }
}

function faq(items) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  }
}

/** FAQ accordion built with Voodoo.js v-accordion. Every answer stays in the static HTML. */
function faqHtml(items) {
  return `<div class="faq-list" v-accordion v-accordion-single>${items
    .map(
      ([q, a], index) =>
        `<div class="faq-item" v-accordion-item${index === 0 ? '="open"' : ''}><button type="button" class="faq-q">${esc(q)}</button><div class="faq-a"><p>${md(a)}</p></div></div>`,
    )
    .join('\n')}</div>`
}

const logo = (withVersion) =>
  `<a class="logo" href="./"><img src="favicon.svg" alt="" width="36" height="36"><b>vue<span>leap</span></b>${withVersion ? `<span class="ver">v${VERSION}</span>` : ''}</a>`

/**
 * Guide pages are written as a plain body (h1, lede, meta, then content). This
 * turns them into a page header with breadcrumbs and an article with an "On
 * this page" table of contents built from the h2 headings.
 */
function guideBody(slug, body) {
  const m = /^<div class="container narrow">\n<h1>([\s\S]*?)<\/h1>\n<p class="lede">([\s\S]*?)<\/p>\n(?:<p class="meta">([\s\S]*?)<\/p>\n)?([\s\S]*)<\/div>$/.exec(body.trim())
  if (!m) return body
  const [, h1, lede, meta, rest] = m
  const toc = []
  const content = rest.replace(/<h2>([\s\S]*?)<\/h2>/g, (_all, text) => {
    const id = slugify(text)
    toc.push([id, text])
    return `<h2 id="${id}">${text}</h2>`
  })
  const label = NAV.find(([href]) => href === slug)?.[1] ?? GUIDES.find(([href]) => href === slug)?.[1] ?? h1
  return `<header class="page-head mesh"><div class="container">
<nav class="crumbs" aria-label="Breadcrumb"><a href="./">vueleap</a><span aria-hidden="true">/</span><a href="./#guides">Guides</a><span aria-hidden="true">/</span><span aria-current="page">${label}</span></nav>
<h1>${h1}</h1>
<p class="lede">${lede}</p>
${meta ? `<p class="meta">${meta}</p>` : ''}
</div></header>
<div class="container doc">
<article class="prose">
${content}
</article>
<aside class="toc" aria-label="On this page"><b>On this page</b>${toc.map(([id, text]) => `<a href="#${id}">${text}</a>`).join('')}</aside>
</div>`
}

function layout({ slug, title, description, body, ld }) {
  const url = SITE + (slug === 'index.html' ? '' : slug)
  const nav = NAV.map(([href, label]) => `<a href="${href}"${href === slug ? ' aria-current="page"' : ''}>${label}</a>`).join('')
  const guideLinks = GUIDES.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('')
  const more = MORE.map(([name, href, text]) => `<li><a href="${href}">${name}</a><span>${text}</span></li>`).join('')
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#42b883">
<meta property="og:type" content="${slug === 'index.html' ? 'website' : 'article'}">
<meta property="og:site_name" content="vueleap">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="vueleap, the Vue 2 to Vue 3 migration tool, with Hop the frog leaping from lily pad 2 to lily pad 3">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${SITE}og.png">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="style.css">
<script>try{var t=localStorage.getItem('voodoo:theme');try{t=JSON.parse(t)}catch(e){}if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>
<script src="https://cdn.jsdelivr.net/npm/voodoojs@1.0.0/dist/voodoo.full.min.js" defer></script>
${jsonLd({ '@context': 'https://schema.org', ...(Array.isArray(ld) ? { '@graph': ld } : ld) })}
</head>
<body>
<a class="skip" href="#content">Skip to content</a>
<header class="site" v-data="{ menu: false }" :class="{ 'menu-open': menu }" @keydown.escape="menu = false">
<div class="container header-row">
${logo(true)}
<nav class="main" id="site-nav" aria-label="Main">${nav}</nav>
<div class="header-actions">
<a class="icon-btn" href="${REPO}" aria-label="vueleap on GitHub">${ICON.github}</a>
<button class="icon-btn theme-toggle" type="button" v-theme-toggle aria-label="Switch between light and dark theme">${ICON.moon}${ICON.sun}</button>
<button class="icon-btn menu-toggle" type="button" aria-controls="site-nav" aria-expanded="false" :aria-expanded="menu ? 'true' : 'false'" aria-label="Menu" @click="menu = !menu">${ICON.menu}${ICON.close}</button>
</div>
</div>
</header>
<noscript><style>.menu-toggle{display:none!important}@media (max-width:960px){nav.main{display:flex;position:static;box-shadow:none;border:0;padding:0;flex-direction:row;flex-wrap:wrap}.header-row{height:auto;flex-wrap:wrap;padding-top:12px;padding-bottom:12px}}</style></noscript>
<main id="content">
${body}
</main>
<footer class="site"><div class="container">
<div class="footer-grid">
<div class="footer-brand">${logo(false)}<p>Migrate Vue 2 to Vue 3 with one command. Free and open source, MIT licensed.</p><div class="social"><a class="icon-btn" href="${REPO}" aria-label="vueleap on GitHub">${ICON.github}</a><a class="icon-btn" href="${NPM}" aria-label="vueleap on npm">${ICON.npm}</a></div></div>
<div><h2>Guides</h2><ul>${guideLinks}</ul></div>
<div><h2>Project</h2><ul><li><a href="${REPO}">GitHub</a></li><li><a href="${NPM}">npm</a></li><li><a href="report-example.html">Sample report</a></li><li><a href="${REPO}/blob/main/CHANGELOG.md">Changelog</a></li><li><a href="${REPO}/issues">Issues</a></li><li><a href="${REPO}/blob/main/CONTRIBUTING.md">Contributing</a></li></ul></div>
<div class="more-col"><h2>More from kwy404</h2><ul class="more">${more}</ul></div>
</div>
<div class="footer-bottom"><span>vueleap ${VERSION}, MIT licensed. Made by <a href="https://github.com/kwy404">Alexandre Kohler</a>.</span><span>Interactive parts built with <a href="https://github.com/kwy404/Voodoo.js">Voodoo.js</a>, code highlighted with <a href="https://shiki.style/">Shiki</a>.</span></div>
</div></footer>
</body>
</html>
`
}

const guideCards = (exclude) =>
  `<div class="cards">${GUIDES.filter(([href]) => href !== exclude)
    .map(([href, label, text]) => `<a class="card" href="${href}"><strong>${label}</strong><span>${text}</span><span class="go">Read the guide</span></a>`)
    .join('')}</div>`

/** Lowercase text used by the checklist search, safe inside a quoted expression. */
const searchText = (r) =>
  [r.id, r.title, r.description, ...r.compatFlags]
    .join(' ')
    .toLowerCase()
    .replace(/[^a-z0-9@:._/ -]+/g, ' ')
    .replace(/ +/g, ' ')
    .trim()
const MATCH = (prefix) =>
  `(sev === 'all' || ${prefix}s === sev) && (!fixOnly || ${prefix}f) && ${prefix}t.includes(q.trim().toLowerCase())`

function ruleRows(rules) {
  return rules
    .map(
      (r) =>
        `<tr v-show="(sev === 'all' || sev === '${r.severity}') && (!fixOnly || ${r.fixable}) && '${searchText(r)}'.includes(q.trim().toLowerCase())"><td><code>${r.id}</code></td><td><span class="sev ${r.severity}">${r.severity}</span></td><td><strong>${esc(r.title)}</strong><br>${md(r.description)}</td><td>${
          r.compatFlags.length ? r.compatFlags.map((f) => `<code>${f}</code>`).join(' ') : 'none'
        }</td><td>${r.fixable ? 'Yes' : 'No'}</td><td><a href="${r.docs}">Guide</a></td></tr>`,
    )
    .join('\n')
}
const ruleTable = (rules) =>
  `<div class="table-wrap"><table><thead><tr><th scope="col">Rule</th><th scope="col">Severity</th><th scope="col">What changes</th><th scope="col">@vue/compat flag</th><th scope="col">Auto fix</th><th scope="col">Docs</th></tr></thead><tbody>${ruleRows(rules)}</tbody></table></div>`

const howTo = (text) => `<h2>How vueleap detects it</h2>${text}<p>Run it on your project:</p>${code('bash', 'npx vueleap')}`

const pages = []

/// Home page.
{
  const fixable = RULES.filter((r) => r.fixable).length
  const features = [
    ['scan', 'Scan the whole project', `${RULES.length} checks over templates, scripts, styles and package.json, with file, line and column.`],
    ['fix', 'Apply safe fixes', `${fixable} codemods that are provably safe, previewed as a diff before anything is written.`],
    ['compat', 'Get exact compat flags', 'The minimal configureCompat and compatConfig for the @vue/compat migration build.'],
    ['report', 'Share an HTML report', 'One standalone file with filters, light and dark themes and links to the official guide.'],
    ['ci', 'Gate it in CI', 'Use --fail-on error and --json to stop Vue 2 only code from coming back.'],
    ['api', 'Use the API', 'Call analyze() and fix() from Node.js to build your own migration tooling.'],
  ]
  const steps = [
    ['Measure', 'List every breaking change with file, line, severity and an effort score.', 'npx vueleap'],
    ['Run on Vue 3 today', 'Print the minimal @vue/compat flags so the app boots on the migration build.', 'npx vueleap --compat'],
    ['Fix', `Preview the ${fixable} safe codemods as a diff, then write them. Fix the rest rule by rule.`, 'npx vueleap --fix --write'],
    ['Keep it fixed', 'Fail the build when Vue 2 only code comes back, and drop the compat flags.', 'npx vueleap --fail-on error'],
  ]
  const faqs = [
    ['How do I migrate from Vue 2 to Vue 3?', 'Run `npx vueleap` to list every breaking change, switch your build to Vue 3 with the @vue/compat migration build using the generated flags, fix the findings (starting with `npx vueleap --fix --write`), upgrade vue-router, Vuex and UI libraries, then remove the compat flags one by one.'],
    ['Is vueleap safe to run on my code?', 'Yes. By default it only reads files. `--fix` prints a diff and writes nothing unless you add `--write`, and it never touches files outside the project folder.'],
    ['Does it support TypeScript, script setup and class components?', 'Yes. Single file components with `lang="ts"`, TSX, Vue 2.7 `<script setup>` and vue-property-decorator class components are analyzed. Pug templates are skipped with a warning.'],
    ['Is Vue 2 still supported?', 'No. Vue 2 reached end of life on December 31, 2023 and no longer receives updates from the Vue team.'],
  ]
  const compatOutput = compatSnippet(demoResult.compat)
  const [mainJs, viteJs] = (() => {
    const snippet = /\/\/ main\.js[\s\S]*/.exec(compatOutput)?.[0] ?? ''
    const at = snippet.indexOf('// vite.config.js')
    return [snippet.slice(0, at).trim(), snippet.slice(at).trim()]
  })()
  const showcaseFiles = [
    ['main.js', mainJs.replace(/^\/\/ main\.js.*\n/, `// Generated by npx vueleap --compat for the sample app.\n// 'vue' is aliased to '@vue/compat' in vite.config.js.\n`)],
    ['vite.config.js', viteJs.replace(/^\/\/ vite\.config\.js\n/, '')],
  ]
  const showcaseTabs = showcaseFiles
    .map(
      ([file], index) =>
        `<button type="button" role="tab" class="tab" id="show-tab-${index}" aria-controls="show-panel-${index}" aria-selected="${index === 0}" :aria-selected="file === ${index} ? 'true' : 'false'" @click="file = ${index}">${fileIcon(file)}<span>${file}</span></button>`,
    )
    .join('')
  const showcasePanels = showcaseFiles
    .map(
      ([file, source], index) =>
        `<div role="tabpanel" id="show-panel-${index}" aria-labelledby="show-tab-${index}" :hidden="file !== ${index}"${index === 0 ? '' : ' hidden'}>${code('js', source, file, `show-code-${index}`)}</div>`,
    )
    .join('')
  const before = `<template>
  <div class="products">
    <input @keyup.13="search">
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.price | currency }}
        <product-card :product.sync="selected" />
      </li>
    </ul>
  </div>
</template>

<script>
import { EventBus } from '../event-bus'

export default {
  filters: {
    currency: (value) => '$' + value.toFixed(2),
  },
  mounted() {
    EventBus.$on('cart:add', this.onAdd)
  },
  beforeDestroy() {
    EventBus.$off('cart:add', this.onAdd)
  },
}
</script>`
  const after = `<template>
  <div class="products">
    <input @keyup.enter="search">
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ currency(product.price) }}
        <product-card v-model:product="selected" />
      </li>
    </ul>
  </div>
</template>

<script>
import { emitter } from '../event-bus'

export default {
  methods: {
    currency: (value) => '$' + value.toFixed(2),
  },
  mounted() {
    emitter.on('cart:add', this.onAdd)
  },
  beforeUnmount() {
    emitter.off('cart:add', this.onAdd)
  },
}
</script>`
  pages.push({
    slug: 'index.html',
    title: 'vueleap: migrate Vue 2 to Vue 3 with one command',
    description: `Free Vue 3 migration tool. npx vueleap finds every Vue 2 to Vue 3 breaking change file by file, prints the exact @vue/compat flags you need and applies safe automatic fixes.`,
    ld: [
      {
        '@type': 'SoftwareApplication',
        name: 'vueleap',
        alternateName: 'vue2to3',
        description: 'Command line tool that finds every Vue 2 to Vue 3 breaking change, lists the @vue/compat flags a project needs and applies safe automatic fixes.',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Windows, macOS, Linux',
        softwareVersion: VERSION,
        url: SITE,
        downloadUrl: NPM,
        codeRepository: REPO,
        license: 'https://opensource.org/licenses/MIT',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        author: AUTHOR,
        image: `${SITE}og.png`,
      },
      faq(faqs),
    ],
    body: `<section class="hero mesh">
<div class="container">
<div class="hero-grid">
<div class="hero-copy">
<a class="eyebrow" href="vue-2-end-of-life.html"><b>EOL</b>Vue 2 is end of life. Plan the upgrade</a>
<h1>Migrate Vue 2 to Vue 3 <span class="grad">with one command</span></h1>
<p class="lead">vueleap scans your Vue 2 project and tells you exactly what breaks in Vue 3, file by file and line by line, with the official migration guide link, the <code>@vue/compat</code> flags you need and safe automatic fixes.</p>
${installTabs('hero')}
<div class="cta"><a class="button primary" href="migrate-vue-2-to-vue-3.html">Read the migration guide ${ICON.arrow}</a><a class="button" href="${REPO}">${ICON.github} Star on GitHub</a></div>
<div class="hero-badges"><a href="${NPM}"><img src="https://img.shields.io/npm/v/vueleap?color=42b883&amp;label=npm" alt="vueleap npm version" height="20"></a><a href="${NPM}"><img src="https://img.shields.io/npm/dm/vueleap?color=42b883&amp;label=downloads" alt="vueleap npm downloads per month" height="20"></a><a href="${REPO}/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/vueleap?color=42b883" alt="MIT license" height="20"></a></div>
</div>
<div class="hero-visual"><img class="mascot" src="mascot.svg" width="440" height="330" alt="Hop, the vueleap frog mascot, leaping from a lily pad marked 2 to a lily pad marked 3"></div>
</div>
<div class="stats">
<div class="stat"><b>${RULES.length}</b><span>breaking change checks</span></div>
<div class="stat"><b>${fixable}</b><span>safe automatic fixes</span></div>
<div class="stat"><b>0</b><span>config files needed</span></div>
<div class="stat"><b>100%</b><span>local, nothing uploaded</span></div>
</div>
</div>
</section>

<section class="section" id="demo">
<div class="container">
<div class="section-head"><span class="kicker">Real output</span><h2>Every breaking change, file by file</h2><p>One command reads templates, scripts, styles and package.json, then groups what breaks in Vue 3 by rule with the line, the compat flag and the official guide link.</p></div>
${demoTerminal()}
</div>
</section>

<section class="section alt" id="before-after">
<div class="container">
<div class="section-head"><span class="kicker">Problem and fix</span><h2>From Vue 2 code that breaks to Vue 3 code that ships</h2><p>A typical Vue 2 component hides five breaking changes. vueleap finds all of them and rewrites the safe ones for you.</p></div>
<div class="compare wide"><figure class="before"><figcaption>Vue 2: breaks on Vue 3</figcaption>${code('vue', before, 'ProductList.vue')}</figure><figure class="after"><figcaption>Vue 3: after vueleap</figcaption>${code('vue', after, 'ProductList.vue')}</figure></div>
<div class="compare-notes"><div class="before"><ul><li><code>| currency</code>: filters are removed in Vue 3.</li><li><code>@keyup.13</code>: keyCode modifiers are gone.</li><li><code>:product.sync</code>: the .sync modifier is removed.</li><li><code>$on</code> and <code>$off</code>: no more instance event emitter.</li><li><code>beforeDestroy</code>: renamed to beforeUnmount.</li></ul></div><div class="after"><ul><li>Rewritten by <code>npx vueleap --fix --write</code>: <code>@keyup.enter</code>, <code>v-model:product</code> and <code>beforeUnmount</code>.</li><li>Flagged with a guide: <a href="vue-filters-removed-vue-3.html">filters to methods</a> and <a href="vue-event-bus-vue-3.html">the event bus to mitt</a>.</li><li>Every finding links to the official Vue 3 migration guide.</li></ul></div></div>
</div>
</section>

<section class="section" id="compat">
<div class="container">
<div class="section-head"><span class="kicker">Migration build</span><h2>The exact @vue/compat config, generated</h2><p>Run Vue 3 today with Vue 2 behavior only where your code still needs it. vueleap prints the smallest configuration for your project, split into runtime and compiler flags.</p></div>
<div class="showcase" v-data="{ file: 0 }">
<div class="window editor big">
<div class="window-bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><div class="tabs" role="tablist" aria-label="Generated files" style="display:flex">${showcaseTabs}</div><span v-show="file === 0" style="display:contents">${copyButton('show-code-0', 'main.js code')}</span><span v-show="file === 1" style="display:none">${copyButton('show-code-1', 'vite.config.js code')}</span></div>
<div class="crumb" aria-hidden="true">shop-front<span>&gt;</span><span v-text="file === 0 ? 'src > main.js' : 'vite.config.js'">src &gt; main.js</span></div>
${showcasePanels}
<div class="statusbar" aria-hidden="true"><span>main</span><span class="hide-sm">vueleap ${VERSION}</span><span class="right"><span class="hide-sm">Spaces: 2</span><span class="hide-sm">UTF-8</span><span>JavaScript</span></span></div>
</div>
<div class="showcase-notes"><div><b>Vue 3 by default</b><span><code>MODE: 3</code> turns everything to Vue 3 and opts in only to what the code still uses.</span></div><div><b>Runtime and compiler</b><span>Runtime flags go to <code>configureCompat</code>, template flags to <code>compatConfig</code>.</span></div><div><b>Shrinks as you fix</b><span>Rerun after each fix and delete the flags that disappear. Read <a href="vue-compat-build-flags.html">the flags guide</a>.</span></div></div>
</div>
</div>
</section>

<section class="section alt" id="features">
<div class="container">
<div class="section-head"><span class="kicker">Features</span><h2>Everything you need to leave Vue 2 behind</h2><p>One dependency free command for the whole migration, from the first inventory to the last compat flag.</p></div>
<div class="features">${features
      .map(([icon, title, text]) => `<div class="feature"><span class="icon"><img src="icons/${icon}.svg" width="32" height="32" alt=""></span><h3>${title}</h3><p>${text}</p></div>`)
      .join('')}</div>
<p class="section-foot narrow-foot">vueleap checks everything from the official <a href="https://v3-migration.vuejs.org/breaking-changes/">Vue 3 migration guide</a> that can be found statically: filters, <code>$listeners</code>, <code>$scopedSlots</code>, the <code>$on</code>/<code>$off</code> event bus, <code>$set</code> and <code>$delete</code>, <code>new Vue()</code> and the global API, <code>Vue.extend</code>, lifecycle and custom directive hook renames, <code>v-model</code> on components, <code>.sync</code>, <code>.native</code>, keyCode modifiers, functional components, <code>inline-template</code>, <code>v-if</code> with <code>v-for</code>, transition classes, render functions, and Vue 2 only dependencies such as vue-router 3, Vuex 3, BootstrapVue, Vuetify 2 and Element UI. See the <a href="vue-3-breaking-changes-checklist.html">full breaking changes checklist</a>.</p>
</div>
</section>

<section class="section" id="how-it-works">
<div class="container">
<div class="section-head"><span class="kicker">How it works</span><h2>Four steps from Vue 2 to Vue 3</h2><p>Measure first, run on Vue 3 early, fix with confidence and keep it fixed.</p></div>
<div class="steps-strip">${steps
      .map(([title, text, command], i) => `<div class="step"><span class="num">${i + 1}</span><h3>${title}</h3><p>${text}</p><code>${command}</code></div>`)
      .join('')}</div>
</div>
</section>

<section class="section alt" id="report">
<div class="container report-preview">
<div>
<span class="kicker">Sample report</span>
<h2>See a real report</h2>
<p>This is the HTML report generated for a small sample Vue 2 shop. Generate yours with <code>npx vueleap --html report.html</code> and share one file with the team.</p>
<ul class="checks"><li>Summary cards with errors, warnings and auto fixable findings</li><li>Filters by severity and rule, light and dark themes</li><li>The minimal <code>@vue/compat</code> configuration for the project</li></ul>
<div class="cta" style="display:flex;flex-wrap:wrap;gap:12px"><a class="button primary" href="report-example.html">Open the sample report ${ICON.arrow}</a><a class="button" href="vue-3-breaking-changes-checklist.html">Browse all ${RULES.length} checks</a></div>
</div>
<a class="browser" href="report-example.html" aria-label="Open the sample vueleap HTML report"><div class="bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="url">kwy404.github.io/vueleap/report-example.html</span></div><img src="report.png" width="1280" height="1180" loading="lazy" alt="vueleap HTML report for a Vue 2 app: summary cards, minimal @vue/compat configuration and Vue 3 breaking changes grouped by rule"></a>
</div>
</section>

<section class="section" id="guides">
<div class="container">
<div class="section-head"><span class="kicker">Guides</span><h2>Learn the Vue 3 changes that matter</h2><p>Short, practical guides with before and after code for each breaking change.</p></div>
${guideCards('index.html')}
</div>
</section>

<section class="section alt" id="faq">
<div class="container faq-wrap">
<div class="section-head"><span class="kicker">FAQ</span><h2>Questions</h2></div>
${faqHtml(faqs)}
</div>
</section>

<section class="section">
<div class="container">
<div class="cta-band mesh">
<img class="mascot-sm" src="mascot.svg" width="132" height="99" alt="">
<h2>Ready to leap to Vue 3?</h2>
<p>Run it now on your project. Nothing to install, nothing to configure, nothing leaves your machine.</p>
${installTabs('end')}
<div class="cta"><a class="button primary" href="migrate-vue-2-to-vue-3.html">Read the migration guide ${ICON.arrow}</a><a class="button" href="${NPM}">${ICON.npm} View on npm</a></div>
</div>
</div>
</section>`,
  })
}

// Migration guide.
{
  const slug = 'migrate-vue-2-to-vue-3.html'
  const title = 'How to migrate Vue 2 to Vue 3: a step by step guide'
  const description = 'Migrate a Vue 2 app to Vue 3 step by step: inventory breaking changes, run the @vue/compat migration build with the right flags, apply safe fixes and upgrade the ecosystem.'
  const faqs = [
    ['How long does a Vue 2 to Vue 3 migration take?', 'It depends on how much the code relies on removed APIs and on Vue 2 only libraries. Run `npx vueleap` to get an inventory and an effort score: each finding adds a weight, and fixable findings count for a tenth. UI libraries such as Vuetify 2 or BootstrapVue usually dominate the total.'],
    ['Can I migrate incrementally?', 'Yes. The @vue/compat migration build runs Vue 2 style code on Vue 3, and each compat flag can be turned off once the matching code is fixed. vueleap prints the minimal set of flags your project needs.'],
    ['Do I need to rewrite my components with the Composition API?', 'No. The Options API is fully supported in Vue 3. Migrate first, then adopt the Composition API where it helps.'],
  ]
  pages.push({
    slug,
    title,
    description,
    ld: [article(slug, title, description), faq(faqs)],
    body: `<div class="container narrow">
<h1>How to migrate Vue 2 to Vue 3</h1>
<p class="lede">The safest way to upgrade is to measure first, run Vue 3 in compatibility mode, then remove Vue 2 behavior one piece at a time. This guide follows the official <a href="https://v3-migration.vuejs.org/migration-build">migration build</a> process and uses vueleap to know exactly what to change.</p>
<p class="meta">Updated ${DATE}</p>
<h2>1. Take an inventory of breaking changes</h2>
<p>Run vueleap at the root of the project. It reads <code>.vue</code>, JavaScript, TypeScript and style files plus <code>package.json</code>, skips <code>node_modules</code>, <code>dist</code> and anything in <code>.gitignore</code>, and groups findings by rule.</p>
${installTabs('guide')}
<p>Add <code>--html report.html</code> to also get a shareable report.</p>
<p>Every finding has a severity: <strong>error</strong> breaks at compile time or runtime, <strong>warning</strong> changes behavior, <strong>info</strong> deserves a review. The summary ends with an effort score to compare projects or track progress.</p>
<h2>2. Upgrade the build tooling</h2>
<p>Vue 3 single file components are compiled by <code>@vue/compiler-sfc</code>, which ships with <code>vue</code>. Remove <code>vue-template-compiler</code>, use <code>vue-loader</code> 17 with webpack or Vue CLI 5, or <code>@vitejs/plugin-vue</code> with Vite. vueleap reports these under <code>vue2-tooling</code>.</p>
<h2>3. Install Vue 3 with the migration build</h2>
${code('bash', 'npm install vue@^3.5 @vue/compat@^3.5\nnpm uninstall vue-template-compiler')}
<p>Alias <code>vue</code> to <code>@vue/compat</code> and enable compat mode in the template compiler. vueleap prints this configuration with only the flags your project needs, running everything else in Vue 3 mode (<code>MODE: 3</code>):</p>
${code('js', "// vite.config.js\nimport vue from '@vitejs/plugin-vue'\n\nexport default {\n  resolve: { alias: { vue: '@vue/compat' } },\n  plugins: [\n    vue({\n      template: {\n        compilerOptions: {\n          compatConfig: { MODE: 3, COMPILER_FILTERS: true, COMPILER_V_BIND_SYNC: true },\n        },\n      },\n    }),\n  ],\n}", 'vite.config.js')}
${code('js', "// main.js\nimport { configureCompat } from 'vue'\n\nconfigureCompat({\n  MODE: 3,\n  GLOBAL_MOUNT: true,\n  INSTANCE_EVENT_EMITTER: true,\n  FILTERS: true,\n})")}
<p>Read <a href="vue-compat-build-flags.html">@vue/compat build flags explained</a> for what each flag does.</p>
<h2>4. Apply the safe automatic fixes</h2>
<p>Some changes are pure renames. vueleap rewrites them while preserving formatting, and shows a diff first:</p>
${code('bash', 'npx vueleap --fix           # preview\nnpx vueleap --fix --write   # apply')}
<p>That covers <code>beforeDestroy</code> and <code>destroyed</code>, custom directive hooks, <code>$scopedSlots</code>, transition class names, keyCode modifiers with a single key name, <code>.sync</code> to <code>v-model:prop</code>, <code>@hook:</code> events and <code>Vue.config.productionTip</code>.</p>
<h2>5. Fix the rest, rule by rule</h2>
<ol class="steps">
<li>Replace <code>new Vue()</code> with <code>createApp()</code> and move <code>Vue.use</code>, <code>Vue.component</code>, <code>Vue.directive</code> and <code>Vue.prototype</code> to the app instance.</li>
<li>Remove <a href="vue-filters-removed-vue-3.html">filters</a> and replace the <a href="vue-event-bus-vue-3.html">event bus</a>.</li>
<li>Update components used with <a href="v-model-changes-vue-3.html">v-model</a> to <code>modelValue</code> and <code>update:modelValue</code>.</li>
<li>Rewrite render functions to import <code>h</code> from <code>vue</code>, and replace <code>$listeners</code> and <code>$children</code>.</li>
</ol>
<p>The <a href="vue-3-breaking-changes-checklist.html">breaking changes checklist</a> links every rule to the official guide.</p>
<h2>6. Upgrade the ecosystem</h2>
<p>Move to vue-router 4 and to Vuex 4 or Pinia. Replace Vue 2 only UI libraries: BootstrapVue with bootstrap-vue-next, Vuetify 2 with Vuetify 3, Element UI with Element Plus. vueleap lists them from <code>package.json</code> with the suggested successor.</p>
<h2>7. Turn compat off and keep it off</h2>
<p>Remove each compat flag once vueleap no longer reports the matching rule. When the list is empty, drop the alias and <code>@vue/compat</code>. Then keep the codebase clean in CI:</p>
${code('bash', 'npx vueleap --fail-on error')}
<h2>Frequently asked questions</h2>
${faqHtml(faqs)}
<h2>More guides</h2>
${guideCards(slug)}
</div>`,
  })
}

// Checklist.
{
  const slug = 'vue-3-breaking-changes-checklist.html'
  const title = `Vue 3 breaking changes checklist (${RULES.length} checks)`
  const description = `Complete Vue 2 to Vue 3 breaking changes checklist: ${RULES.length} checks with severity, @vue/compat flag, auto fix availability and a link to the official migration guide.`
  const groups = [
    ['template', 'Templates'],
    ['script', 'Scripts and component options'],
    ['style', 'Styles'],
    ['dependencies', 'Dependencies'],
  ]
  pages.push({
    slug,
    title,
    description,
    ld: article(slug, title, description),
    body: `<header class="page-head mesh"><div class="container">
<nav class="crumbs" aria-label="Breadcrumb"><a href="./">vueleap</a><span aria-hidden="true">/</span><a href="./#guides">Guides</a><span aria-hidden="true">/</span><span aria-current="page">Breaking changes</span></nav>
<h1>Vue 3 breaking changes checklist</h1>
<p class="lede">Every change below can break or silently change a Vue 2 app when it runs on Vue 3. vueleap checks all of them automatically and links each one to the official migration guide.</p>
<p class="meta">${RULES.length} checks, ${RULES.filter((r) => r.fixable).length} with safe automatic fixes. Generated from vueleap ${VERSION}.</p>
</div></header>
<div class="container doc full">
<div class="callout"><p>Instead of reading the list, run <code>npx vueleap</code> in your project to see which of these apply, with file and line numbers.</p></div>
<div class="checklist" v-data="{ q: '', sev: 'all', fixOnly: false, rules: [${RULES.map((r) => `{ c: '${r.category}', s: '${r.severity}', f: ${r.fixable}, t: '${searchText(r)}' }`).join(', ')}] }">
<div class="filters" role="search" v-cloak>
<input type="search" v-model="q" placeholder="Search rules, APIs or compat flags" aria-label="Search the checklist">
<select v-model="sev" aria-label="Filter by severity"><option value="all">All severities</option><option value="error">Errors</option><option value="warning">Warnings</option><option value="info">Info</option></select>
<label class="check"><input type="checkbox" v-model="fixOnly"> Auto fixable only</label>
<span class="count" aria-live="polite" v-text="rules.filter(r => ${MATCH('r.')}).length + ' of ${RULES.length} checks shown'">${RULES.length} checks</span>
</div>
${groups
  .map(
    ([category, label]) =>
      `<section v-show="rules.some(r => r.c === '${category}' && ${MATCH('r.')})"><h2>${label}</h2>${ruleTable(RULES.filter((r) => r.category === category))}</section>`,
  )
  .join('\n')}
<p class="empty" v-cloak v-show="!rules.some(r => ${MATCH('r.')})">No check matches this search.</p>
</div>
<div class="prose">
<h2>How vueleap detects them</h2>
<p>Templates are parsed with <code>@vue/compiler-dom</code> (the Vue 3 compiler parser, which still understands Vue 2 syntax), scripts with <code>@babel/parser</code> (JavaScript, TypeScript, JSX and decorators), styles with a comment aware scanner, and dependencies from <code>package.json</code>. Component options are only checked on objects that really look like components, so a <code>{ destroyed: true }</code> flag is not mistaken for a lifecycle hook.</p>
<h2>More guides</h2>
${guideCards(slug)}
</div>
</div>`,
  })
}

// Compat flags.
{
  const slug = 'vue-compat-build-flags.html'
  const title = '@vue/compat build flags explained: configureCompat and compatConfig'
  const description = 'How the Vue 3 migration build works, what MODE 2 and MODE 3 mean, every @vue/compat flag vueleap can detect and how to get the minimal configureCompat for your project.'
  const flags = new Map()
  for (const rule of RULES) for (const flag of rule.compatFlags) flags.set(flag, [...(flags.get(flag) ?? []), rule])
  const rows = [...flags.entries()]
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(
      ([flag, rules]) =>
        `<tr><td><code>${flag}</code></td><td>${flag.startsWith('COMPILER_') ? 'Compiler' : 'Runtime'}</td><td>${rules
          .map((r) => `<code>${r.id}</code>: ${esc(r.title)}`)
          .join('<br>')}</td></tr>`,
    )
    .join('')
  const faqs = [
    ['Should I use @vue/compat?', 'Use it for medium and large apps that cannot be migrated in one go: it lets the app run on Vue 3 while Vue 2 code is still being converted. It is a migration aid, so plan to remove it. Small apps are often faster to migrate directly.'],
    ['What is the difference between configureCompat and compatConfig?', '`configureCompat()` sets runtime flags in the browser. Template flags (the `COMPILER_` ones) are applied when templates are compiled, so they go in `compilerOptions.compatConfig` of your build tool plugin.'],
    ['What does MODE 3 mean?', 'With `MODE: 3`, every feature behaves like Vue 3 unless its flag is set to `true`. With the default `MODE: 2`, everything behaves like Vue 2 unless its flag is set to `false`.'],
  ]
  pages.push({
    slug,
    title,
    description,
    ld: [article(slug, title, description), faq(faqs)],
    body: `<div class="container narrow">
<h1>@vue/compat build flags explained</h1>
<p class="lede"><code>@vue/compat</code>, the Vue 3 migration build, is a build of Vue 3 that can emulate Vue 2 behavior feature by feature. Each feature has a flag. Knowing which flags your code needs tells you exactly what is left to migrate.</p>
<p class="meta">Updated ${DATE}</p>
<h2>Runtime flags and compiler flags</h2>
<p>Runtime flags (such as <code>GLOBAL_MOUNT</code> or <code>INSTANCE_EVENT_EMITTER</code>) are set with <code>configureCompat()</code>, globally or per component with the <code>compatConfig</code> option. Compiler flags (the <code>COMPILER_</code> ones, such as <code>COMPILER_FILTERS</code>) change how templates compile and are set in the build tool.</p>
${compare(
  'js',
  "// Default: Vue 2 behavior everywhere (MODE: 2)\nimport { configureCompat } from 'vue'\n\n// opt out feature by feature\nconfigureCompat({\n  FILTERS: false,\n  INSTANCE_EVENT_EMITTER: false,\n})",
  "// Recommended with vueleap: Vue 3 by default\nimport { configureCompat } from 'vue'\n\n// opt in only to what the code still needs\nconfigureCompat({\n  MODE: 3,\n  FILTERS: true,\n  INSTANCE_EVENT_EMITTER: true,\n})",
  'Opt out (MODE 2)',
  'Opt in (MODE 3)',
  ['main.js', 'main.js'],
)}
<h2>Get the minimal flags for your project</h2>
<p>vueleap maps every finding to its flag and prints the smallest configuration that keeps your app running, split into runtime and compiler parts:</p>
${code('bash', 'npx vueleap --compat')}
<p>As you fix findings, rerun the command: flags disappear from the output, and you can delete them from your config. When nothing is left, remove <code>@vue/compat</code>.</p>
<h2>Flags vueleap detects</h2>
<div class="table-wrap"><table><thead><tr><th scope="col">Flag</th><th scope="col">Kind</th><th scope="col">vueleap rules</th></tr></thead><tbody>${rows}</tbody></table></div>
<p>The full list of flags, including ones that cannot be detected statically (such as <code>ATTR_FALSE_VALUE</code>), is in the <a href="https://v3-migration.vuejs.org/migration-build#compat-configuration">official compat configuration reference</a>.</p>
<h2>Frequently asked questions</h2>
${faqHtml(faqs)}
<h2>More guides</h2>
${guideCards(slug)}
</div>`,
  })
}

// Filters.
{
  const slug = 'vue-filters-removed-vue-3.html'
  const title = 'Vue filters removed in Vue 3: how to replace them'
  const description = 'Filters like {{ price | currency }} were removed in Vue 3. Learn how to replace local and global filters with methods, computed properties or globalProperties, and find every filter automatically.'
  pages.push({
    slug,
    title,
    description,
    ld: article(slug, title, description),
    body: `<div class="container narrow">
<h1>Vue filters were removed in Vue 3</h1>
<p class="lede">The pipe syntax <code>{{ value | filter }}</code>, the <code>filters</code> component option and <code>Vue.filter()</code> do not exist in Vue 3. Filters were plain functions with special syntax, so the replacement is a plain function call.</p>
<p class="meta">Official guide: <a href="https://v3-migration.vuejs.org/breaking-changes/filters">Filters, Vue 3 migration guide</a></p>
<h2>Local filters</h2>
${compare(
  'vue',
  `<template>
  <p>{{ price | currency('EUR') }}</p>
</template>

<script>
export default {
  props: ['price'],
  filters: {
    currency(value, code) {
      return new Intl.NumberFormat('en', {
        style: 'currency', currency: code,
      }).format(value)
    },
  },
}
</script>`,
  `<template>
  <p>{{ currency(price, 'EUR') }}</p>
</template>

<script>
export default {
  props: ['price'],
  methods: {
    currency(value, code) {
      return new Intl.NumberFormat('en', {
        style: 'currency', currency: code,
      }).format(value)
    },
  },
}
</script>`,
  'Vue 2', 'Vue 3', ['PriceTag.vue', 'PriceTag.vue'],
)}
<p>Note the argument order: the filtered value becomes the first argument. When the result only depends on reactive state, a computed property is even better.</p>
<h2>Global filters</h2>
${compare(
  'js',
  `Vue.filter('currency', (value) =>
  '$' + Number(value).toFixed(2))

// template: {{ total | currency }}`,
  `const app = createApp(App)
app.config.globalProperties.$filters = {
  currency: (value) => '$' + Number(value).toFixed(2),
}

// template: {{ $filters.currency(total) }}`,
  'Vue 2', 'Vue 3', ['main.js', 'main.js'],
)}
<h2>Chained filters</h2>
<p><code>{{ name | trim | capitalize }}</code> becomes <code>{{ capitalize(trim(name)) }}</code>. Read it inside out.</p>
${howTo(`<p>vueleap reports every filter with its name and position: in interpolations and <code>v-bind</code> expressions (using the same scanning rules as the Vue 2 compiler, so <code>a || b</code> and pipes inside strings or regular expressions are ignored), in the <code>filters</code> option and in <code>Vue.filter()</code> calls. The matching compat flags are <code>COMPILER_FILTERS</code> (templates) and <code>FILTERS</code> (runtime). Filters are not rewritten automatically because global registration and argument order need a human decision.</p>`)}
<h2>More guides</h2>
${guideCards(slug)}
</div>`,
  })
}

// Event bus.
{
  const slug = 'vue-event-bus-vue-3.html'
  const title = 'Event bus in Vue 3: replacing $on, $off and $once'
  const description = 'new Vue() event buses stop working in Vue 3 because $on, $off and $once were removed. Replace them with mitt, props and emits, provide/inject or Pinia, and find every usage automatically.'
  pages.push({
    slug,
    title,
    description,
    ld: article(slug, title, description),
    body: `<div class="container narrow">
<h1>The event bus pattern in Vue 3</h1>
<p class="lede">In Vue 2 any instance was an event emitter, so <code>export const EventBus = new Vue()</code> was a popular way to talk between components. Vue 3 removed <code>$on</code>, <code>$off</code> and <code>$once</code>; only <code>$emit</code> remains, for parent listeners.</p>
<p class="meta">Official guide: <a href="https://v3-migration.vuejs.org/breaking-changes/events-api">Events API, Vue 3 migration guide</a></p>
<h2>Replace the bus with a tiny emitter</h2>
<p>The quickest migration keeps the pattern and swaps the implementation for a small library such as <a href="https://github.com/developit/mitt">mitt</a>:</p>
${compare(
  'js',
  `// event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()

// ProductList.vue
mounted() {
  EventBus.$on('cart:add', this.onAdd)
},
beforeDestroy() {
  EventBus.$off('cart:add', this.onAdd)
},

// AddButton.vue
EventBus.$emit('cart:add', product)`,
  `// event-bus.js
import mitt from 'mitt'
export const emitter = mitt()

// ProductList.vue
mounted() {
  emitter.on('cart:add', this.onAdd)
},
beforeUnmount() {
  emitter.off('cart:add', this.onAdd)
},

// AddButton.vue
emitter.emit('cart:add', product)`,
  'Vue 2', 'Vue 3', ['event-bus.js', 'event-bus.js'],
)}
<h2>Better long term options</h2>
<ul>
<li><strong>Props and emits</strong> for parent and child communication.</li>
<li><strong>provide and inject</strong> for a subtree that shares state.</li>
<li><strong>Pinia</strong> (or Vuex 4) for application state that many components read and change.</li>
</ul>
<h2>Lifecycle hook events</h2>
<p><code>this.$once('hook:beforeDestroy', fn)</code> also relied on the instance emitter. In Vue 3, use the lifecycle hook directly, or <code>@vue:mounted</code> style listeners on child components in templates.</p>
${howTo(`<p>vueleap reports each <code>$on</code>, <code>$off</code> and <code>$once</code> call (rule <code>event-emitter</code>, compat flag <code>INSTANCE_EVENT_EMITTER</code>), the <code>new Vue()</code> that creates the bus (rule <code>global-mount</code>), and <code>hook:</code> events (rule <code>hook-events</code>). Template <code>@hook:mounted</code> listeners are rewritten to <code>@vue:mounted</code> by <code>--fix</code>.</p>`)}
<h2>More guides</h2>
${guideCards(slug)}
</div>`,
  })
}

// v-model.
{
  const slug = 'v-model-changes-vue-3.html'
  const title = 'v-model changes in Vue 3: modelValue, update:modelValue and .sync'
  const description = 'In Vue 3, v-model on components uses the modelValue prop and update:modelValue event, the model option is gone and .sync becomes v-model:prop. See before and after code and find affected components.'
  pages.push({
    slug,
    title,
    description,
    ld: article(slug, title, description),
    body: `<div class="container narrow">
<h1>v-model changes in Vue 3</h1>
<p class="lede">On custom components, <code>v-model</code> now passes a <code>modelValue</code> prop and listens to <code>update:modelValue</code>. The <code>value</code> prop and <code>input</code> event convention, the <code>model</code> option and the <code>.sync</code> modifier are gone. Native inputs are not affected.</p>
<p class="meta">Official guide: <a href="https://v3-migration.vuejs.org/breaking-changes/v-model">v-model, Vue 3 migration guide</a></p>
<h2>Components using value and input</h2>
${compare(
  'js',
  `export default {
  props: ['value'],
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    },
  },
}`,
  `export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  methods: {
    onInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
  },
}`,
  'Vue 2', 'Vue 3', ['BaseInput.js', 'BaseInput.js'],
)}
<p>Parents keep writing <code>&lt;base-input v-model="email" /&gt;</code>.</p>
<h2>Components using the model option</h2>
${compare(
  'js',
  `export default {
  model: { prop: 'checked', event: 'change' },
  props: ['checked'],
}
// parent: <my-checkbox v-model="agreed" />`,
  `export default {
  props: ['checked'],
  emits: ['update:checked'],
}
// parent: <my-checkbox v-model:checked="agreed" />`,
  'Vue 2', 'Vue 3', ['MyCheckbox.js', 'MyCheckbox.js'],
)}
<h2>.sync becomes v-model with an argument</h2>
${compare(
  'vue',
  `<template>
  <text-document :title.sync="doc.title" />
</template>`,
  `<template>
  <text-document v-model:title="doc.title" />
</template>`,
  'Vue 2',
  'Vue 3',
  ['Editor.vue', 'Editor.vue'],
)}
<p>The child keeps emitting <code>update:title</code>, so this rewrite is safe, and <code>npx vueleap --fix</code> applies it for you. Components can now accept several <code>v-model</code> bindings, one per argument.</p>
${howTo(`<p>vueleap reports components that declare a <code>value</code> prop and emit <code>input</code>, components with a <code>model</code> option (rule <code>component-v-model</code>, compat flag <code>COMPONENT_V_MODEL</code>) and every <code>.sync</code> modifier (rule <code>sync-modifier</code>, compat flag <code>COMPILER_V_BIND_SYNC</code>), which it can rewrite automatically.</p>`)}
<h2>More guides</h2>
${guideCards(slug)}
</div>`,
  })
}

// End of life.
{
  const slug = 'vue-2-end-of-life.html'
  const title = 'Vue 2 end of life: what it means and how to migrate to Vue 3'
  const description = 'Vue 2 reached end of life on December 31, 2023. What end of support means for your app, the risks of staying, and a practical plan to migrate to Vue 3.'
  const faqs = [
    ['When did Vue 2 reach end of life?', 'Vue 2 reached end of life on December 31, 2023. Vue 2.7 was its last minor release.'],
    ['Is Vue 2 still supported?', 'Not by the Vue core team: Vue 2 no longer receives updates, including security and browser compatibility fixes. The official end of life page points teams that need continued fixes to a commercial third party offer (HeroDevs Never-Ending Support), but the ecosystem has moved to Vue 3.'],
    ['Will my Vue 2 app stop working?', 'No. Published versions keep working. The risk grows over time: unpatched vulnerabilities, browsers and build tools moving on, and libraries dropping Vue 2 support.'],
    ['What is the fastest way to know how much work the upgrade is?', 'Run `npx vueleap` in the project. It lists every Vue 3 breaking change with file and line, the Vue 2 only dependencies, and an effort score.'],
  ]
  pages.push({
    slug,
    title,
    description,
    ld: [article(slug, title, description), faq(faqs)],
    body: `<div class="container narrow">
<h1>Vue 2 end of life</h1>
<p class="lede">Vue 2 reached end of life on <strong>December 31, 2023</strong>. Apps keep running, but they no longer get fixes from the Vue team, and more of the ecosystem only supports Vue 3 every month.</p>
<p class="meta">Official announcement: <a href="https://v2.vuejs.org/lts/">Vue 2 end of life</a></p>
<h2>What end of life means in practice</h2>
<ul>
<li><strong>No security fixes</strong> for Vue 2 itself from the core team.</li>
<li><strong>Libraries move on</strong>: vue-router 4, Vuex 4, Pinia, Vuetify 3, Element Plus and most new libraries target Vue 3 only.</li>
<li><strong>Tooling moves on</strong>: modern build tools, test utilities and IDE support focus on Vue 3.</li>
<li><strong>Hiring and knowledge</strong>: documentation, examples and new developers use Vue 3.</li>
</ul>
<h2>A low risk plan to migrate</h2>
<ol class="steps">
<li>Measure: <code>npx vueleap --html report.html</code> lists every breaking change and Vue 2 only dependency.</li>
<li>Run on Vue 3 early with the <a href="vue-compat-build-flags.html">@vue/compat migration build</a>, using the flags vueleap prints.</li>
<li>Apply safe fixes with <code>npx vueleap --fix --write</code>, then fix the remaining findings rule by rule.</li>
<li>Upgrade router, store and UI libraries.</li>
<li>Remove compat flags and gate CI with <code>npx vueleap --fail-on error</code>.</li>
</ol>
<p>The <a href="migrate-vue-2-to-vue-3.html">step by step migration guide</a> covers each step in detail.</p>
<h2>Frequently asked questions</h2>
${faqHtml(faqs)}
<h2>More guides</h2>
${guideCards(slug)}
</div>`,
  })
}

for (const page of pages) await fs.writeFile(path.join(docs, page.slug), layout({ ...page, body: guideBody(page.slug, page.body) }))

// 404 page.
await fs.writeFile(
  path.join(docs, '404.html'),
  layout({
    slug: '404.html',
    title: 'Page not found | vueleap',
    description: 'This page does not exist. Find the Vue 2 to Vue 3 migration guides and the vueleap documentation here.',
    ld: { '@type': 'WebPage', name: 'Page not found' },
    body: `<section class="section mesh"><div class="container" style="text-align:center"><img src="mascot.svg" width="260" height="195" alt="Hop the frog missed the lily pad"><h1 style="font-size:clamp(34px,5vw,56px);letter-spacing:-0.035em;margin:16px 0 12px">This page leapt away</h1><p class="lede" style="color:var(--muted);font-size:19px">The page you are looking for does not exist. Try one of the guides below.</p>${guideCards('')}<p><a class="button primary" href="./">Back to the home page</a></p></div></section>`,
  }).replace('<link rel="canonical" href="https://kwy404.github.io/vueleap/404.html">\n', '<meta name="robots" content="noindex">\n'),
)

// Static files.
await fs.mkdir(path.join(docs, 'icons'), { recursive: true })
for (const icon of await fs.readdir(path.join(root, 'assets/icons'))) {
  await fs.copyFile(path.join(root, 'assets/icons', icon), path.join(docs, 'icons', icon))
}
for (const file of ['mascot.svg', 'favicon.svg', 'demo.svg', 'report.png']) {
  await fs.copyFile(path.join(root, 'assets', file), path.join(docs, file))
}
const urls = [...pages.map((p) => (p.slug === 'index.html' ? SITE : SITE + p.slug)), `${SITE}report-example.html`]
await fs.writeFile(
  path.join(docs, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${DATE}</lastmod></url>`).join('\n')}
</urlset>
`,
)
await fs.writeFile(path.join(docs, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`)
await fs.writeFile(path.join(docs, '.nojekyll'), '')
console.log(`${pages.length} pages, 404, sitemap and robots written`)
