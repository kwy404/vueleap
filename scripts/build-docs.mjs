// Writes the static documentation site in docs/ (served by GitHub Pages as is).
// The rule tables are generated from the rule registry so they never drift.
//
//   npm run build && node scripts/build-docs.mjs
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { RULES, VERSION } from '../dist/index.js'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const docs = path.join(root, 'docs')
const SITE = 'https://kwy404.github.io/vueleap/'
const REPO = 'https://github.com/kwy404/vueleap'
const DATE = '2026-10-12'
const AUTHOR = { '@type': 'Person', name: 'Alexandre Kohler', url: 'https://github.com/kwy404' }

const demoSvg = await fs.readFile(path.join(root, 'assets/demo.svg'), 'utf8')
const [, demoW, demoH] = /width="(\d+)" height="(\d+)"/.exec(demoSvg)
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const md = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>')
const code = (lang, source) => `<pre><code class="language-${lang}">${esc(source.trim())}</code></pre>`
const compare = (lang, before, after, beforeLabel = 'Vue 2', afterLabel = 'Vue 3') =>
  `<div class="compare"><figure class="before"><figcaption>${beforeLabel}</figcaption>${code(lang, before)}</figure><figure class="after"><figcaption>${afterLabel}</figcaption>${code(lang, after)}</figure></div>`

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

function faqHtml(items) {
  return items.map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><p>${md(a)}</p></details>`).join('\n')
}

function layout({ slug, title, description, body, ld }) {
  const url = SITE + (slug === 'index.html' ? '' : slug)
  const nav = NAV.map(([href, label]) => `<a href="${href}"${href === slug ? ' aria-current="page"' : ''}>${label}</a>`).join('')
  const footerLinks = GUIDES.map(([href, label]) => `<a href="${href}">${label}</a>`).join('')
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
${jsonLd({ '@context': 'https://schema.org', ...(Array.isArray(ld) ? { '@graph': ld } : ld) })}
</head>
<body>
<a class="skip" href="#content">Skip to content</a>
<header class="site"><div class="container">
<a class="logo" href="./"><img src="favicon.svg" alt="" width="34" height="34"><b>vue<span>leap</span></b></a>
<nav class="main" aria-label="Main">${nav}<a href="${REPO}">GitHub</a></nav>
<button class="theme-toggle" type="button" id="theme" aria-label="Toggle color theme">Theme</button>
</div></header>
<main id="content">
${body}
</main>
<footer class="site"><div class="container">
<div>vueleap ${VERSION}, MIT licensed. Made by <a href="https://github.com/kwy404">Alexandre Kohler</a>.</div>
<nav aria-label="Guides">${footerLinks}<a href="https://www.npmjs.com/package/vueleap">npm</a></nav>
</div></footer>
<script>
(function(){var r=document.documentElement,b=document.getElementById('theme'),o=['auto','light','dark'];
function a(t){if(t==='auto')r.removeAttribute('data-theme');else r.setAttribute('data-theme',t);b.textContent='Theme: '+t}
var s='auto';try{s=localStorage.getItem('vueleap-theme')||'auto'}catch(e){}a(s);
b.addEventListener('click',function(){var c=r.getAttribute('data-theme')||'auto',n=o[(o.indexOf(c)+1)%3];a(n);try{localStorage.setItem('vueleap-theme',n)}catch(e){}});
var c=document.getElementById('copy');if(c)c.addEventListener('click',function(){if(navigator.clipboard)navigator.clipboard.writeText('npx vueleap').then(function(){c.textContent='Copied';setTimeout(function(){c.textContent='Copy'},1500)})});})();
</script>
</body>
</html>
`
}

const guideCards = (exclude) =>
  `<div class="cards">${GUIDES.filter(([href]) => href !== exclude)
    .map(([href, label, text]) => `<a class="card" href="${href}"><strong>${label}</strong><span>${text}</span></a>`)
    .join('')}</div>`

function ruleRows(rules) {
  return rules
    .map(
      (r) =>
        `<tr><td><code>${r.id}</code></td><td><span class="sev ${r.severity}">${r.severity}</span></td><td><strong>${esc(r.title)}</strong><br>${md(r.description)}</td><td>${
          r.compatFlags.length ? r.compatFlags.map((f) => `<code>${f}</code>`).join(' ') : 'none'
        }</td><td>${r.fixable ? 'Yes' : 'No'}</td><td><a href="${r.docs}">Guide</a></td></tr>`,
    )
    .join('\n')
}
const ruleTable = (rules) =>
  `<div class="table-wrap"><table><thead><tr><th scope="col">Rule</th><th scope="col">Severity</th><th scope="col">What changes</th><th scope="col">@vue/compat flag</th><th scope="col">Auto fix</th><th scope="col">Docs</th></tr></thead><tbody>${ruleRows(rules)}</tbody></table></div>`

const howTo = (text) => `<h2>How vueleap detects it</h2>${text}<p>Run it on your project:</p>${code('bash', 'npx vueleap')}`

const pages = []

// Home page.
{
  const features = [
    ['scan', 'Scan the whole project', `${RULES.length} checks over templates, scripts, styles and package.json, with file, line and column.`],
    ['fix', 'Apply safe fixes', `${RULES.filter((r) => r.fixable).length} codemods that are provably safe, previewed as a diff before anything is written.`],
    ['compat', 'Get exact compat flags', 'The minimal configureCompat and compatConfig for the @vue/compat migration build.'],
    ['report', 'Share an HTML report', 'One standalone file with filters, light and dark themes and links to the official guide.'],
    ['ci', 'Gate it in CI', 'Use --fail-on error and --json to stop Vue 2 only code from coming back.'],
    ['api', 'Use the API', 'Call analyze() and fix() from Node.js to build your own migration tooling.'],
  ]
  const faqs = [
    ['How do I migrate from Vue 2 to Vue 3?', 'Run `npx vueleap` to list every breaking change, switch your build to Vue 3 with the @vue/compat migration build using the generated flags, fix the findings (starting with `npx vueleap --fix --write`), upgrade vue-router, Vuex and UI libraries, then remove the compat flags one by one.'],
    ['Is vueleap safe to run on my code?', 'Yes. By default it only reads files. `--fix` prints a diff and writes nothing unless you add `--write`, and it never touches files outside the project folder.'],
    ['Does it support TypeScript, script setup and class components?', 'Yes. Single file components with `lang="ts"`, TSX, Vue 2.7 `<script setup>` and vue-property-decorator class components are analyzed. Pug templates are skipped with a warning.'],
    ['Is Vue 2 still supported?', 'No. Vue 2 reached end of life on December 31, 2023 and no longer receives updates from the Vue team.'],
  ]
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
        downloadUrl: 'https://www.npmjs.com/package/vueleap',
        codeRepository: REPO,
        license: 'https://opensource.org/licenses/MIT',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        author: AUTHOR,
        image: `${SITE}og.png`,
      },
      faq(faqs),
    ],
    body: `<section class="hero container">
<img class="mascot" src="mascot.svg" width="260" height="195" alt="Hop, the vueleap frog mascot, leaping from a lily pad marked 2 to a lily pad marked 3">
<h1>Migrate Vue 2 to Vue 3<br><span>with one command</span></h1>
<p class="lead">vueleap scans your Vue 2 project and tells you exactly what breaks in Vue 3, file by file and line by line, with the official migration guide link, the <code>@vue/compat</code> flags you need and safe automatic fixes.</p>
<div class="cta"><span class="command">npx vueleap <button type="button" id="copy">Copy</button></span><a class="button" href="${REPO}">View on GitHub</a></div>
</section>
<div class="container">
<div class="features">${features
      .map(([icon, title, text]) => `<div class="feature"><img src="icons/${icon}.svg" width="44" height="44" alt=""><h3>${title}</h3><p>${text}</p></div>`)
      .join('')}</div>
<div class="demo"><img src="demo.svg" width="${demoW}" height="${demoH}" alt="Animated terminal demo of npx vueleap listing Vue 3 breaking changes such as filters, lifecycle hook renames and keyCode modifiers in a Vue 2 app, followed by a summary and effort score"></div>
<div class="narrow" style="margin:0 auto">
<h2>What does vueleap check?</h2>
<p>Everything from the official <a href="https://v3-migration.vuejs.org/breaking-changes/">Vue 3 migration guide</a> that can be found statically: filters, <code>$listeners</code>, <code>$scopedSlots</code>, the <code>$on</code>/<code>$off</code> event bus, <code>$set</code> and <code>$delete</code>, <code>new Vue()</code> and the global API, <code>Vue.extend</code>, lifecycle and custom directive hook renames, <code>v-model</code> on components, <code>.sync</code>, <code>.native</code>, keyCode modifiers, functional components, <code>inline-template</code>, <code>v-if</code> with <code>v-for</code>, transition classes, render functions, and Vue 2 only dependencies such as vue-router 3, Vuex 3, BootstrapVue, Vuetify 2 and Element UI. See the <a href="vue-3-breaking-changes-checklist.html">full breaking changes checklist</a>.</p>
<h2>See a real report</h2>
<p>This is the HTML report generated for a small sample Vue 2 shop: <a href="report-example.html">open the sample report</a>. Generate yours with <code>npx vueleap --html report.html</code>.</p>
<h2>Guides</h2>
${guideCards('index.html')}
<h2>Questions</h2>
${faqHtml(faqs)}
</div>
</div>`,
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
${code('bash', 'npx vueleap\nnpx vueleap --html report.html   # shareable report')}
<p>Every finding has a severity: <strong>error</strong> breaks at compile time or runtime, <strong>warning</strong> changes behavior, <strong>info</strong> deserves a review. The summary ends with an effort score to compare projects or track progress.</p>
<h2>2. Upgrade the build tooling</h2>
<p>Vue 3 single file components are compiled by <code>@vue/compiler-sfc</code>, which ships with <code>vue</code>. Remove <code>vue-template-compiler</code>, use <code>vue-loader</code> 17 with webpack or Vue CLI 5, or <code>@vitejs/plugin-vue</code> with Vite. vueleap reports these under <code>vue2-tooling</code>.</p>
<h2>3. Install Vue 3 with the migration build</h2>
${code('bash', 'npm install vue@^3.5 @vue/compat@^3.5\nnpm uninstall vue-template-compiler')}
<p>Alias <code>vue</code> to <code>@vue/compat</code> and enable compat mode in the template compiler. vueleap prints this configuration with only the flags your project needs, running everything else in Vue 3 mode (<code>MODE: 3</code>):</p>
${code('js', "// vite.config.js\nimport vue from '@vitejs/plugin-vue'\n\nexport default {\n  resolve: { alias: { vue: '@vue/compat' } },\n  plugins: [\n    vue({\n      template: {\n        compilerOptions: {\n          compatConfig: { MODE: 3, COMPILER_FILTERS: true, COMPILER_V_BIND_SYNC: true },\n        },\n      },\n    }),\n  ],\n}")}
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
    body: `<div class="container">
<div class="narrow">
<h1>Vue 3 breaking changes checklist</h1>
<p class="lede">Every change below can break or silently change a Vue 2 app when it runs on Vue 3. vueleap checks all of them automatically and links each one to the official migration guide.</p>
<p class="meta">${RULES.length} checks, ${RULES.filter((r) => r.fixable).length} with safe automatic fixes. Generated from vueleap ${VERSION}.</p>
<div class="callout"><p>Instead of reading the list, run <code>npx vueleap</code> in your project to see which of these apply, with file and line numbers.</p></div>
</div>
${groups
  .map(([category, label]) => `<h2>${label}</h2>${ruleTable(RULES.filter((r) => r.category === category))}`)
  .join('\n')}
<div class="narrow">
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
  'html',
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
)}
<h2>.sync becomes v-model with an argument</h2>
${compare('html', `<text-document :title.sync="doc.title" />`, `<text-document v-model:title="doc.title" />`)}
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

for (const page of pages) await fs.writeFile(path.join(docs, page.slug), layout(page))

// 404 page.
await fs.writeFile(
  path.join(docs, '404.html'),
  layout({
    slug: '404.html',
    title: 'Page not found | vueleap',
    description: 'This page does not exist. Find the Vue 2 to Vue 3 migration guides and the vueleap documentation here.',
    ld: { '@type': 'WebPage', name: 'Page not found' },
    body: `<div class="container narrow" style="text-align:center"><img src="mascot.svg" width="240" height="180" alt="Hop the frog missed the lily pad" style="margin-top:48px"><h1>This page leapt away</h1><p class="lede">The page you are looking for does not exist. Try one of the guides below.</p>${guideCards('')}<p><a href="./">Back to the home page</a></p></div>`,
  }).replace('<link rel="canonical" href="https://kwy404.github.io/vueleap/404.html">\n', '<meta name="robots" content="noindex">\n'),
)

// Static files.
await fs.mkdir(path.join(docs, 'icons'), { recursive: true })
for (const icon of await fs.readdir(path.join(root, 'assets/icons'))) {
  await fs.copyFile(path.join(root, 'assets/icons', icon), path.join(docs, 'icons', icon))
}
for (const file of ['mascot.svg', 'favicon.svg', 'demo.svg']) {
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
