// Regenerates the README terminal images and the sample HTML report from the
// real output of the built CLI on test/fixtures/vue2-app.
//
//   npm run build && node scripts/render-assets.mjs
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { analyze, formatHtml, formatPretty } from '../dist/index.js'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const fixture = path.join(root, 'test/fixtures/vue2-app')

const result = await analyze(fixture)
const output = formatPretty(result, { color: true })
const lines = output.split('\n')

// Pick an excerpt of real output lines: header, a few rule groups, the summary.
function group(ruleId) {
  const start = lines.findIndex((l) => strip(l).includes(`  ${ruleId}  `))
  if (start === -1) throw new Error(`rule ${ruleId} not in output`)
  let end = start + 1
  while (end < lines.length && strip(lines[end]).trim() !== '') end++
  return lines.slice(start, end + 1)
}
function strip(line) {
  // eslint-disable-next-line no-control-regex
  return line.replace(/\x1b\[[0-9;]*m/g, '')
}
const summaryStart = lines.findIndex((l) => strip(l) === 'Summary')
const summary = lines.slice(summaryStart, summaryStart + 6)

const excerpt = [
  ...lines.slice(0, 2),
  ...group('filters'),
  ...group('event-emitter'),
  ...group('destroy-hooks'),
  ...group('keycode-modifiers'),
  `\x1b[2m  ... ${result.summary.byRule.length - 4} more rule groups in the full report\x1b[22m`,
  '',
  ...summary,
]

// ANSI (as emitted by picocolors) to SVG tspans.
const PALETTE = { 31: '#ff7b72', 32: '#7ee787', 33: '#e3b341', 34: '#79c0ff', 36: '#56d4dd' }
function toTspans(line) {
  let fill = null
  let bold = false
  let dim = false
  let out = ''
  // eslint-disable-next-line no-control-regex
  for (const part of line.split(/(\x1b\[[0-9;]*m)/)) {
    // eslint-disable-next-line no-control-regex
    const code = /^\x1b\[([0-9;]*)m$/.exec(part)
    if (code) {
      const n = Number(code[1])
      if (n === 1) bold = true
      else if (n === 2) dim = true
      else if (n === 22) {
        bold = false
        dim = false
      } else if (n === 39) fill = null
      else if (PALETTE[n]) fill = PALETTE[n]
      continue
    }
    if (!part) continue
    const attrs = []
    if (fill) attrs.push(`fill="${fill}"`)
    if (bold) attrs.push('font-weight="700"')
    if (dim) attrs.push('fill-opacity=".55"')
    const text = part.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    out += attrs.length ? `<tspan ${attrs.join(' ')}>${text}</tspan>` : text
  }
  return out
}

const FONT = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
const LINE = 21
const PAD_X = 24
const TOP = 70
const CHAR = 8.1
const width = Math.ceil(Math.max(...excerpt.map((l) => strip(l).length), 60) * CHAR + PAD_X * 2)

function frame(height, title) {
  return `<rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="12" fill="#0d1117" stroke="#30363d"/>
<circle cx="24" cy="22" r="6" fill="#ff5f57"/><circle cx="44" cy="22" r="6" fill="#febc2e"/><circle cx="64" cy="22" r="6" fill="#28c840"/>
<text x="${width / 2}" y="27" text-anchor="middle" fill="#8b949e" font-size="13" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif">${title}</text>`
}

const prompt = '<tspan fill="#7ee787">~/shop-front</tspan> <tspan fill="#8b949e">$</tspan> '

// Static terminal image.
{
  const height = TOP + (excerpt.length + 1) * LINE + 16
  const body = excerpt
    .map((line, i) => `<text x="${PAD_X}" y="${TOP + (i + 1) * LINE}" xml:space="preserve">${toTspans(line)}</text>`)
    .join('\n')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="t">
<title id="t">Terminal output of npx vueleap on a Vue 2 app: Vue 3 breaking changes grouped by rule with file, line, docs link and compat flags, then a summary with an effort score</title>
${frame(height, 'npx vueleap')}
<g font-family="${FONT}" font-size="13.5" fill="#e6edf3">
<text x="${PAD_X}" y="${TOP}" xml:space="preserve">${prompt}npx vueleap</text>
${body}
</g>
</svg>
`
  await fs.writeFile(path.join(root, 'assets/terminal.svg'), svg)
}

// Animated demo: types the command, then reveals the report line by line, and loops.
{
  const demo = [
    ...lines.slice(0, 2),
    ...group('filters'),
    ...group('destroy-hooks'),
    ...group('keycode-modifiers'),
    ...summary,
  ]
  const height = TOP + (demo.length + 1) * LINE + 16
  const cycle = 14
  const typeEnd = 1.6
  const revealStart = 2.0
  const step = 0.12
  const hold = 0.93
  const pct = (seconds) => ((seconds / cycle) * 100).toFixed(2)
  const command = 'npx vueleap'
  let css = `.l{opacity:0;animation:${cycle}s linear infinite}`
  css += `@keyframes blink{50%{fill-opacity:0}}#k{animation:blink 1s step-end infinite}`
  const body = demo
    .map((line, i) => {
      const at = pct(revealStart + i * step)
      css += `@keyframes r${i}{0%,${at}%{opacity:0}${(Number(at) + 0.01).toFixed(2)}%,${hold * 100}%{opacity:1}100%{opacity:0}}.r${i}{animation-name:r${i}}`
      return `<text class="l r${i}" x="${PAD_X}" y="${TOP + (i + 1) * LINE}" xml:space="preserve">${toTspans(line)}</text>`
    })
    .join('\n')
  const typed = [...command]
    .map((ch, i) => {
      const at = Number(pct(0.3 + ((typeEnd - 0.3) * (i + 1)) / command.length))
      css += `@keyframes t${i}{0%,${at.toFixed(2)}%{fill-opacity:0}${(at + 0.01).toFixed(2)}%,${hold * 100}%{fill-opacity:1}100%{fill-opacity:0}}.t${i}{animation:t${i} ${cycle}s linear infinite}`
      return `<tspan class="t${i}" fill-opacity="0">${ch}</tspan>`
    })
    .join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="t">
<title id="t">Animated demo: typing npx vueleap in a Vue 2 project prints the Vue 3 migration report with breaking changes, auto fixable findings and an effort score</title>
<style>${css}</style>
${frame(height, 'vueleap demo')}
<g font-family="${FONT}" font-size="13.5" fill="#e6edf3">
<text x="${PAD_X}" y="${TOP}" xml:space="preserve">${prompt}${typed}<tspan id="k" fill="#7ee787">_</tspan></text>
${body}
</g>
</svg>
`
  await fs.writeFile(path.join(root, 'assets/demo.svg'), svg)
  console.log(`demo.svg ${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB`)
}

// Sample HTML report for the docs site and the README screenshot.
const reportHead = [
  '<link rel="canonical" href="https://kwy404.github.io/vueleap/report-example.html">',
  '<meta property="og:title" content="Sample Vue 3 migration report generated by vueleap">',
  '<meta property="og:description" content="A real vueleap HTML report for a small Vue 2 app: breaking changes by rule, @vue/compat flags and auto fixable findings.">',
  '<meta property="og:image" content="https://kwy404.github.io/vueleap/og.png">',
  '<meta name="twitter:card" content="summary_large_image">',
  '<meta name="author" content="Alexandre Kohler">',
].join('')
// On the docs site the report gets a strip back to the docs and the site footer,
// styled with the report's own theme variables so it follows its light and dark themes.
const siteStyle = `<style>
.site-strip{background:var(--accent-soft);border-bottom:1px solid var(--border);font-size:14px}
.site-strip .wrap{display:flex;flex-wrap:wrap;gap:6px 16px;align-items:center;justify-content:space-between;padding-top:10px;padding-bottom:10px}
.site-strip a,.site-foot a{color:var(--accent);font-weight:600}
.site-foot{margin-top:48px;border-top:1px solid var(--border);color:var(--muted);font-size:14px}
.site-foot .wrap{display:grid;gap:10px;padding-top:24px;padding-bottom:32px}
.site-foot p{margin:0}
.site-foot ul{display:flex;flex-wrap:wrap;gap:6px 16px;list-style:none;margin:0;padding:0}
</style>`
const MORE = [
  ['Monsoon', 'https://kwy404.github.io/monsoon/'],
  ['Voodoo.js', 'https://kwy404.github.io/Voodoo.js/'],
  ['breakhound', 'https://kwy404.github.io/breakhound/'],
  ['graphemely', 'https://kwy404.github.io/graphemely/'],
  ['numberparrot', 'https://kwy404.github.io/numberparrot/'],
  ['edgegoat', 'https://kwy404.github.io/edgegoat/'],
  ['cookieowl', 'https://kwy404.github.io/cookieowl/'],
  ['installkite', 'https://kwy404.github.io/installkite/'],
  ['a11ymedic', 'https://kwy404.github.io/a11ymedic/'],
  ['fontsketch', 'https://kwy404.github.io/fontsketch/'],
  ['kastor', 'https://kwy404.github.io/kastor/'],
]
const siteStrip = `<div class="site-strip"><div class="wrap"><span>This is a sample report generated by <code>npx vueleap --html report.html</code> for a small Vue 2 shop.</span><a href="./">Back to the vueleap docs</a></div></div>`
const siteFoot = `<footer class="site-foot"><div class="wrap">
<p>Made by <a href="https://github.com/kwy404" rel="me noopener">Alexandre Kohler</a> (<a href="https://github.com/kwy404" rel="me noopener">GitHub</a>, <a href="https://www.linkedin.com/in/alexandre-silva-173687256/" rel="me noopener">LinkedIn</a>). Docs site built with <a href="https://kwy404.github.io/monsoon/">Monsoon</a>. Interactive parts built with <a href="https://kwy404.github.io/Voodoo.js/">Voodoo.js</a>.</p>
<p>More from kwy404:</p><ul>${MORE.map(([name, href]) => `<li><a href="${href}">${name}</a></li>`).join('')}</ul>
</div></footer>`
await fs.writeFile(
  path.join(root, 'docs/report-example.html'),
  formatHtml(result, { projectName: 'shop-front (sample Vue 2 app)', generatedAt: new Date('2026-10-12T12:00:00Z') })
    .replace('</title>', `</title>${reportHead}`)
    .replace('</head>', `${siteStyle}</head>`)
    .replace('<body>', `<body>\n${siteStrip}`)
    .replace('</body>', `${siteFoot}\n</body>`),
)
console.log('assets/terminal.svg, assets/demo.svg and docs/report-example.html written')

// Banner (light and dark) and the HTML sources of the social cards, all built
// around the mascot so there is a single drawing to maintain.
const mascot = await fs.readFile(path.join(root, 'assets/mascot.svg'), 'utf8')
const mascotInner = mascot
  .replace(/^<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replace(/<title[^>]*>.*?<\/title>/, '')
  .trim()
const SANS = "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

function banner(dark) {
  const ink = dark ? '#e6edf3' : '#213547'
  const soft = dark ? '#9fb3c1' : '#476173'
  const chips = ['breaking changes', '@vue/compat flags', 'safe auto fixes']
  let x = 530
  const chipSvg = chips
    .map((label) => {
      const w = label.length * 9.6 + 32
      const out = `<rect x="${x}" y="246" width="${w}" height="40" rx="20" fill="#42b883" fill-opacity="${dark ? 0.16 : 0.12}" stroke="#42b883" stroke-opacity=".55"/><text x="${x + w / 2}" y="272" text-anchor="middle" font-size="18" font-weight="600" fill="${dark ? '#7ee2b8' : '#2c8c63'}">${label}</text>`
      x += w + 12
      return out
    })
    .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="340" viewBox="0 0 1200 340" role="img" aria-labelledby="t">
<title id="t">vueleap: migrate Vue 2 to Vue 3 with one command. Hop the frog leaps from lily pad 2 to lily pad 3.</title>
<svg x="90" y="20" width="400" height="300" viewBox="0 0 400 300">${mascotInner}</svg>
<g font-family="${SANS}">
<text x="526" y="150" font-size="104" font-weight="800" letter-spacing="-3" fill="${ink}">vue<tspan fill="#42b883">leap</tspan></text>
<text x="530" y="210" font-size="31" font-weight="500" fill="${soft}">Migrate Vue 2 to Vue 3 with one command</text>
${chipSvg}
</g>
</svg>
`
}
await fs.writeFile(path.join(root, 'assets/banner.svg'), banner(false))
await fs.writeFile(path.join(root, 'assets/banner-dark.svg'), banner(true))

function card(width, height) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>vueleap card</title>
<style>
html,body{margin:0;width:${width}px;height:${height}px;overflow:hidden}
body{font-family:${SANS};background:radial-gradient(circle at 18% 30%,#1d3b30 0,#0f1a17 45%,#0b1210 100%);color:#e6edf3;display:flex;align-items:center;justify-content:center}
.wrap{display:flex;align-items:center;gap:${Math.round(width * 0.03)}px;padding:0 ${Math.round(width * 0.05)}px}
svg{width:${Math.round(width * 0.4)}px;height:auto;flex:none}
h1{margin:0;font-size:${Math.round(width * 0.092)}px;letter-spacing:-.03em;line-height:1}
h1 span{color:#42b883}
p{margin:${Math.round(height * 0.03)}px 0 0;white-space:nowrap;font-size:${Math.round(width * 0.028)}px;color:#b8c7d1;line-height:1.3}
code{display:inline-block;margin-top:${Math.round(height * 0.05)}px;font:600 ${Math.round(width * 0.024)}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;background:#42b88322;border:2px solid #42b88388;color:#7ee2b8;border-radius:12px;padding:10px 20px}
.url{margin-top:${Math.round(height * 0.04)}px;font-size:${Math.round(width * 0.018)}px;color:#7d919e}
</style></head>
<body><div class="wrap">${mascot.replace(/ width="400" height="300"/, '')}
<div><h1>vue<span>leap</span></h1><p>Find everything that breaks when<br>you migrate from Vue 2 to Vue 3</p><code>npx vueleap</code><div class="url">kwy404.github.io/vueleap</div></div></div></body></html>
`
}
await fs.mkdir(path.join(root, 'scripts/cards'), { recursive: true })
await fs.writeFile(path.join(root, 'scripts/cards/og.html'), card(1200, 630))
await fs.writeFile(path.join(root, 'scripts/cards/social-preview.html'), card(1280, 640))
console.log('banners and card sources written')
