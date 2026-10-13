// Writes the static documentation site in docs/ (served by GitHub Pages as is).
// The rule tables, the sample report viewer, the compat config and the fix
// preview are generated from the real CLI so they never drift.
//
// Styling: Monsoon (monsooncss 0.2.0 from the CDN) plus docs/style.css for the
// pond and journey pieces. Interactivity: Voodoo.js 1.0.0 directives in the
// markup, plus docs/site.js for the scroll progress line and search keys.
//
//   npm run build && node scripts/build-docs.mjs && node scripts/highlight-docs.mjs
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { analyze, compatSnippet, formatPretty, planFixes, RULES, RULES_BY_ID, VERSION } from '../dist/index.js'
import { copyButton, fileIcon } from './frame-parts.mjs'
import { BRAND, heroPond, icon, METAMORPHOSIS, metamorphosisArt, padBadge, padNode, rippleDivider, splashArt, ui } from './site-art.mjs'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const docs = path.join(root, 'docs')
const SITE = 'https://kwy404.github.io/vueleap/'
const REPO = 'https://github.com/kwy404/vueleap'
const NPM = 'https://www.npmjs.com/package/vueleap'
const LINKEDIN = 'https://www.linkedin.com/in/alexandre-silva-173687256/'
const PUBLISHED = '2026-10-12'
const DATE = '2026-10-13'
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
  ['index.html#journey', 'Journey'],
  ['migrate-vue-2-to-vue-3.html', 'Migration guide'],
  ['vue-3-breaking-changes-checklist.html', 'Breaking changes'],
  ['vue-compat-build-flags.html', 'Compat flags'],
  ['report-example.html', 'Sample report'],
]

// The guides, in reading order: each one is a stop on the stepper.
// [href, short label, title, description, icon]
const GUIDES = [
  ['vue-2-end-of-life.html', 'End of life', 'Vue 2 end of life', 'What the end of support means and why to plan the upgrade now.', 'eol'],
  ['migrate-vue-2-to-vue-3.html', 'Migration plan', 'How to migrate Vue 2 to Vue 3', 'A step by step plan using the migration build and vueleap.', 'plan'],
  ['vue-3-breaking-changes-checklist.html', 'Breaking changes', 'Vue 3 breaking changes checklist', `All ${RULES.length} checks, with severity, compat flag and fix.`, 'checklist'],
  ['vue-compat-build-flags.html', 'Compat flags', '@vue/compat build flags explained', 'How configureCompat works and which flags you need.', 'compat'],
  ['vue-filters-removed-vue-3.html', 'Filters', 'Vue filters removed in Vue 3', 'Replace filters with methods, computed properties or globals.', 'filters'],
  ['vue-event-bus-vue-3.html', 'Event bus', 'Event bus in Vue 3', 'Replace $on, $off and $once with mitt, props or a store.', 'bus'],
  ['v-model-changes-vue-3.html', 'v-model', 'v-model changes in Vue 3', 'modelValue, update:modelValue, v-model arguments and .sync.', 'vmodel'],
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
<meta property="og:image:alt" content="vueleap, the Vue 2 to Vue 3 migration tool, with Hop the frog leaping from lily pad 2 to lily pad 3">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${SITE}og.png">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet" href="${MONSOON_CSS}">
<link rel="stylesheet" href="style.css">
<script src="${VOODOO_JS}" defer></script>
<script src="site.js" defer></script>
${jsonLd({ '@context': 'https://schema.org', ...(Array.isArray(ld) ? { '@graph': ld } : ld) })}
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
  const pager = `<nav class="stop-pager" aria-label="Previous and next stop">
${prev ? card('', prev[0], `${ui('back', 16)} Previous stop`, prev[2], prev[3], 'prev') : card('', './#journey', `${ui('back', 16)} Back to the pond`, 'The migration journey', 'Scan, understand, fix, compat and ship, on one page.')}
${next ? card('is-next', next[0], `Next stop ${ui('arrow', 16)}`, next[2], next[3], 'next') : card('is-next', 'report-example.html', `Last stop ${ui('arrow', 16)}`, 'See a real report', 'The HTML report vueleap generated for a sample Vue 2 shop.')}
</nav>`
  return `<div class="stepbar"><nav class="stepbar-in" aria-label="Guide stops"><ol class="stones" style="--done:${index / (GUIDES.length - 1)}">${stones}</ol></nav></div>
<header class="guide-head${wide ? ' is-wide' : ''}">
<nav aria-label="Breadcrumb"><ol class="breadcrumbs"><li><a href="./">vueleap</a></li><li><a href="./#guides">Guides</a></li><li><span aria-current="page">${short}</span></li></ol></nav>
<div class="guide-title">${icon(iconName, 60, 'guide-icon')}<div><p class="kicker">Stop ${index + 1} of ${GUIDES.length}</p><h1>${h1}</h1></div></div>
<p class="lede">${lede}</p>
${meta ? `<p class="meta">${meta}</p>` : ''}
${toc.length ? `<nav class="in-stop" aria-label="In this stop"><span class="in-stop-label">In this stop</span>${toc.map(([id, text]) => `<a class="chip chip-sm" href="#${id}">${text}</a>`).join('')}</nav>` : ''}
</header>
<div class="guide-body${wide ? ' is-wide' : ''}">
<article class="prose guide-article">
${content}
</article>
${pager}
</div>`
}

const guideCards = (exclude) =>
  `<div class="field-guides">${GUIDES.map(([href, , label, text, iconName], i) =>
    href === exclude
      ? ''
      : `<a class="guide-card" href="${href}">${icon(iconName, 44)}<span class="guide-card-body"><small>Stop ${i + 1}</small><strong>${label}</strong><span>${text}</span></span><span class="guide-card-go" aria-hidden="true">${ui('arrow', 16)}</span></a>`,
  ).join('')}</div>`

/** The guides as a zigzag trail of stepping stones (home page). */
const guideTrail = () =>
  `<ol class="trail">${GUIDES.map(
    ([href, , label, text, iconName], i) =>
      `<li class="trail-stop"><span class="trail-node" aria-hidden="true">${i + 1}</span><a class="guide-card" href="${href}">${icon(iconName, 44)}<span class="guide-card-body"><small>Stop ${i + 1}</small><strong>${label}</strong><span>${text}</span></span><span class="guide-card-go" aria-hidden="true">${ui('arrow', 16)}</span></a></li>`,
  ).join('')}</ol>`

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

const howTo = (text) => `<h2>How vueleap detects it</h2>${text}<p>Run it on your project:</p>${code('bash', 'npx vueleap')}`

const OUR_GUIDE = {
  filters: 'vue-filters-removed-vue-3.html',
  'event-emitter': 'vue-event-bus-vue-3.html',
  'hook-events': 'vue-event-bus-vue-3.html',
  'component-v-model': 'v-model-changes-vue-3.html',
  'sync-modifier': 'v-model-changes-vue-3.html',
  'global-mount': 'migrate-vue-2-to-vue-3.html',
}

const pages = []
const fixable = RULES.filter((r) => r.fixable).length

/// Home page: the migration journey.
{
  const s = demoResult.summary
  const faqs = [
    ['How do I migrate from Vue 2 to Vue 3?', 'Run `npx vueleap` to list every breaking change, switch your build to Vue 3 with the @vue/compat migration build using the generated flags, fix the findings (starting with `npx vueleap --fix --write`), upgrade vue-router, Vuex and UI libraries, then remove the compat flags one by one.'],
    ['Is vueleap safe to run on my code?', 'Yes. By default it only reads files. `--fix` prints a diff and writes nothing unless you add `--write`, and it never touches files outside the project folder.'],
    ['Does it support TypeScript, script setup and class components?', 'Yes. Single file components with `lang="ts"`, TSX, Vue 2.7 `<script setup>` and vue-property-decorator class components are analyzed. Pug templates are skipped with a warning.'],
    ['Is Vue 2 still supported?', 'No. Vue 2 reached end of life on December 31, 2023 and no longer receives updates from the Vue team.'],
  ]

  // Stop 2: the interactive report viewer, every finding of the sample app in static HTML.
  const groups = s.byRule.map((g) => ({ ...g, rule: RULES_BY_ID.get(g.ruleId), findings: demoResult.findings.filter((x) => x.ruleId === g.ruleId) }))
  const firstRule = groups[0].ruleId
  const viewerMatch = (g) =>
    `(sev === 'all' || sev === '${g.severity}') && (!fixOnly || ${g.fixable > 0}) && '${searchable(g.ruleId, g.title, ...g.findings.map((x) => x.file), ...(g.rule?.compatFlags ?? []))}'.includes(q.trim().toLowerCase())`
  const ruleButtons = groups
    .map(
      (g) =>
        `<li v-show="${viewerMatch(g)}"><button type="button" class="vr-item" aria-pressed="${g.ruleId === firstRule}" :aria-pressed="sel === '${g.ruleId}' ? 'true' : 'false'" @click="sel = '${g.ruleId}'"><span class="sev-dot sev-${g.severity}" aria-hidden="true"></span><span class="vr-name"><code>${g.ruleId}</code><span>${esc(g.title)}</span></span><span class="vr-count">${g.count}</span></button></li>`,
    )
    .join('')
  const details = groups
    .map((g) => {
      const r = g.rule
      const ours = OUR_GUIDE[g.ruleId]
      const findings = g.findings
        .map(
          (x) =>
            `<li class="vf"><div class="vf-loc">${ui('file', 14)}<code>${esc(x.file)}:${x.line}:${x.column}</code>${x.fixable ? '<span class="badge badge-xs badge-success">auto fix</span>' : ''}</div><p>${md(x.message)}</p><pre class="vf-snippet"><code>${esc(x.snippet)}</code></pre></li>`,
        )
        .join('')
      return `<article class="vd" v-show="sel === '${g.ruleId}'"${g.ruleId === firstRule ? '' : ' style="display:none"'} aria-label="${esc(g.title)}">
<header class="vd-head"><div class="vd-badges">${sevBadge(g.severity)}${g.fixable ? `<span class="badge badge-sm badge-success">${g.fixable} of ${g.count} auto fixable</span>` : '<span class="badge badge-sm">guided fix</span>'}<code class="vd-id">${g.ruleId}</code></div>
<h3>${esc(g.title)}</h3>${r ? `<p>${md(r.description)}</p>` : ''}
<div class="vd-meta">${r && r.compatFlags.length ? `<span class="vd-flags">${r.compatFlags.map((f) => `<span class="tag">${f}</span>`).join('')}</span>` : ''}<a href="${g.docs}" class="vd-link">Official guide ${ui('external', 14)}</a>${ours ? `<a href="${ours}" class="vd-link">vueleap guide ${ui('arrow', 14)}</a>` : ''}</div></header>
<ol class="vd-list">${findings}</ol>
</article>`
    })
    .join('\n')
  const viewer = `<div class="rv" v-data="{ sel: '${firstRule}', sev: 'all', fixOnly: false, q: '' }">
<div class="rv-top">
<div class="rv-title">${icon('report', 30)}<div><b>shop-front</b><span>${s.filesScanned} files scanned by vueleap ${VERSION}</span></div></div>
<dl class="rv-stats"><div><dt>Findings</dt><dd>${s.total}</dd></div><div><dt>Errors</dt><dd class="t-error">${s.error}</dd></div><div><dt>Warnings</dt><dd class="t-warning">${s.warning}</dd></div><div><dt>Info</dt><dd class="t-info">${s.info}</dd></div><div><dt>Auto fixable</dt><dd class="t-fix">${s.fixable}</dd></div><div><dt>Effort</dt><dd>${demoResult.effort.score} <small>${demoResult.effort.level}</small></dd></div></dl>
</div>
<div class="rv-filters" role="search">
<div class="segmented segmented-sm" role="radiogroup" aria-label="Severity">${[
    ['all', 'All'],
    ['error', 'Errors'],
    ['warning', 'Warnings'],
    ['info', 'Info'],
  ]
    .map(([v, l]) => `<label class="segmented-item"><input type="radio" name="viewer-sev" value="${v}" v-model="sev"${v === 'all' ? ' checked' : ''}> ${l}</label>`)
    .join('')}</div>
<label class="rv-check"><input type="checkbox" class="checkbox checkbox-sm" v-model="fixOnly"> Auto fixable</label>
<label class="rv-search">${ui('search', 16)}<input class="input input-sm" type="search" v-model="q" placeholder="Filter by rule, file or flag" aria-label="Filter findings by rule, file or compat flag"></label>
</div>
<div class="rv-body">
<ul class="rv-rules" aria-label="Rules with findings">${ruleButtons}<li class="rv-none" v-show="![${groups.map((g) => `(${viewerMatch(g)})`).join(',')}].some(Boolean)" style="display:none">No rule matches these filters.</li></ul>
<div class="rv-detail">${details}</div>
</div>
</div>`

  // Stop 3: before and after for each breaking change. [rule id, label, lang, file, before, after]
  const CHANGES = [
    ['filters', 'Filters', 'vue', 'PriceTag.vue', `<template>
  <p>{{ price | currency }}</p>
</template>

<script>
export default {
  props: ['price'],
  filters: {
    currency: (value) => '$' + value.toFixed(2),
  },
}
</script>`, `<template>
  <p>{{ currency(price) }}</p>
</template>

<script>
export default {
  props: ['price'],
  methods: {
    currency: (value) => '$' + value.toFixed(2),
  },
}
</script>`],
    ['keycode-modifiers', 'keyCode modifiers', 'vue', 'SearchBox.vue', `<template>
  <input
    @keyup.13="search"
    @keydown.27="close"
  >
</template>`, `<template>
  <input
    @keyup.enter="search"
    @keydown.esc="close"
  >
</template>`],
    ['sync-modifier', '.sync', 'vue', 'Editor.vue', `<template>
  <text-document :title.sync="doc.title" />
</template>`, `<template>
  <text-document v-model:title="doc.title" />
</template>`],
    ['destroy-hooks', 'Lifecycle renames', 'js', 'Chart.js', `export default {
  beforeDestroy() {
    window.removeEventListener('resize', this.draw)
  },
  destroyed() {
    this.chart.dispose()
  },
}`, `export default {
  beforeUnmount() {
    window.removeEventListener('resize', this.draw)
  },
  unmounted() {
    this.chart.dispose()
  },
}`],
    ['event-emitter', 'Event bus', 'js', 'event-bus.js', `import Vue from 'vue'
export const EventBus = new Vue()

// ProductList.vue
EventBus.$on('cart:add', this.onAdd)
EventBus.$off('cart:add', this.onAdd)`, `import mitt from 'mitt'
export const emitter = mitt()

// ProductList.vue
emitter.on('cart:add', this.onAdd)
emitter.off('cart:add', this.onAdd)`],
    ['global-mount', 'new Vue()', 'js', 'main.js', `import Vue from 'vue'
import App from './App.vue'

Vue.use(router)
Vue.component('BaseButton', BaseButton)

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app')`, `import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
  .use(router)
  .use(store)
  .component('BaseButton', BaseButton)
  .mount('#app')`],
    ['component-v-model', 'v-model on components', 'js', 'BaseInput.js', `export default {
  props: ['value'],
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    },
  },
}`, `export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  methods: {
    onInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
  },
}`],
    ['directive-hooks', 'Directive hooks', 'js', 'tooltip.js', `export default {
  bind(el, binding) {
    el.title = binding.value
  },
  inserted(el) { el.dataset.ready = '' },
  componentUpdated(el, binding) {
    el.title = binding.value
  },
  unbind(el) { el.title = '' },
}`, `export default {
  beforeMount(el, binding) {
    el.title = binding.value
  },
  mounted(el) { el.dataset.ready = '' },
  updated(el, binding) {
    el.title = binding.value
  },
  unmounted(el) { el.title = '' },
}`],
    ['transition-classes', 'Transition classes', 'css', 'transitions.css', `.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.slide-leave {
  transform: none;
}`, `.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-leave-from {
  transform: none;
}`],
    ['scoped-slots', '$scopedSlots', 'js', 'FancyList.js', `export default {
  render(h) {
    return h('ul', this.items.map((item) =>
      this.$scopedSlots.item({ item })
    ))
  },
}`, `import { h } from 'vue'

export default {
  render() {
    return h('ul', this.items.map((item) =>
      this.$slots.item({ item })
    ))
  },
}`],
    ['listeners', '$listeners', 'vue', 'BaseButton.vue', `<template>
  <button v-bind="$attrs" v-on="$listeners">
    <slot />
  </button>
</template>`, `<template>
  <!-- listeners are part of $attrs now -->
  <button v-bind="$attrs">
    <slot />
  </button>
</template>`],
    ['set-delete', '$set and $delete', 'js', 'cart.js', `this.$set(this.cart, id, item)
Vue.set(this.prices, id, 9.99)

this.$delete(this.cart, id)`, `// Vue 3 tracks new keys on its own
this.cart[id] = item
this.prices[id] = 9.99

delete this.cart[id]`],
  ]
  const changePills = CHANGES.map(
    ([id, label], i) =>
      `<button type="button" role="tab" class="change-pill" id="ch-tab-${i}" aria-controls="ch-panel-${i}" aria-selected="${i === 0}" :aria-selected="ch === ${i} ? 'true' : 'false'" @click="ch = ${i}"><span class="pill-dot${RULES_BY_ID.get(id).fixable ? ' is-auto' : ''}" aria-hidden="true"></span>${label}</button>`,
  ).join('')
  const changePanels = CHANGES.map(([id, label, lang, file, before, after], i) => {
    const r = RULES_BY_ID.get(id)
    const ours = OUR_GUIDE[id]
    addEntry(`./#stop-fix`, `${label}: before and after`, 'Journey', `${id} ${r.title}`)
    return `<div role="tabpanel" id="ch-panel-${i}" aria-labelledby="ch-tab-${i}" :hidden="ch !== ${i}"${i === 0 ? '' : ' hidden'}>
<div class="change-meta"><div><h3>${esc(r.title)}</h3><p>${md(r.description)}</p></div><div><div class="change-badges">${r.fixable ? `<span class="badge badge-success">${ui('check', 12)} Rewritten by --fix</span>` : '<span class="badge badge-warning">Guided fix</span>'}<code>${id}</code>${r.compatFlags.map((f) => `<span class="tag">${f}</span>`).join('')}</div><p class="change-links"><a href="${r.docs}">Official guide ${ui('external', 14)}</a>${ours ? `<a href="${ours}">vueleap guide ${ui('arrow', 14)}</a>` : ''}</p></div></div>
${compare(lang, before, after, `Vue 2: ${label}`, 'Vue 3', [file, file])}
</div>`
  }).join('\n')
  const fixFiles = ['src/components/ProductList.vue', 'src/directives/tooltip.js']
  const fixDiff = fixPlan
    .filter((x) => fixFiles.includes(x.file))
    .map((x) => x.diff.split('\n').filter((line) => !line.startsWith('=====')).join('\n').trim())
    .join('\n\n')
  const fixedFindings = fixPlan.reduce((n, x) => n + x.count, 0)

  // Stop 4: the generated compat config.
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
        `<button type="button" role="tab" class="win-tab" id="show-tab-${index}" aria-controls="show-panel-${index}" aria-selected="${index === 0}" :aria-selected="file === ${index} ? 'true' : 'false'" @click="file = ${index}">${fileIcon(file)}<span>${file}</span></button>`,
    )
    .join('')
  const showcasePanels = showcaseFiles
    .map(
      ([file, source], index) =>
        `<div role="tabpanel" id="show-panel-${index}" aria-labelledby="show-tab-${index}" :hidden="file !== ${index}"${index === 0 ? '' : ' hidden'}>${code('js', source, file, `show-code-${index}`)}</div>`,
    )
    .join('')
  const flagCount = demoResult.compat.runtime.length + demoResult.compat.compiler.length
  const flagCloud = [...demoResult.compat.runtime.map((f) => [f, 'runtime']), ...demoResult.compat.compiler.map((f) => [f, 'compiler'])]
    .map(([f, kind]) => `<span class="flag-stone${kind === 'compiler' ? ' is-compiler' : ''}">${f}</span>`)
    .join('')

  // Stop 5: the migration checklist, saved in localStorage by v-persist.
  const TASKS = [
    [['scan-run', 'Run vueleap on the project', 'npx vueleap --html report.html'], ['scan-share', 'Share the HTML report with the team', ''], ['scan-deps', 'List the Vue 2 only dependencies to replace', '']],
    [['und-read', 'Read every error group and its guide', ''], ['und-plan', 'Agree on the order: tooling, compat, fixes, ecosystem', '']],
    [['fix-preview', 'Preview the safe fixes as a diff', 'npx vueleap --fix'], ['fix-write', 'Write them and commit', 'npx vueleap --fix --write'], ['fix-rest', 'Fix the remaining findings rule by rule', '']],
    [['compat-tooling', 'Upgrade the build tooling, drop vue-template-compiler', ''], ['compat-install', 'Install Vue 3 and @vue/compat with the printed flags', 'npx vueleap --compat'], ['compat-boot', 'Boot the app and click through every screen', '']],
    [['ship-eco', 'Move to vue-router 4, Pinia or Vuex 4 and Vue 3 UI libraries', ''], ['ship-flags', 'Delete compat flags as they leave the output', ''], ['ship-drop', 'Remove @vue/compat and the alias', ''], ['ship-ci', 'Gate CI so Vue 2 code never comes back', 'npx vueleap --fail-on error']],
  ]
  const taskCount = TASKS.flat().length
  const checklist = `<div class="journey-check" v-data="{ done: [] }" v-persist="vueleap-journey">
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
  const stopHead = (i, title, text) => {
    const [id, label] = STOPS[i]
    addEntry(`./#stop-${id}`, `Stop ${i + 1}: ${label}`, 'Journey', title)
    return `<header class="stop-head">${padBadge(i + 1)}<div><p class="kicker">Stop ${i + 1} of ${STOPS.length}: ${label}</p><h2 id="stop-${id}-title">${title}</h2><p class="stop-lede">${text}</p></div></header>`
  }

  pages.push({
    slug: 'index.html',
    bodyClass: 'is-home',
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
      { '@type': 'WebSite', name: 'vueleap', url: SITE, inLanguage: 'en', author: AUTHOR },
      faq(faqs),
    ],
    body: `<section class="pond-hero">
<div class="hero-in">
<div class="min-w-0">
<a class="eol-pill" href="vue-2-end-of-life.html"><span class="badge badge-solid badge-warning badge-sm">EOL</span>Vue 2 is end of life. Plan the leap ${ui('arrow', 14)}</a>
<h1>Leap from Vue&nbsp;2 to <span class="leap-word">Vue&nbsp;3</span> in one command</h1>
<p class="hero-lead">vueleap scans your Vue 2 project and tells you exactly what breaks in Vue 3, file by file and line by line. It rewrites the safe changes for you and prints the <code>@vue/compat</code> flags that keep the rest running.</p>
${installTabs('hero')}
<div class="hero-cta"><a class="btn btn-primary btn-lg" href="#journey">Start the journey ${ui('arrow', 16)}</a><a class="btn btn-outline btn-lg" href="migrate-vue-2-to-vue-3.html">Migration guide</a></div>
<div class="hero-badges"><a href="${NPM}"><img src="https://img.shields.io/npm/v/vueleap?color=42b883&amp;label=npm" alt="vueleap npm version" height="20"></a><a href="${REPO}/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/vueleap?color=42b883" alt="MIT license" height="20"></a></div>
</div>
<div class="hero-visual">${heroPond(await fs.readFile(path.join(root, 'assets/mascot.svg'), 'utf8'))}</div>
</div>
<dl class="hero-stats">
<div><dt>breaking change checks</dt><dd>${RULES.length}</dd></div>
<div><dt>safe automatic fixes</dt><dd>${fixable}</dd></div>
<div><dt>config files needed</dt><dd>0</dd></div>
<div><dt>of your code uploaded</dt><dd>0%</dd></div>
</dl>
</section>

<section class="map" aria-labelledby="map-title">
<div class="map-in">
<h2 id="map-title" class="map-title">Five stops from lily pad 2 to lily pad 3</h2>
<ol class="map-stones">${STOPS.map(([id, label, text], i) => `<li><a href="#stop-${id}" class="map-stone"><span class="map-icon">${icon(id, 44)}</span><span class="map-num">${String(i + 1).padStart(2, '0')}</span><b>${label}</b><span>${text}</span></a></li>`).join('')}</ol>
</div>
</section>

<div class="journey" id="journey">
<nav class="route" aria-label="Migration journey"><div class="route-in"><span class="route-line" aria-hidden="true"><span class="route-fill"></span></span><ol>${routeItems}</ol></div></nav>
<div class="stops">

<section class="stop" id="stop-scan" aria-labelledby="stop-scan-title">
${stopHead(0, 'One command reads the whole pond', 'vueleap parses templates, scripts, styles and package.json, then groups what breaks in Vue 3 by rule, with the line, the compat flag and the official guide link. It skips node_modules, dist and anything in .gitignore.')}
${demoTerminal()}
<ul class="stop-points">
<li>${icon('scan', 36)}<span><b>Static and local</b>Nothing runs and nothing is uploaded. It only reads files.</span></li>
<li>${icon('understand', 36)}<span><b>Every flavor of Vue 2</b>SFCs, JSX and TSX, TypeScript, Vue 2.7 script setup and class components.</span></li>
<li>${icon('ci', 36)}<span><b>Made for CI too</b><code>--json</code> for tooling and <code>--fail-on error</code> to gate builds.</span></li>
</ul>
</section>

<section class="stop" id="stop-understand" aria-labelledby="stop-understand-title">
${stopHead(1, 'Understand every finding', `This is the real report for a small Vue 2 shop: ${s.total} findings in ${s.filesWithFindings} files. Pick a rule to see where it happens, why it breaks and how to fix it. Filter by severity, by what can be fixed automatically, or by file.`)}
${viewer}
<p class="stop-foot">Generate the same report for your project with <code>npx vueleap --html report.html</code>, or <a href="report-example.html">open the full HTML report</a> of this sample.</p>
</section>

<section class="stop" id="stop-fix" aria-labelledby="stop-fix-title">
${stopHead(2, 'Before and after, change by change', 'Some changes are pure renames, so vueleap rewrites them and keeps your formatting. The others get a precise finding and a guide. Pick a breaking change to compare Vue 2 and Vue 3 side by side.')}
<div v-data="{ ch: 0 }">
<div class="change-pills" role="tablist" aria-label="Breaking changes">${changePills}</div>
<p class="pill-legend"><span><span class="pill-dot is-auto" aria-hidden="true"></span>Rewritten by <code>--fix</code></span><span><span class="pill-dot" aria-hidden="true"></span>Guided fix</span></p>
${changePanels}
</div>
<div class="fix-preview">
<div class="fix-copy"><h3>Preview first, then write</h3><p><code>npx vueleap --fix</code> prints a unified diff and writes nothing. Add <code>--write</code> when it looks right. On the sample app it fixes ${fixedFindings} findings in ${fixPlan.length} files. Here is part of the real preview.</p>${code('bash', 'npx vueleap --fix           # preview\nnpx vueleap --fix --write   # apply')}</div>
${code('diff', fixDiff, 'npx vueleap --fix')}
</div>
</section>

<section class="stop" id="stop-compat" aria-labelledby="stop-compat-title">
${stopHead(3, 'Boot on Vue 3 before the last fix', 'The @vue/compat migration build runs Vue 2 style code on Vue 3, one flag per feature. vueleap prints the smallest configuration your code needs, split into runtime and compiler flags, with everything else in Vue 3 mode.')}
<div class="compat-grid">
<div class="min-w-0" v-data="{ file: 0 }">
<div class="window">
<div class="window-bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><div class="win-tabs" role="tablist" aria-label="Generated files">${showcaseTabs}</div><span class="bar-copy" v-show="file === 0">${copyButton('show-code-0', 'main.js code')}</span><span class="bar-copy" v-show="file === 1" style="display:none">${copyButton('show-code-1', 'vite.config.js code')}</span></div>
<div class="crumb" aria-hidden="true">shop-front<span>&gt;</span><span v-text="file === 0 ? 'src > main.js' : 'vite.config.js'">src &gt; main.js</span></div>
${showcasePanels}
<div class="statusbar" aria-hidden="true"><span>main</span><span class="hide-sm">vueleap ${VERSION}</span><span class="right"><span class="hide-sm">Spaces: 2</span><span class="hide-sm">UTF-8</span><span>JavaScript</span></span></div>
</div>
</div>
<div>
<div class="flag-card"><p class="flag-count"><b>${flagCount}</b><span>flags for the sample app today<small>${demoResult.compat.runtime.length} runtime, ${demoResult.compat.compiler.length} compiler</small></span></p><div class="flag-cloud">${flagCloud}</div><p class="flag-goal">${icon('ship', 24)} The goal is zero. Rerun after each fix and delete the flags that disappear.</p></div>
<ul class="compat-notes"><li><b>Vue 3 by default.</b> <code>MODE: 3</code> turns everything to Vue 3 and opts in only to what the code still uses.</li><li><b>Runtime and compiler.</b> Runtime flags go to <code>configureCompat</code>, template flags to <code>compatConfig</code>.</li><li><b>Learn the flags.</b> Read <a href="vue-compat-build-flags.html">@vue/compat build flags explained</a>.</li></ul>
</div>
</div>
</section>

<section class="stop" id="stop-ship" aria-labelledby="stop-ship-title">
${stopHead(4, 'Land on lily pad 3 and stay there', 'Tick the tasks as your team goes. The list is saved in this browser, so you can come back to it. When the last flag is gone, gate CI so Vue 2 only code never sneaks back in.')}
${checklist}
<div class="ship-ci">
<div><h3>Keep it fixed in CI</h3><p><code>--fail-on error</code> exits with code 1 when an error level finding comes back. Use <code>--fail-on warning</code> to be stricter, and <code>--json</code> to feed other tools.</p></div>
${code('yaml', `# .github/workflows/vue3.yml
name: Vue 3 guard
on: [push, pull_request]
jobs:
  vueleap:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npx vueleap --fail-on error`, 'vue3.yml')}
</div>
</section>

</div>
</div>

<section class="meta-section" aria-labelledby="meta-title">
<div class="section-in">
<div class="section-head"><p class="kicker">The metamorphosis</p><h2 id="meta-title">From 2 to 3, one stage at a time</h2><p>A migration is a change of form, not a rewrite. The app stays alive at every stage.</p></div>
<ol class="meta-row">${METAMORPHOSIS.map(([name, caption, body], i) => `<li class="meta-stage">${metamorphosisArt(body, `${name}: ${caption}`)}<span class="meta-step">${i + 1}</span><b>${name}</b><span>${caption}</span></li>`).join('')}</ol>
</div>
</section>

<section class="guides-section" id="guides" aria-labelledby="guides-title">
<div class="section-in">
<div class="section-head"><p class="kicker">Field guides</p><h2 id="guides-title">Learn the Vue 3 changes that matter</h2><p>Seven short, practical stops with before and after code for each breaking change. Read them in order or jump to the one you need.</p></div>
${guideTrail()}
</div>
</section>

<section class="faq-section" id="faq" aria-labelledby="faq-title">
<div class="section-in faq-grid">
<div class="section-head"><p class="kicker">FAQ</p><h2 id="faq-title">Questions before the leap</h2><p>Still unsure? <a href="${REPO}/issues">Open an issue</a> on GitHub.</p></div>
${faqHtml(faqs)}
</div>
</section>

<section class="cta-section">
<div class="cta-pond">
<img src="mascot.svg" width="200" height="150" alt="">
<h2>Ready to leap to Vue 3?</h2>
<p>Run it now on your project. Nothing to install, nothing to configure, nothing leaves your machine.</p>
${installTabs('end')}
<div class="hero-cta"><a class="btn btn-primary" href="migrate-vue-2-to-vue-3.html">Read the migration guide ${ui('arrow', 16)}</a><a class="btn btn-outline" href="${NPM}">${BRAND.npm} View on npm</a></div>
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
    ['How long does a Vue 2 to Vue 3 migration take?', 'It depends on how much the code relies on removed APIs and on Vue 2 only libraries. Run `npx vueleap` to get an inventory and an effort score: each finding adds a weight, and fixable findings count for a tenth. UI libraries usually dominate the total.'],
    ['Can I migrate incrementally?', 'Yes. The @vue/compat migration build runs Vue 2 style code on Vue 3, and each compat flag can be turned off once the matching code is fixed. vueleap prints the minimal set of flags your project needs.'],
    ['Do I need to rewrite my components with the Composition API?', 'No. The Options API is fully supported in Vue 3. Migrate first, then adopt the Composition API where it helps.'],
  ]
  pages.push({
    slug,
    title,
    description,
    ld: [article(slug, title, description), faq(faqs), breadcrumbs(slug, 'Migration plan')],
    body: `<div class="container narrow">
<h1>How to migrate Vue 2 to Vue 3</h1>
<p class="lede">The safest way to upgrade is to measure first, run Vue 3 in compatibility mode, then remove Vue 2 behavior one piece at a time. This guide follows the official <a href="https://v3-migration.vuejs.org/migration-build">migration build</a> process and uses vueleap to know exactly what to change.</p>
<p class="meta">Updated ${DATE}</p>
<h2>1. Take an inventory of breaking changes</h2>
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
<p>Read <a href="vue-compat-build-flags.html">@vue/compat build flags explained</a> for what each flag does.</p>
<h2>4. Apply the safe automatic fixes</h2>
<p>Some changes are pure renames. vueleap rewrites them while preserving formatting, and shows a diff first:</p>
${code('bash', 'npx vueleap --fix           # preview\nnpx vueleap --fix --write   # apply')}
<p>That covers <code>beforeDestroy</code> and <code>destroyed</code>, custom directive hooks, <code>$scopedSlots</code>, transition class names, keyCode modifiers with a single key name, <code>.sync</code> to <code>v-model:prop</code>, <code>@hook:</code> events and <code>Vue.config.productionTip</code>.</p>
<h2>5. Fix the rest, rule by rule</h2>
<ol>
<li>Replace <code>new Vue()</code> with <code>createApp()</code> and move <code>Vue.use</code>, <code>Vue.component</code>, <code>Vue.directive</code> and <code>Vue.prototype</code> to the app instance.</li>
<li>Remove <a href="vue-filters-removed-vue-3.html">filters</a> and replace the <a href="vue-event-bus-vue-3.html">event bus</a>.</li>
<li>Update components used with <a href="v-model-changes-vue-3.html">v-model</a> to <code>modelValue</code> and <code>update:modelValue</code>.</li>
<li>Rewrite render functions to import <code>h</code> from <code>vue</code>, and replace <code>$listeners</code> and <code>$children</code>.</li>
</ol>
${compare('js', "import Vue from 'vue'\n\nVue.use(router)\n\nnew Vue({\n  store,\n  render: (h) => h(App),\n}).$mount('#app')", "import { createApp } from 'vue'\n\ncreateApp(App)\n  .use(router)\n  .use(store)\n  .mount('#app')", 'Vue 2', 'Vue 3', ['main.js', 'main.js'])}
<p>The <a href="vue-3-breaking-changes-checklist.html">breaking changes checklist</a> links every rule to the official guide.</p>
<h2>6. Upgrade the ecosystem</h2>
<p>Move to vue-router 4 and to Vuex 4 or Pinia. Replace Vue 2 only UI libraries with their Vue 3 successors, for example Vuetify 2 with Vuetify 3 and Element UI with Element Plus. vueleap lists them from <code>package.json</code> with the suggested successor.</p>
<h2>7. Turn compat off and keep it off</h2>
<p>Remove each compat flag once vueleap no longer reports the matching rule. When the list is empty, drop the alias and <code>@vue/compat</code>. Then keep the codebase clean in CI:</p>
${code('bash', 'npx vueleap --fail-on error')}
<p>Track the whole plan with the <a href="./#stop-ship">migration checklist</a> on the home page. It remembers what you ticked.</p>
<h2>Frequently asked questions</h2>
${faqHtml(faqs)}
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
  const anyMatch = (rules) => `[${rules.map((r) => `(${ruleMatch(r)})`).join(',')}].some(Boolean)`
  for (const r of RULES) addEntry(`${slug}#rule-${r.id}`, `${r.id}: ${esc(r.title)}`, 'Rule', [r.description, ...r.compatFlags].join(' '))
  pages.push({
    slug,
    title,
    description,
    wide: true,
    ld: [article(slug, title, description), breadcrumbs(slug, 'Breaking changes')],
    body: `<div class="container narrow">
<h1>Vue 3 breaking changes checklist</h1>
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
  const title = '@vue/compat build flags explained: configureCompat and compatConfig'
  const description = 'How the Vue 3 migration build works, what MODE 2 and MODE 3 mean, every @vue/compat flag vueleap can detect and how to get the minimal configureCompat for your project.'
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
  const faqs = [
    ['Should I use @vue/compat?', 'Use it for medium and large apps that cannot be migrated in one go: it lets the app run on Vue 3 while Vue 2 code is still being converted. It is a migration aid, so plan to remove it. Small apps are often faster to migrate directly.'],
    ['What is the difference between configureCompat and compatConfig?', '`configureCompat()` sets runtime flags in the browser. Template flags (the `COMPILER_` ones) are applied when templates are compiled, so they go in `compilerOptions.compatConfig` of your build tool plugin.'],
    ['What does MODE 3 mean?', 'With `MODE: 3`, every feature behaves like Vue 3 unless its flag is set to `true`. With the default `MODE: 2`, everything behaves like Vue 2 unless its flag is set to `false`.'],
  ]
  pages.push({
    slug,
    title,
    description,
    ld: [article(slug, title, description), faq(faqs), breadcrumbs(slug, 'Compat flags')],
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
<div class="table-wrap"><table class="table table-hover"><thead><tr><th scope="col">Flag</th><th scope="col">Kind</th><th scope="col">vueleap rules</th></tr></thead><tbody>${rows}</tbody></table></div>
<p>The full list of flags, including ones that cannot be detected statically (such as <code>ATTR_FALSE_VALUE</code>), is in the <a href="https://v3-migration.vuejs.org/migration-build#compat-configuration">official compat configuration reference</a>.</p>
<h2>Frequently asked questions</h2>
${faqHtml(faqs)}
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
    ld: [article(slug, title, description), breadcrumbs(slug, 'Filters')],
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
    ld: [article(slug, title, description), breadcrumbs(slug, 'Event bus')],
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
    ld: [article(slug, title, description), breadcrumbs(slug, 'v-model')],
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
    ld: [article(slug, title, description), faq(faqs), breadcrumbs(slug, 'End of life')],
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
<ol>
<li>Measure: <code>npx vueleap --html report.html</code> lists every breaking change and Vue 2 only dependency.</li>
<li>Run on Vue 3 early with the <a href="vue-compat-build-flags.html">@vue/compat migration build</a>, using the flags vueleap prints.</li>
<li>Apply safe fixes with <code>npx vueleap --fix --write</code>, then fix the remaining findings rule by rule.</li>
<li>Upgrade router, store and UI libraries.</li>
<li>Remove compat flags and gate CI with <code>npx vueleap --fail-on error</code>.</li>
</ol>
<p>The <a href="migrate-vue-2-to-vue-3.html">step by step migration guide</a> covers each step in detail, and the <a href="./#journey">migration journey</a> has a checklist you can tick as you go.</p>
<h2>Frequently asked questions</h2>
${faqHtml(faqs)}
</div>`,
  })
}

// Render guide pages first so their headings join the search index, then
// put the pages and journey stops at the top of the index.
const rendered = pages.map((page) => ({ ...page, html: page.slug === 'index.html' ? page.body : guidePage(page.slug, page.body, { wide: page.wide }) }))
searchEntries.unshift(
  { href: './', title: 'vueleap: the migration journey', kind: 'Home', text: 'install npx scan understand fix compat ship checklist' },
  ...GUIDES.map(([href, short, label, text]) => ({ href, title: label, kind: `Stop: ${short}`, text })),
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
    description: 'This page does not exist. Find the Vue 2 to Vue 3 migration guides and the vueleap documentation here.',
    ld: { '@type': 'WebPage', name: 'Page not found' },
    body: `<section class="lost"><div class="section-in">${splashArt()}<p class="kicker">404</p><h1>Hop missed this lily pad</h1><p class="lost-lead">The page you are looking for leapt away or never existed. These stops are still above water:</p>${guideCards('')}<p class="lost-cta"><a class="btn btn-primary" href="./">${ui('back', 16)} Back to the pond</a></p></div></section>`,
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
