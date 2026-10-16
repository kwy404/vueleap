// Writes the static documentation site in docs/ (served by GitHub Pages as is).
// The live demo results, the rule tables, the compat config and the fix
// preview are generated from the real code so they never drift.
//
// Styling: Monsoon (monsooncss 0.2.0 from the CDN) plus docs/style.css for the
// pond and journey pieces. Interactivity: Voodoo.js 1.0.0 directives in the
// markup, docs/site.js for the journey and search keys, docs/live/ for the
// live demo and docs/seasons.js for the seasonal themes.
//
//   npm run build && node scripts/build-live.mjs && node scripts/build-docs.mjs && node scripts/highlight-docs.mjs
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { transformWithEsbuild } from 'vite'
import { analyze, analyzeSource, compatSnippet, fixSource, formatPretty, planFixes, RULES, VERSION } from '../dist/index.js'
import { findingMarks, gutter, kindOf, render, reportHtml, slim } from '../docs/live/view.js'
import { copyButton, fileIcon } from './frame-parts.mjs'
import { EXAMPLES } from './live/examples.mjs'
import { BRAND, heroPond, icon, padBadge, padNode, rippleDivider, splashArt, ui } from './site-art.mjs'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const docs = path.join(root, 'docs')
const SITE = 'https://kwy404.github.io/vueleap/'
const REPO = 'https://github.com/kwy404/vueleap'
const NPM = 'https://www.npmjs.com/package/vueleap'
const LINKEDIN = 'https://www.linkedin.com/in/alexandre-silva-173687256/'
const PUBLISHED = '2026-10-12'
const DATE = '2026-10-15'
const AUTHOR = { '@type': 'Person', name: 'Alexandre Kohler', url: 'https://github.com/kwy404', sameAs: ['https://github.com/kwy404', LINKEDIN] }
const MONSOON_CSS = 'https://cdn.jsdelivr.net/npm/monsooncss@0.2.0/dist/monsoon.min.css'
const VOODOO_JS = 'https://cdn.jsdelivr.net/npm/voodoojs@1.0.0/dist/voodoo.full.min.js'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const md = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>')
const slugify = (s) =>
  s
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
/** Lowercase text for the client side filters, safe inside a single quoted expression. */
const searchable = (...parts) =>
  parts
    .join(' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9@:._/ -]+/g, ' ')
    .replace(/ +/g, ' ')
    .trim()

// Code blocks are written as plain escaped HTML here, then highlighted at build
// time by scripts/highlight-docs.mjs (Shiki, VS Code Light+ and Dark+ themes)
// and wrapped in a VS Code style editor or terminal window.
const DEFAULT_TITLES = { bash: 'Terminal', js: 'main.js', ts: 'main.ts', vue: 'Component.vue', html: 'index.html', yaml: 'ci.yml', css: 'styles.css', diff: 'npx vueleap --fix' }
const code = (lang, source, title = DEFAULT_TITLES[lang] ?? lang, bareId = '') =>
  `<pre data-title="${esc(title)}"${bareId ? ` data-frame="bare" data-id="${bareId}"` : ''}><code class="language-${lang}">${esc(source.trim())}</code></pre>`
const compare = (lang, before, after, beforeLabel = 'Vue 2', afterLabel = 'Vue 3', titles = []) =>
  `<div class="sbs"><figure class="compare-side is-before"><figcaption><span class="side-dot" aria-hidden="true"></span>${beforeLabel}</figcaption>${code(lang, before, titles[0])}</figure><figure class="compare-side is-after"><figcaption><span class="side-dot" aria-hidden="true"></span>${afterLabel}</figcaption>${code(lang, after, titles[1])}</figure></div>`

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
      `<button type="button" role="tab" class="win-tab" id="${id}-tab-${pm}" aria-controls="${id}-${pm}" aria-selected="${index === 0}" :aria-selected="pm === '${pm}' ? 'true' : 'false'" @click="pm = '${pm}'; $storage.set('vueleap-pm', '${pm}')">${fileIcon('terminal')}<span>${pm}</span></button>`,
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
  return `<div class="window terminal install" v-data="{ pm: $storage.get('vueleap-pm') || 'npm' }"><div class="window-bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><div class="win-tabs" role="tablist" aria-label="Package manager">${tabs}</div></div>${panels}</div>`
}

// The real output of the built CLI on the sample app.
const fixture = path.join(root, 'test/fixtures/vue2-app')
const demoResult = await analyze(fixture)
const fixPlan = await planFixes(demoResult)
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

// Navigation. The top bar is the same everywhere; guides add the stepper.
const NAV = [
  ['index.html#try', 'Try it'],
  ['index.html#journey', 'Journey'],
  ['migrate-vue-2-to-vue-3.html', 'Migration guide'],
  ['vue-3-breaking-changes-checklist.html', 'Rules'],
  ['vue-compat-build-flags.html', 'Compat flags'],
  ['report-example.html', 'Sample report'],
]

// The guides, in reading order: each one is a stop on the stepper.
// [href, short label, title, description, icon]
const GUIDES = [
  ['migrate-vue-2-to-vue-3.html', 'Migration guide', 'Migration guide', 'The whole upgrade in seven steps, with the migration build.', 'plan'],
  ['vue-3-breaking-changes-checklist.html', 'Rules', 'Rules reference', `All ${RULES.length} checks, with severity, compat flag and fix.`, 'checklist'],
  ['vue-compat-build-flags.html', 'Compat flags', 'Compat flags', 'How the migration build works and which flags you need.', 'compat'],
  ['v-model-changes-vue-3.html', 'v-model', 'v-model on components', 'modelValue, update:modelValue, arguments and .sync.', 'vmodel'],
]

// Journey stops on the home page: [id, label, short text].
const STOPS = [
  ['scan', 'Scan', 'Find every breaking change'],
  ['understand', 'Understand', 'Read the report'],
  ['fix', 'Fix', 'Rewrite the safe ones'],
  ['compat', 'Compat', 'Boot on Vue 3 today'],
  ['ship', 'Ship', 'Land on Vue 3'],
]

// Sibling projects for the footer, the current one excluded.
const MORE = [
  ['Monsoon', 'https://kwy404.github.io/monsoon/', 'Utility-first CSS with no build step.'],
  ['Voodoo.js', 'https://kwy404.github.io/Voodoo.js/', 'Reactive HTML with no build step.'],
  ['breakhound', 'https://kwy404.github.io/breakhound/', 'Find bugs in any JavaScript library.'],
  ['graphemely', 'https://kwy404.github.io/graphemely/', 'Emoji safe string truncation.'],
  ['numberparrot', 'https://kwy404.github.io/numberparrot/', 'Parse localized numbers back.'],
  ['edgegoat', 'https://kwy404.github.io/edgegoat/', 'Edge case test inputs.'],
  ['cookieowl', 'https://kwy404.github.io/cookieowl/', 'Cookie consent for LGPD and GDPR.'],
  ['installkite', 'https://kwy404.github.io/installkite/', 'Make any website installable and offline.'],
  ['a11ymedic', 'https://kwy404.github.io/a11ymedic/', 'Accessibility checks with the exact fix.'],
  ['fontsketch', 'https://kwy404.github.io/fontsketch/', 'Turn your handwriting into a font.'],
  ['kastor', 'https://kwy404.github.io/kastor/', 'The TypeScript ORM for almost every database.'],
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
    datePublished: PUBLISHED,
    dateModified: DATE,
    inLanguage: 'en',
    author: AUTHOR,
    publisher: AUTHOR,
    isPartOf: { '@type': 'WebSite', name: 'vueleap', url: SITE },
    about: ['Vue.js', 'Vue 3 migration'],
    ...extra,
  }
}

function breadcrumbs(slug, label) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'vueleap', item: SITE },
      { '@type': 'ListItem', position: 2, name: label, item: SITE + slug },
    ],
  }
}

function faq(items) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/`/g, '') } })),
  }
}

/** FAQ as a Monsoon accordion: native details elements, one open at a time, no script. */
function faqHtml(items, group = 'faq') {
  return `<div class="accordion collapse-plus faq">${items
    .map(
      ([q, a], index) =>
        `<details class="collapse" name="${group}"${index === 0 ? ' open' : ''}><summary class="collapse-title">${esc(q)}</summary><div class="collapse-content"><p>${md(a)}</p></div></details>`,
    )
    .join('')}</div>`
}

const logo = (withVersion) =>
  `<a class="brand" href="./" aria-label="vueleap home"><img src="favicon.svg" alt="" width="30" height="30"><span class="brand-name">vue<b>leap</b></span>${withVersion ? `<span class="brand-ver">v${VERSION}</span>` : ''}</a>`

// Search: a static index rendered into a command palette dialog on every page.
const searchEntries = []
const addEntry = (href, title, kind, text = '') => searchEntries.push({ href, title, kind, text })

function searchDialog() {
  const items = searchEntries
    .map(
      (e) =>
        `<a class="command-palette-item" href="${e.href}" v-show="'${searchable(e.title, e.kind, e.text)}'.includes(q.trim().toLowerCase())"><span class="hit-title">${e.title}</span><span class="hit-kind">${esc(e.kind)}</span></a>`,
    )
    .join('')
  const all = searchEntries.map((e) => `'${searchable(e.title, e.kind, e.text)}'`).join(',')
  return `<dialog class="modal modal-top search-dialog" id="search" v-ref="palette" aria-label="Search the docs">
<div class="command-palette">
<label class="command-palette-search"><input class="command-palette-input" type="search" v-model="q" placeholder="Search guides, rules and compat flags" aria-label="Search guides, rules and compat flags" autocomplete="off"><button type="button" class="kbd kbd-sm search-close" @click="$refs.palette.close()" aria-label="Close search">Esc</button></label>
<nav class="command-palette-list" aria-label="Search results">${items}<p class="command-palette-empty" v-show="![${all}].some(t => t.includes(q.trim().toLowerCase()))" style="display:none">Nothing matches. Try a rule id like <code>filters</code> or a flag like <code>GLOBAL_MOUNT</code>.</p></nav>
<p class="command-palette-footer"><span><kbd class="kbd kbd-xs">Up</kbd> <kbd class="kbd kbd-xs">Down</kbd> to move</span><span><kbd class="kbd kbd-xs">Enter</kbd> to open</span></p>
</div>
</dialog>`
}

function topBar(slug) {
  const current = (href) => (href === slug ? ' aria-current="page"' : '')
  const links = NAV.map(([href, label]) => `<a class="navbar-link" href="${href.replace('index.html', './')}"${current(href)}>${label}</a>`).join('')
  return `<header class="navbar navbar-sticky navbar-blur topbar" v-data="{ q: '' }">
<div class="navbar-start">${logo(true)}</div>
<nav class="navbar-center navbar-nav" aria-label="Main">${links}</nav>
<div class="navbar-end">
<button type="button" class="search-btn" @click="$refs.palette.showModal()" v-hotkey="mod+k" aria-label="Search the docs" aria-haspopup="dialog" aria-controls="search">${ui('search', 16)}<span class="search-label">Search</span><span class="search-keys" aria-hidden="true"><kbd class="kbd kbd-xs">Ctrl</kbd><kbd class="kbd kbd-xs">K</kbd></span></button>
<a class="icon-btn" href="${REPO}" aria-label="vueleap on GitHub">${BRAND.github}</a>
<button type="button" class="icon-btn theme-btn" v-theme-toggle.cycle aria-label="Color theme: system, light or dark" title="Color theme">${ui('system').replace('ui-icon', 'ui-icon ti ti-system')}${ui('sun').replace('ui-icon', 'ui-icon ti ti-light')}${ui('moon').replace('ui-icon', 'ui-icon ti ti-dark')}</button>
<details class="navbar-mobile"><summary class="navbar-burger" aria-label="Menu"></summary><nav class="navbar-mobile-panel" aria-label="Mobile">${links}</nav></details>
</div>
${searchDialog()}
</header>`
}

function footer() {
  const guideLinks = GUIDES.map(([href, , label]) => `<li><a href="${href}">${label}</a></li>`).join('')
  const more = MORE.map(([name, href, text]) => `<li><a href="${href}">${name}</a><span>${text}</span></li>`).join('')
  return `<footer class="site-foot">
${rippleDivider()}
<div class="foot-in">
<div class="footer-grid foot-grid">
<div class="footer-brand foot-brand">${logo(false)}<p>Migrate Vue 2 to Vue 3 with one command. Free and open source, MIT licensed.</p>
<p class="made-by">Made by <a href="https://github.com/kwy404" rel="me noopener">Alexandre Kohler</a><a class="author-ic" href="https://github.com/kwy404" rel="me noopener" aria-label="Alexandre Kohler on GitHub">${BRAND.github}</a><a class="author-ic" href="${LINKEDIN}" rel="me noopener" aria-label="Alexandre Kohler on LinkedIn">${BRAND.linkedin}</a></p></div>
<nav aria-label="Guides"><p class="footer-title">Guides</p><ul class="footer-links">${guideLinks}</ul></nav>
<nav aria-label="Project"><p class="footer-title">Project</p><ul class="footer-links"><li><a href="${REPO}">GitHub</a></li><li><a href="${NPM}">npm</a></li><li><a href="report-example.html">Sample report</a></li><li><a href="${REPO}/blob/main/CHANGELOG.md">Changelog</a></li><li><a href="${REPO}/issues">Issues</a></li><li><a href="${REPO}/blob/main/CONTRIBUTING.md">Contributing</a></li></ul></nav>
<nav aria-label="More from kwy404" class="foot-more"><p class="footer-title">More from kwy404</p><ul class="footer-links more-list">${more}</ul></nav>
</div>
<div class="footer-bottom foot-bottom"><p>vueleap ${VERSION}, MIT licensed. Made by <a href="https://github.com/kwy404" rel="me noopener">Alexandre Kohler</a>.</p><p>Built with <a href="https://kwy404.github.io/monsoon/">Monsoon</a>. Interactive parts built with <a href="https://kwy404.github.io/Voodoo.js/">Voodoo.js</a>.</p></div>
</div>
</footer>`
}

function layout({ slug, title, description, body, ld, bodyClass = '' }) {
  const url = SITE + (slug === 'index.html' ? '' : slug)
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<script>try{var t=localStorage.getItem('voodoo:theme');if(t&&t.charAt(0)==='"')t=JSON.parse(t);if(t==='light'||t==='dark'){var r=document.documentElement;r.setAttribute('data-theme',t);r.style.colorScheme=t}}catch(e){}</script>
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta name="author" content="Alexandre Kohler">
<meta name="theme-color" content="#42b883">
<meta property="og:type" content="${slug === 'index.html' ? 'website' : 'article'}">
<meta property="og:site_name" content="vueleap">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Hop the frog leaping from lily pad 2 to lily pad 3">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${SITE}og.png">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet" href="${MONSOON_CSS}">
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="seasons/seasons.css">
<script src="seasons.js"></script>
<script src="${VOODOO_JS}" defer></script>
<script src="site.js" defer></script>
${slug === 'index.html' ? '<script type="module" src="live/demo.js"></script>\n' : ''}${jsonLd({ '@context': 'https://schema.org', ...(Array.isArray(ld) ? { '@graph': ld } : ld) })}
</head>
<body class="antialiased bg-background text-foreground ${bodyClass}">
<a class="skip-link" href="#content">Skip to content</a>
${topBar(slug)}
<main id="content">
${body}
</main>
${footer()}
</body>
</html>
`
}

/** Stepper, header, article and previous / next stops for a guide page. */
function guidePage(slug, body, { wide = false } = {}) {
  const m = /^<div class="container narrow">\n<h1>([\s\S]*?)<\/h1>\n<p class="lede">([\s\S]*?)<\/p>\n(?:<p class="meta">([\s\S]*?)<\/p>\n)?([\s\S]*)<\/div>$/.exec(body.trim())
  if (!m) throw new Error(`guide body of ${slug} has an unexpected shape`)
  const [, h1, lede, meta, rest] = m
  const toc = []
  const content = rest.replace(/<h2>([\s\S]*?)<\/h2>/g, (_all, text) => {
    const id = slugify(text)
    toc.push([id, text])
    return `<h2 id="${id}">${text}</h2>`
  })
  const index = GUIDES.findIndex(([href]) => href === slug)
  const [, short, , , iconName] = GUIDES[index]
  for (const [id, text] of toc) addEntry(`${slug}#${id}`, text, short)
  const stones = GUIDES.map(([href, s], i) => {
    const state = i < index ? ' is-done' : i === index ? ' is-current' : ''
    return `<li class="stone${state}"><a href="${href}"${i === index ? ' aria-current="step"' : ''}>${padNode('stone-node')}<span class="stone-label"><small>${String(i + 1).padStart(2, '0')}</small>${s}</span></a></li>`
  }).join('')
  const prev = GUIDES[index - 1]
  const next = GUIDES[index + 1]
  const card = (cls, href, dir, title, text, rel = '') =>
    `<a class="pager-card${cls ? ` ${cls}` : ''}" href="${href}"${rel ? ` rel="${rel}"` : ''}><span class="pager-dir">${dir}</span><span class="pager-title">${title}</span><span class="pager-text">${text}</span></a>`
  const pager = `<nav class="stop-pager" aria-label="Previous and next guide">
${prev ? card('', prev[0], `${ui('back', 16)} Previous`, prev[2], prev[3], 'prev') : card('', './#try', `${ui('back', 16)} Home`, 'Try it in the browser', 'Paste a Vue 2 component and read the Vue 3 version.')}
${next ? card('is-next', next[0], `Next ${ui('arrow', 16)}`, next[2], next[3], 'next') : card('is-next', 'report-example.html', `See it run ${ui('arrow', 16)}`, 'Sample report', 'The HTML report vueleap wrote for a sample Vue 2 shop.')}
</nav>`
  return `<div class="stepbar"><nav class="stepbar-in" aria-label="Guides"><ol class="stones" style="--done:${index / (GUIDES.length - 1)}">${stones}</ol></nav></div>
<header class="guide-head${wide ? ' is-wide' : ''}">
<nav aria-label="Breadcrumb"><ol class="breadcrumbs"><li><a href="./">vueleap</a></li><li><a href="./#guides">Guides</a></li><li><span aria-current="page">${short}</span></li></ol></nav>
<div class="guide-title">${icon(iconName, 60, 'guide-icon')}<div><p class="kicker">Guide ${index + 1} of ${GUIDES.length}</p><h1>${h1}</h1></div></div>
<p class="lede">${lede}</p>
${meta ? `<p class="meta">${meta}</p>` : ''}
${toc.length ? `<nav class="in-stop" aria-label="On this page"><span class="in-stop-label">On this page</span>${toc.map(([id, text]) => `<a class="chip chip-sm" href="#${id}">${text}</a>`).join('')}</nav>` : ''}
</header>
<div class="guide-body${wide ? ' is-wide' : ''}">
<article class="prose guide-article">
${content}
</article>
${pager}
</div>`
}

const guideCards = (exclude) =>
  `<div class="field-guides">${GUIDES.map(([href, , label, text, iconName]) =>
    href === exclude
      ? ''
      : `<a class="guide-card" href="${href}">${icon(iconName, 44)}<span class="guide-card-body"><strong>${label}</strong><span>${text}</span></span><span class="guide-card-go" aria-hidden="true">${ui('arrow', 16)}</span></a>`,
  ).join('')}</div>`


const sevBadge = (sev) => `<span class="badge badge-sm sev-${sev}">${sev}</span>`

// The rule table rows used by the checklist page.
const ruleMatch = (r) =>
  `(sev === 'all' || sev === '${r.severity}') && (!fixOnly || ${r.fixable}) && '${searchable(r.id, r.title, r.description, ...r.compatFlags)}'.includes(q.trim().toLowerCase())`
function ruleRows(rules) {
  return rules
    .map(
      (r) =>
        `<tr id="rule-${r.id}" v-show="${ruleMatch(r)}"><td><code>${r.id}</code></td><td>${sevBadge(r.severity)}</td><td><strong>${esc(r.title)}</strong><br><span class="text-muted-foreground">${md(r.description)}</span></td><td>${
          r.compatFlags.length ? r.compatFlags.map((f) => `<code>${f}</code>`).join(' ') : '<span class="text-muted-foreground">none</span>'
        }</td><td>${r.fixable ? `<span class="badge badge-sm badge-success">${ui('check', 12)} Yes</span>` : '<span class="text-muted-foreground">No</span>'}</td><td><a href="${r.docs}">Guide</a></td></tr>`,
    )
    .join('\n')
}
const ruleTable = (rules) =>
  `<div class="table-wrap rules-table"><table class="table table-hover"><thead><tr><th scope="col">Rule</th><th scope="col">Severity</th><th scope="col">What changes</th><th scope="col">@vue/compat flag</th><th scope="col">Auto fix</th><th scope="col">Docs</th></tr></thead><tbody>${ruleRows(rules)}</tbody></table></div>`



const pages = []
const fixable = RULES.filter((r) => r.fixable).length

/// Home page: the live demo, then the migration journey.
{
  const s = demoResult.summary
  const faqs = [
    ['Is it safe to run on my code?', 'Yes. By default vueleap only reads files. `--fix` prints a diff and writes nothing unless you add `--write`, and it never touches files outside the project folder. The demo on this page runs in your browser and sends nothing anywhere.'],
    ['What does it rewrite, and what does it leave to me?', `Pure renames are rewritten: lifecycle and directive hooks, keyCode modifiers, \`.sync\`, \`$scopedSlots\`, transition classes, \`@hook:\` events and \`productionTip\`. Everything else gets a finding with the line, an explanation and the official guide. That is ${fixable} of the ${RULES.length} checks.`],
    ['Does it support TypeScript, script setup and class components?', 'Yes. Single file components with `lang="ts"`, TSX, Vue 2.7 `<script setup>` and vue-property-decorator class components are analyzed. Pug templates are skipped with a warning.'],
    ['Can I use it from code?', 'Yes. `analyze(dir)` and `fix(dir)` work on a project, and `analyzeSource(code)` and `fixSource(code)` work on one file in memory, in Node or in the browser.'],
  ]

  // The live demo: real results for every example, computed now with the same
  // code the browser runs after the first edit.
  const liveExamples = EXAMPLES.map((ex) => ({
    ...ex,
    result: slim(fixSource(ex.code, { filename: ex.filename }), analyzeSource(ex.code, { filename: ex.filename }).findings),
  }))
  const first = liveExamples[0]
  const firstOutMarks = first.result.changes.map((r) => ({ s: r.start, e: r.end, c: 'mk-new', t: 'Rewritten by vueleap' }))
  const liveData = JSON.stringify({
    examples: liveExamples.map(({ label, filename, code, result }) => ({ label, filename, code, result })),
    icons: Object.fromEntries(['vue', 'js', 'ts', 'css'].map((k) => [k, fileIcon(k)])),
  }).replace(/</g, '\\u003c')
  const hopSmall = `<svg class="hop-svg" viewBox="96 40 214 190" width="64" height="57" aria-hidden="true" focusable="false">${(await fs.readFile(path.join(root, 'assets/mascot.svg'), 'utf8'))
    .replace(/^[\s\S]*?<g transform="rotate\(9 205 130\)">/, '<g>')
    .replace(/<\/svg>\s*$/, '')}</svg>`
  const live = `<div class="live" id="try" data-live>
<div class="live-top">
<div class="live-examples" role="group" aria-label="Examples"><span class="live-label">Try an example</span>${liveExamples
    .map((ex, i) => `<button type="button" class="live-ex" data-ex="${i}" aria-pressed="${i === 0}">${fileIcon(ex.filename)}${esc(ex.label)}</button>`)
    .join('')}</div>
<p class="live-status" data-status data-state="idle" aria-live="polite">Edit the code to run vueleap in your browser.</p>
</div>
<div class="live-grid">
<div class="window live-pane is-in">
<div class="window-bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="win-tab is-static"><span class="ed-ic" data-icon-in>${fileIcon(first.filename)}</span><span data-name-in>${esc(first.filename)}</span></span><span class="live-side">Vue 2</span><button type="button" class="code-copy" data-clear>Clear</button></div>
<div class="ed"><pre class="ed-gutter" aria-hidden="true" data-gut-in>${gutter(first.code)}</pre><div class="ed-code"><pre class="ed-hl" aria-hidden="true" data-hl-in>${render(first.code, kindOf(first.filename), findingMarks(first.code, first.result.input))}</pre><textarea class="ed-input" data-input spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" aria-label="Vue 2 code. Edit it or paste your own.">${esc(first.code)}</textarea></div></div>
</div>
<div class="live-hop" data-hop aria-hidden="true"><span class="hop-arc"></span>${hopSmall}<span class="hop-pads"><i>2</i><i>3</i></span></div>
<div class="window live-pane is-out">
<div class="window-bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="win-tab is-static"><span class="ed-ic" data-icon-out>${fileIcon(first.filename)}</span><span data-name-out>${esc(first.filename)}</span></span><span class="live-side is-3">Vue 3</span><button type="button" class="code-copy" data-copy aria-label="Copy the Vue 3 code"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M4 4V1.5A1.5 1.5 0 0 1 5.5 0h7A1.5 1.5 0 0 1 14 1.5v9a1.5 1.5 0 0 1-1.5 1.5H10v2.5A1.5 1.5 0 0 1 8.5 16h-7A1.5 1.5 0 0 1 0 14.5v-9A1.5 1.5 0 0 1 1.5 4H4Zm1.5 0h3A1.5 1.5 0 0 1 10 5.5v5h2.5V1.5h-7V4Zm-4 1.5v9h7v-9h-7Z"/></svg><span>Copy</span></button></div>
<div class="ed"><pre class="ed-gutter" aria-hidden="true" data-gut-out>${gutter(first.result.code)}</pre><div class="ed-code"><span class="ed-flash" data-flash aria-hidden="true"></span><pre class="ed-hl is-out" data-hl-out tabindex="0" aria-label="Vue 3 code written by vueleap">${render(first.result.code, kindOf(first.filename), [...firstOutMarks, ...findingMarks(first.result.code, first.result.remaining)])}</pre></div></div>
</div>
</div>
<p class="live-legend" aria-hidden="true"><span><i class="lg-new"></i>Rewritten</span><span><i class="lg-left"></i>Left for you, hover for details</span></p>
<div class="live-report" data-report aria-live="polite">${reportHtml(first.result)}</div>
<script type="application/json" id="live-data">${liveData}</script>
</div>`

  // Stop 2: what the report says, as a compact chart of the sample app.
  const topRules = s.byRule.slice(0, 6)
  const maxCount = Math.max(...topRules.map((r) => r.count))
  const reportCard = `<div class="report-card reveal">
<div class="rc-top">${icon('report', 30)}<div><b>shop-front</b><span>${s.filesScanned} files scanned</span></div></div>
<dl class="rc-stats"><div><dt>Findings</dt><dd>${s.total}</dd></div><div><dt>Errors</dt><dd class="t-error">${s.error}</dd></div><div><dt>Warnings</dt><dd class="t-warning">${s.warning}</dd></div><div><dt>Auto fixable</dt><dd class="t-fix">${s.fixable}</dd></div></dl>
<ul class="rc-bars">${topRules
    .map(
      (r, i) =>
        `<li style="--w:${(r.count / maxCount).toFixed(3)};--i:${i}"><span class="rc-name"><span class="sev-dot sev-${r.severity}" aria-hidden="true"></span><code>${r.ruleId}</code></span><span class="rc-bar"><i></i></span><span class="rc-count">${r.count}</span></li>`,
    )
    .join('')}</ul>
<p class="rc-more"><a href="report-example.html">Open the full sample report ${ui('arrow', 14)}</a></p>
</div>`

  // Stop 3: part of the real --fix preview on the sample app.
  const fixFiles = ['src/components/ProductList.vue', 'src/directives/tooltip.js']
  const fixDiff = fixPlan
    .filter((x) => fixFiles.includes(x.file))
    .map((x) => x.diff.split('\n').filter((line) => !line.startsWith('=====')).join('\n').trim())
    .join('\n\n')
  const fixedFindings = fixPlan.reduce((n, x) => n + x.count, 0)

  // Stop 4: the generated compat config.
  const compatOutput = compatSnippet(demoResult.compat)
  const mainJs = (/\/\/ main\.js[\s\S]*?(?=\/\/ vite\.config\.js)/.exec(compatOutput)?.[0] ?? '').trim()
  const flagCount = demoResult.compat.runtime.length + demoResult.compat.compiler.length
  const flagCloud = [...demoResult.compat.runtime.map((f) => [f, 'runtime']), ...demoResult.compat.compiler.map((f) => [f, 'compiler'])]
    .map(([f, kind], i) => `<span class="flag-stone${kind === 'compiler' ? ' is-compiler' : ''}" style="--i:${i}">${f}</span>`)
    .join('')

  // Stop 5: the migration checklist, saved in localStorage by v-persist.
  const TASKS = [
    [['scan-run', 'Run vueleap on the project', 'npx vueleap --html report.html'], ['scan-deps', 'List the Vue 2 only dependencies to replace', '']],
    [['und-read', 'Read every error group and its guide', ''], ['und-plan', 'Agree on the order: tooling, compat, fixes, libraries', '']],
    [['fix-preview', 'Preview the safe fixes as a diff', 'npx vueleap --fix'], ['fix-write', 'Write them and commit', 'npx vueleap --fix --write'], ['fix-rest', 'Fix the remaining findings rule by rule', '']],
    [['compat-tooling', 'Upgrade the build tooling, drop vue-template-compiler', ''], ['compat-install', 'Install Vue 3 and @vue/compat with the printed flags', 'npx vueleap --compat']],
    [['ship-eco', 'Move to vue-router 4, Pinia or Vuex 4 and Vue 3 UI libraries', ''], ['ship-drop', 'Remove the last compat flag and @vue/compat', ''], ['ship-ci', 'Gate CI so Vue 2 code never comes back', 'npx vueleap --fail-on error']],
  ]
  const taskCount = TASKS.flat().length
  const checklist = `<div class="journey-check reveal" v-data="{ done: [] }" v-persist="vueleap-journey">
<div class="jc-head">
<div class="jc-count"><b v-text="done.length">0</b><span>of ${taskCount} tasks done</span></div>
<progress class="progress progress-primary jc-bar" max="${taskCount}" value="0" :value="done.length" aria-label="Migration checklist progress">0 of ${taskCount}</progress>
<button type="button" class="btn btn-sm btn-ghost" @click="done = []" :disabled="done.length === 0">${ui('reset', 14)} Reset</button>
</div>
<div class="jc-landed" v-show="done.length === ${taskCount}" style="display:none"><img src="mascot.svg" width="120" height="90" alt=""><div><b>Hop landed on lily pad 3.</b><span>Every task is done. Your app runs on Vue 3 with no compat flags left.</span></div></div>
<div class="jc-groups">${TASKS.map(
    (items, i) =>
      `<fieldset class="jc-group"><legend>${icon(STOPS[i][0], 28)}<span><small>Stop ${i + 1}</small>${STOPS[i][1]}</span></legend>${items
        .map(
          ([id, text, cmd]) =>
            `<label class="jc-item"><input type="checkbox" class="checkbox checkbox-primary" value="${id}" v-model="done"><span class="jc-text">${esc(text)}${cmd ? `<code>${esc(cmd)}</code>` : ''}</span></label>`,
        )
        .join('')}</fieldset>`,
  ).join('')}</div>
<p class="jc-note">${ui('check', 14)} Saved in this browser only. Nothing is sent anywhere.</p>
</div>`

  const routeItems = STOPS.map(
    ([id, label], i) =>
      `<li class="route-stop" data-stop="${i}"><a href="#stop-${id}">${padNode('route-node')}<span class="route-label"><small>${String(i + 1).padStart(2, '0')}</small><b>${label}</b></span></a></li>`,
  ).join('')
  const stop = (i, title, text, visual, extra = '') => {
    const [id, label] = STOPS[i]
    addEntry(`./#stop-${id}`, `Stop ${i + 1}: ${label}`, 'Journey', title)
    return `<section class="stop" id="stop-${id}" aria-labelledby="stop-${id}-title">
<div class="stop-copy reveal">${padBadge(i + 1, 52)}<p class="kicker">Stop ${i + 1}: ${label}</p><h2 id="stop-${id}-title">${title}</h2>${text}</div>
<div class="stop-visual">${visual}</div>${extra}
</section>`
  }

  pages.push({
    slug: 'index.html',
    bodyClass: 'is-home',
    title: 'vueleap: upgrade Vue 2 code to Vue 3',
    description: 'vueleap finds what breaks when a Vue 2 app moves to Vue 3, rewrites the safe changes and prints the @vue/compat flags the rest needs.',
    ld: [
      {
        '@type': 'SoftwareApplication',
        name: 'vueleap',
        alternateName: 'vue2to3',
        description: 'Command line tool that finds Vue 2 code that breaks on Vue 3, applies the safe fixes and lists the @vue/compat flags a project needs.',
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
      { '@type': 'WebSite', name: 'vueleap', url: SITE, inLanguage: 'en', author: AUTHOR },
      faq(faqs),
    ],
    body: `<section class="pond-hero" aria-labelledby="hero-title">
<span class="season-accent" aria-hidden="true"></span>
<div class="hero-in">
<div class="hero-copy">
<h1 id="hero-title">Paste Vue&nbsp;2. <span class="leap-word">Get Vue&nbsp;3.</span></h1>
<p class="hero-lead">vueleap rewrites what is safe to rewrite and points at the rest, line by line, with the official guide for each change. Try it here, then run it on your whole project.</p>
</div>
<div class="hero-visual">${heroPond(await fs.readFile(path.join(root, 'assets/mascot.svg'), 'utf8'))}<span class="season-mascot" aria-hidden="true"></span><span class="season-icons" aria-hidden="true"><i></i><i></i><i></i></span></div>
</div>
${live}
<div class="hero-run">
<div class="hero-run-copy"><h2>Now run it on the whole project</h2><p>One command, no config, nothing uploaded. It reads <code>.vue</code>, script and style files plus <code>package.json</code>.</p><div class="hero-cta"><a class="btn btn-primary" href="#journey">Follow the journey ${ui('arrow', 16)}</a><a class="btn btn-outline" href="migrate-vue-2-to-vue-3.html">Migration guide</a></div></div>
${installTabs('hero')}
</div>
</section>

<div class="journey" id="journey">
<div class="journey-head"><p class="kicker">The migration journey</p><h2>Five stops from lily pad 2 to lily pad 3</h2><p>The app keeps running at every stop. Scroll along with Hop.</p></div>
<div class="journey-body">
<nav class="route" aria-label="Migration journey"><div class="route-in"><span class="route-line" aria-hidden="true"><span class="route-fill"></span><span class="route-hop">${hopSmall.replace('width="64" height="57"', 'width="34" height="30"')}</span></span><ol>${routeItems}</ol></div></nav>
<div class="stops">

${stop(0, 'Scan the whole project', `<p class="stop-lede">One command reads templates, scripts, styles and <code>package.json</code>, and groups what breaks by rule, with the file, the line and the official guide. It skips <code>node_modules</code>, <code>dist</code> and anything in <code>.gitignore</code>.</p><ul class="stop-points"><li>Only reads files. Nothing runs, nothing is uploaded.</li><li>SFCs, JSX and TSX, TypeScript, script setup and class components.</li></ul>`, demoTerminal())}

${stop(1, 'Know how big the job is', `<p class="stop-lede">This is a small Vue 2 shop: ${s.total} findings in ${s.filesWithFindings} files, with an effort score of ${demoResult.effort.score} (${demoResult.effort.level}). Share the same report with your team.</p>${code('bash', 'npx vueleap --html report.html')}`, reportCard)}

${stop(2, 'Let the safe changes write themselves', `<p class="stop-lede">Renames are rewritten in place and your formatting stays. <code>--fix</code> prints a diff first and writes nothing until you add <code>--write</code>. On the sample app it fixes ${fixedFindings} findings in ${fixPlan.length} files.</p>${code('bash', 'npx vueleap --fix           # preview\nnpx vueleap --fix --write   # apply')}`, `<div class="reveal">${code('diff', fixDiff, 'npx vueleap --fix')}</div>`)}

${stop(3, 'Boot on Vue 3 before the last fix', `<p class="stop-lede">The <code>@vue/compat</code> migration build runs Vue 2 style code on Vue 3, one flag per feature. vueleap prints the smallest config your code needs, everything else in Vue 3 mode. Read <a href="vue-compat-build-flags.html">how the flags work</a>.</p><div class="flag-card reveal"><p class="flag-count"><b>${flagCount}</b><span>flags for the sample app today<small>${demoResult.compat.runtime.length} runtime, ${demoResult.compat.compiler.length} compiler</small></span></p><div class="flag-cloud">${flagCloud}</div><p class="flag-goal">${icon('ship', 24)} The goal is zero. Rerun after each fix and delete the flags that disappear.</p></div>`, `<div class="reveal">${code('js', `// Generated by npx vueleap --compat for the sample app.\n${mainJs.replace(/^\/\/ main\.js.*\n/, '')}`, 'main.js')}</div>`)}

${stop(4, 'Land on Vue 3 and stay there', `<p class="stop-lede">Tick the tasks as your team goes; the list is saved in this browser. When the last flag is gone, gate CI so Vue 2 only code never comes back.</p>${code('yaml', `# .github/workflows/vue3.yml\nname: Vue 3 guard\non: [push, pull_request]\njobs:\n  vueleap:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npx vueleap --fail-on error`, 'vue3.yml')}`, checklist)}

</div>
</div>
</div>

<section class="guides-section" id="guides" aria-labelledby="guides-title">
<div class="section-in">
<div class="section-head"><p class="kicker">Guides</p><h2 id="guides-title">Read more when you need it</h2></div>
${guideCards('')}
</div>
</section>

<section class="faq-section" id="faq" aria-labelledby="faq-title">
<div class="section-in faq-grid">
<div class="section-head"><p class="kicker">Questions</p><h2 id="faq-title">Before the leap</h2><p>Something else? <a href="${REPO}/issues">Open an issue</a> on GitHub.</p></div>
${faqHtml(faqs)}
</div>
</section>`,
  })
}

// Migration guide.
{
  const slug = 'migrate-vue-2-to-vue-3.html'
  const title = 'Migration guide | vueleap'
  const description = 'Upgrade a Vue 2 app in seven steps: measure, switch the tooling, boot on the migration build, apply the safe fixes, fix the rest and remove compat.'
  pages.push({
    slug,
    title,
    description,
    ld: [article(slug, 'Migration guide', description), breadcrumbs(slug, 'Migration guide')],
    body: `<div class="container narrow">
<h1>Migration guide</h1>
<p class="lede">The safest way to upgrade is to measure first, run Vue 3 in compatibility mode, then remove Vue 2 behavior one piece at a time. This guide follows the official <a href="https://v3-migration.vuejs.org/migration-build">migration build</a> process and uses vueleap to know exactly what to change.</p>
<p class="meta">Updated ${DATE}</p>
<h2>1. Measure what breaks</h2>
<p>Run vueleap at the root of the project. It reads <code>.vue</code>, JavaScript, TypeScript and style files plus <code>package.json</code>, skips <code>node_modules</code>, <code>dist</code> and anything in <code>.gitignore</code>, and groups findings by rule.</p>
${installTabs('guide')}
<p>Add <code>--html report.html</code> to also get a shareable report, like <a href="report-example.html">this sample report</a>.</p>
<p>Every finding has a severity: <strong>error</strong> breaks at compile time or runtime, <strong>warning</strong> changes behavior, <strong>info</strong> deserves a review. The summary ends with an effort score to compare projects or track progress.</p>
<h2>2. Upgrade the build tooling</h2>
<p>Vue 3 single file components are compiled by <code>@vue/compiler-sfc</code>, which ships with <code>vue</code>. Remove <code>vue-template-compiler</code>, use <code>vue-loader</code> 17 with webpack or Vue CLI 5, or <code>@vitejs/plugin-vue</code> with Vite. vueleap reports these under <code>vue2-tooling</code>.</p>
<h2>3. Install Vue 3 with the migration build</h2>
${code('bash', 'npm install vue@^3.5 @vue/compat@^3.5\nnpm uninstall vue-template-compiler')}
<p>Alias <code>vue</code> to <code>@vue/compat</code> and enable compat mode in the template compiler. vueleap prints this configuration with only the flags your project needs, running everything else in Vue 3 mode (<code>MODE: 3</code>):</p>
${code('js', "// vite.config.js\nimport vue from '@vitejs/plugin-vue'\n\nexport default {\n  resolve: { alias: { vue: '@vue/compat' } },\n  plugins: [\n    vue({\n      template: {\n        compilerOptions: {\n          compatConfig: { MODE: 3, COMPILER_FILTERS: true, COMPILER_V_BIND_SYNC: true },\n        },\n      },\n    }),\n  ],\n}", 'vite.config.js')}
${code('js', "// main.js\nimport { configureCompat } from 'vue'\n\nconfigureCompat({\n  MODE: 3,\n  GLOBAL_MOUNT: true,\n  INSTANCE_EVENT_EMITTER: true,\n  FILTERS: true,\n})")}
<p>Read <a href="vue-compat-build-flags.html">Compat flags</a> for what each flag does.</p>
<h2>4. Apply the safe automatic fixes</h2>
<p>Some changes are pure renames. vueleap rewrites them while preserving formatting, and shows a diff first:</p>
${code('bash', 'npx vueleap --fix           # preview\nnpx vueleap --fix --write   # apply')}
<p>That covers <code>beforeDestroy</code> and <code>destroyed</code>, custom directive hooks, <code>$scopedSlots</code>, transition class names, keyCode modifiers with a single key name, <code>.sync</code> to <code>v-model:prop</code>, <code>@hook:</code> events and <code>Vue.config.productionTip</code>.</p>
<h2>5. Fix the rest, rule by rule</h2>
<ol>
<li>Replace <code>new Vue()</code> with <code>createApp()</code> and move <code>Vue.use</code>, <code>Vue.component</code>, <code>Vue.directive</code> and <code>Vue.prototype</code> to the app instance.</li>
<li>Turn <a href="https://v3-migration.vuejs.org/breaking-changes/filters">filters</a> into method calls, for example <code>{{ price | currency }}</code> into <code>{{ currency(price) }}</code>, and replace an <a href="https://v3-migration.vuejs.org/breaking-changes/events-api">event bus</a> built on <code>$on</code> and <code>$off</code> with a small emitter, props and emits, or a store.</li>
<li>Update components used with <a href="v-model-changes-vue-3.html">v-model</a> to <code>modelValue</code> and <code>update:modelValue</code>.</li>
<li>Rewrite render functions to import <code>h</code> from <code>vue</code>, and replace <code>$listeners</code> and <code>$children</code>.</li>
</ol>
${compare('js', "import Vue from 'vue'\n\nVue.use(router)\n\nnew Vue({\n  store,\n  render: (h) => h(App),\n}).$mount('#app')", "import { createApp } from 'vue'\n\ncreateApp(App)\n  .use(router)\n  .use(store)\n  .mount('#app')", 'Vue 2', 'Vue 3', ['main.js', 'main.js'])}
<p>The <a href="vue-3-breaking-changes-checklist.html">rules reference</a> links every rule to the official guide.</p>
<h2>6. Upgrade the ecosystem</h2>
<p>Move to vue-router 4 and to Vuex 4 or Pinia. Replace Vue 2 only UI libraries with their Vue 3 successors, for example Vuetify 2 with Vuetify 3 and Element UI with Element Plus. vueleap lists them from <code>package.json</code> with the suggested successor.</p>
<h2>7. Turn compat off and keep it off</h2>
<p>Remove each compat flag once vueleap no longer reports the matching rule. When the list is empty, drop the alias and <code>@vue/compat</code>. Then keep the codebase clean in CI:</p>
${code('bash', 'npx vueleap --fail-on error')}
<p>Track the whole plan with the <a href="./#stop-ship">migration checklist</a> on the home page. It remembers what you ticked.</p>
<h2>Notes</h2>
<ul>
<li><strong>You can go one step at a time.</strong> On the migration build each compat flag can be turned off once the matching code is fixed, so the app keeps running the whole way.</li>
<li><strong>The Options API stays.</strong> It is fully supported in Vue 3. Migrate first, then adopt the Composition API where it helps.</li>
<li><strong>Libraries usually take the longest.</strong> The effort score at the end of the report weighs each finding, with fixable ones counting for a tenth.</li>
</ul>
</div>`,
  })
}

// Checklist.
{
  const slug = 'vue-3-breaking-changes-checklist.html'
  const title = 'Rules reference | vueleap'
  const description = `Every check vueleap runs, ${RULES.length} in all, with its severity, compat flag, automatic fix and official guide.`
  const groups = [
    ['template', 'Templates'],
    ['script', 'Scripts and component options'],
    ['style', 'Styles'],
    ['dependencies', 'Dependencies'],
  ]
  const anyMatch = (rules) => `[${rules.map((r) => `(${ruleMatch(r)})`).join(',')}].some(Boolean)`
  for (const r of RULES) addEntry(`${slug}#rule-${r.id}`, `${r.id}: ${esc(r.title)}`, 'Rule', [r.description, ...r.compatFlags].join(' '))
  pages.push({
    slug,
    title,
    description,
    wide: true,
    ld: [article(slug, 'Rules reference', description), breadcrumbs(slug, 'Rules reference')],
    body: `<div class="container narrow">
<h1>Rules reference</h1>
<p class="lede">Every change below can break or silently change a Vue 2 app when it runs on Vue 3. vueleap checks all of them automatically and links each one to the official migration guide.</p>
<p class="meta">${RULES.length} checks, ${fixable} with safe automatic fixes. Generated from vueleap ${VERSION}.</p>
<div class="callout"><p class="callout-title">${icon('scan', 20)} Faster than reading</p><p>Run <code>npx vueleap</code> in your project to see which of these apply, with file and line numbers.</p></div>
<div v-data="{ q: '', sev: 'all', fixOnly: false }">
<div class="rule-filters" role="search">
<label class="rv-search">${ui('search', 16)}<input class="input input-sm" type="search" v-model="q" placeholder="Search rules, APIs or compat flags" aria-label="Search the checklist"></label>
<select class="select select-sm" v-model="sev" aria-label="Filter by severity"><option value="all">All severities</option><option value="error">Errors</option><option value="warning">Warnings</option><option value="info">Info</option></select>
<label class="rv-check"><input type="checkbox" class="checkbox checkbox-sm" v-model="fixOnly"> Auto fixable only</label>
<span class="rule-count" aria-live="polite" v-text="[${RULES.map((r) => `(${ruleMatch(r)})`).join(',')}].filter(Boolean).length + ' of ${RULES.length} checks shown'">${RULES.length} checks</span>
</div>
${groups
  .map(([category, label]) => {
    const rules = RULES.filter((r) => r.category === category)
    return `<section class="rule-group" v-show="${anyMatch(rules)}"><h2>${label}</h2>${ruleTable(rules)}</section>`
  })
  .join('\n')}
<p class="empty-note" v-show="!${anyMatch(RULES)}" style="display:none">No check matches this search.</p>
</div>
<h2>How vueleap detects them</h2>
<p>Templates are parsed with <code>@vue/compiler-dom</code> (the Vue 3 compiler parser, which still understands Vue 2 syntax), scripts with <code>@babel/parser</code> (JavaScript, TypeScript, JSX and decorators), styles with a comment aware scanner, and dependencies from <code>package.json</code>. Component options are only checked on objects that really look like components, so a <code>{ destroyed: true }</code> flag is not mistaken for a lifecycle hook.</p>
</div>`,
  })
}

// Compat flags.
{
  const slug = 'vue-compat-build-flags.html'
  const title = 'Compat flags | vueleap'
  const description = 'How the migration build works, what MODE 2 and MODE 3 mean, and which @vue/compat flags vueleap detects.'
  const flags = new Map()
  for (const rule of RULES) for (const flag of rule.compatFlags) flags.set(flag, [...(flags.get(flag) ?? []), rule])
  const flagId = (flag) => `flag-${flag.toLowerCase().replace(/_/g, '-')}`
  for (const [flag, rules] of flags) addEntry(`${slug}#${flagId(flag)}`, flag, 'Compat flag', rules.map((r) => r.id).join(' '))
  const rows = [...flags.entries()]
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(
      ([flag, rules]) =>
        `<tr id="${flagId(flag)}"><td><code>${flag}</code></td><td>${flag.startsWith('COMPILER_') ? '<span class="tag tag-info">Compiler</span>' : '<span class="tag tag-primary">Runtime</span>'}</td><td>${rules
          .map((r) => `<a href="vue-3-breaking-changes-checklist.html#rule-${r.id}"><code>${r.id}</code></a>: ${esc(r.title)}`)
          .join('<br>')}</td></tr>`,
    )
    .join('')
  pages.push({
    slug,
    title,
    description,
    ld: [article(slug, 'Compat flags', description), breadcrumbs(slug, 'Compat flags')],
    body: `<div class="container narrow">
<h1>Compat flags</h1>
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
<div class="table-wrap"><table class="table table-hover"><thead><tr><th scope="col">Flag</th><th scope="col">Kind</th><th scope="col">vueleap rules</th></tr></thead><tbody>${rows}</tbody></table></div>
<p>The full list of flags, including ones that cannot be detected statically (such as <code>ATTR_FALSE_VALUE</code>), is in the <a href="https://v3-migration.vuejs.org/migration-build#compat-configuration">official compat configuration reference</a>.</p>
<h2>When to use the migration build</h2>
<p>It pays off for medium and large apps that cannot move in one go: the app runs on Vue 3 while Vue 2 code is still being converted. It is a migration aid, so plan to remove it. Small apps are often quicker to migrate directly.</p>
</div>`,
  })
}

// v-model.
{
  const slug = 'v-model-changes-vue-3.html'
  const title = 'v-model on components | vueleap'
  const description = 'On components, v-model now uses the modelValue prop and the update:modelValue event, and .sync becomes v-model with an argument.'
  pages.push({
    slug,
    title,
    description,
    ld: [article(slug, 'v-model on components', description), breadcrumbs(slug, 'v-model')],
    body: `<div class="container narrow">
<h1>v-model on components</h1>
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
<h2>How vueleap finds them</h2>
${`<p>vueleap reports components that declare a <code>value</code> prop and emit <code>input</code>, components with a <code>model</code> option (rule <code>component-v-model</code>, compat flag <code>COMPONENT_V_MODEL</code>) and every <code>.sync</code> modifier (rule <code>sync-modifier</code>, compat flag <code>COMPILER_V_BIND_SYNC</code>), which it can rewrite automatically.</p>`}
</div>`,
  })
}

// Render guide pages first so their headings join the search index, then
// put the pages and journey stops at the top of the index.
const rendered = pages.map((page) => ({ ...page, html: page.slug === 'index.html' ? page.body : guidePage(page.slug, page.body, { wide: page.wide }) }))
searchEntries.unshift(
  { href: './#try', title: 'Try it in the browser', kind: 'Home', text: 'live demo paste convert component example' },
  { href: './#journey', title: 'The migration journey', kind: 'Home', text: 'install npx scan understand fix compat ship checklist' },
  ...GUIDES.map(([href, , label, text]) => ({ href, title: label, kind: 'Guide', text })),
  { href: 'report-example.html', title: 'Sample HTML report', kind: 'Page', text: 'report shop-front findings' },
)
for (const page of rendered) {
  await fs.writeFile(path.join(docs, page.slug), layout({ ...page, body: page.html, bodyClass: page.bodyClass ?? '' }))
}

// 404 page.
await fs.writeFile(
  path.join(docs, '404.html'),
  layout({
    slug: '404.html',
    title: 'Page not found | vueleap',
    description: 'This page does not exist.',
    ld: { '@type': 'WebPage', name: 'Page not found' },
    body: `<section class="lost"><div class="section-in">${splashArt()}<p class="kicker">404</p><h1>Hop missed this lily pad</h1><p class="lost-lead">The page you are looking for leapt away or never existed. These guides are still above water:</p>${guideCards('')}<p class="lost-cta"><a class="btn btn-primary" href="./">${ui('back', 16)} Back to the pond</a></p></div></section>`,
  })
    .replace('<link rel="canonical" href="https://kwy404.github.io/vueleap/404.html">\n', '<meta name="robots" content="noindex">\n')
    // GitHub Pages serves 404.html from any path, so its links must be absolute.
    .replace(/(href|src)="(?!https?:|#|\/|data:)([^"]*)"/g, (_m, attr, url) => `${attr}="/vueleap/${url.replace(/^\.\//, '')}"`),
)

// Static files.
await fs.mkdir(path.join(docs, 'icons'), { recursive: true })
for (const file of await fs.readdir(path.join(root, 'assets/icons'))) {
  await fs.copyFile(path.join(root, 'assets/icons', file), path.join(docs, 'icons', file))
}
for (const file of ['mascot.svg', 'favicon.svg', 'demo.svg', 'report.png']) {
  await fs.copyFile(path.join(root, 'assets', file), path.join(docs, file))
}
// Seasonal themes: the art as drawn by scripts/season-art.mjs, the scripts minified.
const seasonsSrc = path.join(root, 'assets/seasons')
await fs.rm(path.join(docs, 'seasons'), { recursive: true, force: true })
await fs.mkdir(path.join(docs, 'seasons'), { recursive: true })
for (const entry of await fs.readdir(seasonsSrc, { withFileTypes: true })) {
  if (entry.isDirectory()) await fs.cp(path.join(seasonsSrc, entry.name), path.join(docs, 'seasons', entry.name), { recursive: true })
}
await fs.copyFile(path.join(seasonsSrc, 'seasons.css'), path.join(docs, 'seasons/seasons.css'))
const minify = async (file) => (await transformWithEsbuild(await fs.readFile(path.join(seasonsSrc, file), 'utf8'), file, { minify: true, target: 'es2015', loader: 'js' })).code
await fs.writeFile(path.join(docs, 'seasons.js'), await minify('seasons.js'))
await fs.writeFile(path.join(docs, 'seasons/fx.js'), await minify('fx.js'))

const urls = [...pages.map((p) => (p.slug === 'index.html' ? SITE : SITE + p.slug)), `${SITE}report-example.html`]
await fs.writeFile(
  path.join(docs, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${DATE}</lastmod><changefreq>monthly</changefreq><priority>${u === SITE ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`,
)
await fs.writeFile(path.join(docs, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`)
await fs.writeFile(path.join(docs, '.nojekyll'), '')
console.log(`${pages.length} pages, 404, sitemap and robots written`)
