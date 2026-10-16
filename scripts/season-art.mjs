// Draws the seasonal art for the docs site: for each season, Hop the frog in
// costume, three icons in the site icon style and a hero accent band, each in
// a light and a dark version, plus the CSS that shows them when
// <html data-season="..."> is set by seasons.js.
//
// Output: assets/seasons/<id>/*.svg and assets/seasons/seasons.css. The docs
// build copies assets/seasons to docs/seasons.
//
//   node scripts/season-art.mjs
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.join(root, 'assets/seasons')

const MODES = {
  light: { ink: '#213547', soft: '#5b6b7c', paper: '#ffffff', snow: '#ffffff', snowEdge: '#b9c9da' },
  dark: { ink: '#d6dee8', soft: '#9fb0c2', paper: '#0f1513', snow: '#f4f8fc', snowEdge: '#f4f8fc' },
}

const f = (n) => Number(n.toFixed(1))
const ROT = (body) => `<g transform="rotate(9 205 130)">${body}</g>`

// ---------------------------------------------------------------------------
// Costumes. Each returns { name, back, front } drawn in mascot coordinates
// (400 x 300, the same as assets/mascot.svg). `back` goes behind Hop.

function burst(cx, cy, r, color, rays = 12) {
  let d = ''
  let dots = ''
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2
    const x1 = cx + Math.cos(a) * r * 0.35
    const y1 = cy + Math.sin(a) * r * 0.35
    const x2 = cx + Math.cos(a) * r
    const y2 = cy + Math.sin(a) * r
    d += `M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`
    dots += `<circle cx="${f(cx + Math.cos(a) * r * 1.18)}" cy="${f(cy + Math.sin(a) * r * 1.18)}" r="2.2" fill="${color}"/>`
  }
  return `<path d="${d}" stroke="${color}" stroke-width="3" stroke-linecap="round" fill="none"/>${dots}`
}

const COSTUMES = {
  halloween: (m) => ({
    name: 'Hop in a witch hat next to a carved pumpkin, for Halloween',
    back: '',
    front:
      ROT(`<ellipse cx="205" cy="60" rx="66" ry="11" fill="${m === 'dark' ? '#4a3f78' : '#2d2545'}" stroke="${m === 'dark' ? '#a99be0' : '#2d2545'}" stroke-width="2"/>
<path d="M170 58C184 32 196 12 238 -2C222 16 230 38 241 58Z" fill="${m === 'dark' ? '#4a3f78' : '#2d2545'}" stroke="${m === 'dark' ? '#a99be0' : '#2d2545'}" stroke-width="2" stroke-linejoin="round"/>
<path d="M173 50Q206 58 239 49L241 57Q206 66 170 57Z" fill="#e8833a"/>
<rect x="198" y="49" width="13" height="11" rx="2" fill="none" stroke="#f6c453" stroke-width="2.4"/>`) +
      `<g transform="translate(346 228)">
<ellipse cx="-13" cy="0" rx="15" ry="18" fill="#d9712c"/><ellipse cx="13" cy="0" rx="15" ry="18" fill="#d9712c"/><ellipse cx="0" cy="0" rx="15" ry="19" fill="#e8833a"/>
<path d="M-2 -18q2 -10 8 -12" stroke="#5b7a2e" stroke-width="4" stroke-linecap="round" fill="none"/>
<path d="M-12 -5l5 -6 5 6zM2 -5l5 -6 5 6z" fill="#3a1d0a"/>
<path d="M-13 6l4 4 4 -4 4 4 4 -4 4 4 4 -4" fill="none" stroke="#3a1d0a" stroke-width="3" stroke-linejoin="round"/>
</g>`,
  }),
  christmas: (m) => ({
    name: 'Hop in a striped scarf with snow on the lily pads, for Christmas',
    back: '',
    front:
      `<g fill="${MODES[m].snow}" stroke="${MODES[m].snowEdge}" stroke-width="1.5">
<path d="M36 234Q96 212 156 232Q96 224 36 234Z"/><path d="M246 232Q306 212 368 234Q306 224 246 232Z"/>
</g>` +
      ROT(`<path d="M150 99Q205 120 262 99L264 113Q205 136 148 113Z" fill="#c0392b"/>
<path d="M166 106l-4 14M190 112l-2 14M216 113l1 14M240 108l3 14" stroke="#ffffff" stroke-width="4" opacity=".9"/>
<path d="M172 112l-10 44l16 3l8 -44z" fill="#c0392b"/><path d="M168 130l15 3M165 144l15 3" stroke="#ffffff" stroke-width="4"/>
<path d="M162 156l-3 8M168 157l-2 8M174 158l-1 8" stroke="#c0392b" stroke-width="2.4" stroke-linecap="round"/>`) +
      `<g fill="${MODES[m].snow}" stroke="${MODES[m].snowEdge}" stroke-width="1"><circle cx="60" cy="60" r="4"/><circle cx="110" cy="30" r="3"/><circle cx="330" cy="50" r="4"/><circle cx="368" cy="110" r="3"/><circle cx="40" cy="140" r="3"/><circle cx="290" cy="20" r="2.6"/></g>`,
  }),
  carnival: () => ({
    name: 'Hop in a feathered carnival mask among confetti',
    back: [
      [60, 70, '#a855f7', 20], [92, 40, '#f1c40f', -30], [340, 60, '#22b8cf', 15], [312, 30, '#e5484d', 40], [370, 120, '#42b883', -10], [36, 130, '#e5484d', 30], [300, 110, '#f1c40f', 60],
    ]
      .map(([x, y, c, a]) => `<rect x="${x}" y="${y}" width="12" height="6" rx="1.5" fill="${c}" transform="rotate(${a} ${x + 6} ${y + 3})"/>`)
      .join(''),
    front: ROT(`<path fill-rule="evenodd" d="M146 86C148 60 190 58 205 73C220 58 262 60 264 86C260 106 222 106 205 93C188 106 150 106 146 86ZM192 82a14 14 0 1 0 -28 0a14 14 0 1 0 28 0ZM246 82a14 14 0 1 0 -28 0a14 14 0 1 0 28 0Z" fill="#7d3c98" stroke="#f1c40f" stroke-width="2.6" stroke-linejoin="round"/>
<path d="M258 70C270 52 268 30 284 12C286 34 280 56 262 74Z" fill="#e5484d"/><path d="M262 72C280 60 290 44 304 36C296 56 284 68 264 76Z" fill="#f39c12"/>
<circle cx="205" cy="76" r="3.5" fill="#f1c40f"/>`),
  }),
  easter: () => ({
    name: 'Hop holding a basket of painted eggs, for Easter',
    back: '',
    front: `<g transform="translate(118 214)">
<path d="M-26 -14Q0 -46 26 -14" fill="none" stroke="#a5672f" stroke-width="5" stroke-linecap="round"/>
<ellipse cx="-14" cy="-12" rx="8" ry="10" fill="#f9a8d4"/><ellipse cx="0" cy="-15" rx="8" ry="11" fill="#93c5fd"/><ellipse cx="14" cy="-12" rx="8" ry="10" fill="#fde68a"/>
<path d="M-4 -19l4 3 4 -3M-18 -12l4 2 4 -2" stroke="#ffffff" stroke-width="1.8" fill="none"/>
<path d="M-30 -10H30L24 20H-24Z" fill="#c8894b"/><path d="M-28 -2H28M-26 6H26M-25 13H25" stroke="#a5672f" stroke-width="2"/>
<path d="M-15 -10V20M0 -10V20M15 -10V20" stroke="#a5672f" stroke-width="1.6" opacity=".7"/>
</g>`,
  }),
  valentine: (m) => ({
    name: "Hop holding a heart balloon, for Valentine's",
    back: `<path d="M273 176C292 140 318 120 330 70" fill="none" stroke="${MODES[m].soft}" stroke-width="2.2" stroke-linecap="round"/>
<path d="M330 72C292 48 304 10 330 26C356 10 368 48 330 72Z" fill="#e5484d"/><path d="M314 30q6 -6 12 0" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".7"/>
<path d="M326 72l4 7 4 -7z" fill="#c23339"/>`,
    front: `<path d="M68 70c-8 -6 -2 -14 4 -8c6 -6 12 2 4 8l-4 4z" fill="#f472b6"/><path d="M360 130c-6 -5 -1 -11 3 -6c5 -5 9 1 3 6l-3 3z" fill="#fda4af"/>`,
  }),
  junina: (m) => ({
    name: 'Hop in a straw hat next to a small bonfire, for Festa Junina',
    back: '',
    front:
      ROT(`<ellipse cx="205" cy="62" rx="76" ry="14" fill="#e0b25c" stroke="#a87b2c" stroke-width="2"/>
<path d="M174 60C175 34 235 34 236 60Z" fill="#e9c46a" stroke="#a87b2c" stroke-width="2" stroke-linejoin="round"/>
<path d="M175 52Q205 60 235 52L236 59Q205 67 174 59Z" fill="#d64545"/>
<path d="M140 64q65 18 130 0" fill="none" stroke="#a87b2c" stroke-width="1.6" stroke-dasharray="4 5"/>`) +
      `<g transform="translate(200 266) scale(.8)">
<path d="M-26 12L22 -2M-22 -2L26 12" stroke="#7a4a24" stroke-width="7" stroke-linecap="round"/>
<path d="M0 6C-18 0 -14 -20 -4 -34C-4 -22 4 -22 6 -30C16 -18 18 0 0 6Z" fill="#ff7b39"/>
<path d="M0 4C-8 0 -6 -10 0 -18C2 -10 8 -8 6 -2C6 2 4 4 0 4Z" fill="#ffd166"/>
<circle cx="-12" cy="-40" r="2" fill="#ffb347"/><circle cx="10" cy="-48" r="1.6" fill="#ffd166"/><circle cx="-2" cy="-56" r="1.4" fill="${m === 'dark' ? '#ffd166' : '#ff7b39'}"/>
</g>`,
  }),
  newyear: () => ({
    name: 'Hop in a party hat under fireworks, for New Year',
    back: burst(62, 62, 34, '#e9c46a') + burst(340, 52, 28, '#f2a7c3', 10) + burst(352, 140, 18, '#7ad3c4', 8),
    front: ROT(`<path d="M186 66L214 2L244 62Z" fill="#42b883" stroke="#2c8c63" stroke-width="2" stroke-linejoin="round"/>
<path d="M195 46L232 38M203 28L227 22" stroke="#e9c46a" stroke-width="5" stroke-linecap="round"/>
<circle cx="214" cy="2" r="7" fill="#f2a7c3"/>
<path d="M190 64q20 6 52 -2" fill="none" stroke="#2c8c63" stroke-width="2"/>`),
  }),
}

// ---------------------------------------------------------------------------
// Icons, 48 x 48 with a 2.2 stroke, like the site icon set: one ink color,
// one season accent.

const ICONS = {
  halloween: [
    ['pumpkin', (i, a) => `<ellipse cx="17" cy="29" rx="9" ry="12" stroke="${a}"/><ellipse cx="31" cy="29" rx="9" ry="12" stroke="${a}"/><ellipse cx="24" cy="29" rx="8" ry="13" stroke="${i}"/><path d="M24 16c0-5 2-8 6-9" stroke="${i}"/><path d="M19 26l2-3 2 3M25 26l2-3 2 3M19 34c3 2 7 2 10 0" stroke="${i}"/>`],
    ['bat', (i, a) => `<path d="M24 20c-3 0-4 3-4 6 0-6-7-10-15-8 4 2 5 6 4 10 3-2 7-2 9 1 2-2 4-3 6-3s4 1 6 3c2-3 6-3 9-1-1-4 0-8 4-10-8-2-15 2-15 8 0-3-1-6-4-6z" stroke="${i}"/><path d="M22 20l-1-4M26 20l1-4" stroke="${i}"/><circle cx="36" cy="38" r=".8" stroke="${a}"/><circle cx="12" cy="40" r=".8" stroke="${a}"/>`],
    ['moon', (i, a) => `<path d="M30 8a16 16 0 1 0 10 26A13 13 0 0 1 30 8z" stroke="${i}"/><path d="M38 12l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" stroke="${a}"/>`],
  ],
  christmas: [
    ['snowflake', (i, a) => `<path d="M24 6v36M8.4 15l31.2 18M8.4 33l31.2-18" stroke="${i}"/><path d="M19 9l5 4 5-4M19 39l5-4 5 4M9 21l6-1-1-6M39 27l-6 1 1 6M9 27l6 1-1 6M39 21l-6-1 1-6" stroke="${a}"/>`],
    ['gift', (i, a) => `<rect x="8" y="20" width="32" height="20" rx="2" stroke="${i}"/><rect x="6" y="14" width="36" height="7" rx="2" stroke="${i}"/><path d="M24 14v26" stroke="${a}"/><path d="M24 14c-3-6-11-8-11-3s8 3 11 3c3 0 11 2 11-3s-8-3-11 3z" stroke="${a}"/>`],
    ['tree', (i, a) => `<path d="M24 6l-9 12h5l-8 10h6l-8 10h28l-8-10h6l-8-10h5z" stroke="${i}"/><path d="M24 38v5" stroke="${i}"/><circle cx="21" cy="24" r="1" stroke="${a}"/><circle cx="28" cy="31" r="1" stroke="${a}"/><circle cx="19" cy="34" r="1" stroke="${a}"/>`],
  ],
  carnival: [
    ['mask', (i, a) => `<path fill-rule="evenodd" d="M6 22c1-7 13-7 18-2 5-5 17-5 18 2-1 8-12 10-18 4-6 6-17 4-18-4z" stroke="${i}"/><ellipse cx="15" cy="22" rx="4" ry="3" stroke="${i}"/><ellipse cx="33" cy="22" rx="4" ry="3" stroke="${i}"/><path d="M38 16c2-5 4-8 8-10-1 5-3 9-6 12" stroke="${a}"/>`],
    ['streamer', (i, a) => `<path d="M6 10c8 0 8 8 16 8s8-8 16-8" stroke="${a}"/><path d="M10 26c6 0 6 6 12 6s6-6 12-6 6 6 10 6" stroke="${i}"/><path d="M8 40h4M20 42l3-3M32 40h5" stroke="${a}"/>`],
    ['star', (i, a) => `<path d="M24 6l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1z" stroke="${i}"/><circle cx="40" cy="40" r="1" stroke="${a}"/><circle cx="8" cy="40" r="1" stroke="${a}"/>`],
  ],
  easter: [
    ['egg', (i, a) => `<path d="M24 6c-8 0-14 13-14 22a14 14 0 0 0 28 0c0-9-6-22-14-22z" stroke="${i}"/><path d="M11 26l5-3 4 3 4-3 4 3 4-3 5 3M12 33h24" stroke="${a}"/>`],
    ['tulip', (i, a) => `<path d="M24 24v18M24 36c-4-4-9-4-12-2M24 32c4-3 8-3 11-1" stroke="${i}"/><path d="M16 10l4 5 4-7 4 7 4-5v8a8 8 0 0 1-16 0z" stroke="${a}"/>`],
    ['basket', (i, a) => `<path d="M8 22h32l-4 18H12z" stroke="${i}"/><path d="M12 22a12 12 0 0 1 24 0" stroke="${i}"/><ellipse cx="19" cy="20" rx="4" ry="5" stroke="${a}"/><ellipse cx="29" cy="20" rx="4" ry="5" stroke="${a}"/><path d="M10 30h28" stroke="${i}"/>`],
  ],
  valentine: [
    ['heart', (i, a) => `<path d="M24 40C6 28 8 12 18 12c3 0 5 2 6 4 1-2 3-4 6-4 10 0 12 16-6 28z" stroke="${i}"/><path d="M14 18c-2 1-3 3-3 5" stroke="${a}"/>`],
    ['letter', (i, a) => `<rect x="6" y="12" width="36" height="25" rx="3" stroke="${i}"/><path d="M6 14l18 13 18-13" stroke="${i}"/><path d="M24 33c-6-4-5-8-2-8 1 0 2 1 2 2 0-1 1-2 2-2 3 0 4 4-2 8z" stroke="${a}"/>`],
    ['balloon', (i, a) => `<path d="M24 30C10 22 12 8 20 8c2 0 3 1 4 3 1-2 2-3 4-3 8 0 10 14-4 22z" stroke="${a}"/><path d="M24 30c-2 4 2 6 0 10s2 4 0 6" stroke="${i}"/>`],
  ],
  junina: [
    ['bonfire', (i, a) => `<path d="M8 40l32-8M8 32l32 8" stroke="${i}"/><path d="M24 34c-7-2-8-9-3-16 0 4 3 5 4 2 5 5 6 12-1 14z" stroke="${a}"/><path d="M16 12v.1M33 9v.1M28 4v.1" stroke="${a}"/>`],
    ['flags', (i, a) => `<path d="M4 10c13 6 27 6 40 0" stroke="${i}"/><path d="M9 12.5l2 10 5-8M21 14.5l3 10 3-10M32 13.5l5 9 2-10" stroke="${a}"/><path d="M4 30c13 6 27 6 40 0" stroke="${i}"/><path d="M15 33.5l3 9 4-8M30 34l4 8 2-9" stroke="${a}"/>`],
    ['corn', (i, a) => `<path d="M24 6c-5 0-7 9-7 17s2 14 7 14 7-6 7-14-2-17-7-17z" stroke="${a}"/><path d="M19 16h10M18 23h12M19 30h10M24 8v28" stroke="${a}"/><path d="M17 30c-6 0-9 4-9 12 6-2 10-5 12-8M31 30c6 0 9 4 9 12-6-2-10-5-12-8" stroke="${i}"/>`],
  ],
  newyear: [
    ['burst', (i, a) => `<path d="M24 6v8M24 34v8M6 24h8M34 24h8M11 11l6 6M31 31l6 6M37 11l-6 6M17 31l-6 6" stroke="${a}"/><circle cx="24" cy="24" r="3" stroke="${i}"/>`],
    ['clock', (i, a) => `<circle cx="24" cy="26" r="15" stroke="${i}"/><path d="M24 26V15" stroke="${a}"/><path d="M24 26l-1-11" stroke="${i}"/><path d="M18 6h12M24 6v5" stroke="${i}"/>`],
    ['sparkle', (i, a) => `<path d="M20 8l3 10 10 3-10 3-3 10-3-10-10-3 10-3z" stroke="${i}"/><path d="M36 30l1.6 4.4 4.4 1.6-4.4 1.6L36 42l-1.6-4.4L30 36l4.4-1.6z" stroke="${a}"/>`],
  ],
}

const ACCENT_COLORS = {
  halloween: ['#e8833a', '#8a5a2b', '#6b4fa0'],
  christmas: ['#d64545', '#42b883', '#e9c46a', '#5aa9e6'],
  carnival: ['#a855f7', '#f1c40f', '#e5484d', '#22b8cf', '#42b883'],
  easter: ['#f9a8d4', '#93c5fd', '#fde68a', '#a7f3d0'],
  valentine: ['#e5484d', '#f472b6', '#fda4af'],
  junina: ['#d64545', '#2f80ed', '#f2c94c', '#42b883', '#f2994a'],
  newyear: ['#e9c46a', '#f2a7c3', '#7ad3c4'],
}

/** A string hung across the hero, with an ornament every few steps. */
function accent(id, m) {
  const ink = MODES[m].soft
  const colors = ACCENT_COLORS[id]
  const W = 1200
  const spans = 4
  const sag = 26
  let line = 'M0 8'
  const points = []
  for (let s = 0; s < spans; s++) {
    const x0 = (s * W) / spans
    const x1 = ((s + 1) * W) / spans
    line += `Q${f((x0 + x1) / 2)} ${8 + sag * 2} ${f(x1)} 8`
    for (let k = 1; k < 7; k++) {
      const t = k / 7
      const x = x0 + (x1 - x0) * t
      const y = (1 - t) * (1 - t) * 8 + 2 * (1 - t) * t * (8 + sag * 2) + t * t * 8
      points.push([x, y])
    }
  }
  const ornament = (x, y, n) => {
    const c = colors[n % colors.length]
    switch (id) {
      case 'halloween':
        return n % 3 === 1
          ? `<path transform="translate(${f(x)} ${f(y + 14)})" d="M0 0c-2 0-3 2-3 4 0-4-5-7-10-5 3 1 3 4 3 7 2-1 5-1 6 1 1-1 3-2 4-2s3 1 4 2c1-2 4-2 6-1 0-3 0-6 3-7-5-2-10 1-10 5 0-2-1-4-3-4z" fill="${m === 'dark' ? '#8f7cc9' : '#4b3b73'}"/><path d="M${f(x)} ${f(y)}v14" stroke="${ink}" stroke-width="1"/>`
          : `<path d="M${f(x)} ${f(y)}v8" stroke="${ink}" stroke-width="1"/><ellipse cx="${f(x)}" cy="${f(y + 14)}" rx="8" ry="6.5" fill="${colors[0]}"/><path d="M${f(x)} ${f(y + 7)}v-2" stroke="#5b7a2e" stroke-width="2"/>`
      case 'christmas':
        return `<rect x="${f(x - 2.5)}" y="${f(y)}" width="5" height="4" rx="1" fill="${ink}"/><ellipse cx="${f(x)}" cy="${f(y + 10)}" rx="4.5" ry="7" fill="${c}"/>`
      case 'carnival':
        return `<path d="M${f(x)} ${f(y)}c-6 12 6 18 0 30" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"/>`
      case 'easter':
        return `<path d="M${f(x)} ${f(y)}v6" stroke="${ink}" stroke-width="1"/><ellipse cx="${f(x)}" cy="${f(y + 14)}" rx="6" ry="8" fill="${c}"/><path d="M${f(x - 6)} ${f(y + 14)}l3 -2 3 2 3 -2 3 2" stroke="#ffffff" stroke-width="1.4" fill="none"/>`
      case 'valentine':
        return `<path d="M${f(x)} ${f(y)}v4" stroke="${ink}" stroke-width="1"/><path transform="translate(${f(x)} ${f(y + 12)})" d="M0 9C-12 1 -9 -9 -3 -7c1 0 2 1 3 2 1-1 2-2 3-2 6-2 9 8-3 16z" fill="${c}"/>`
      case 'junina':
        return `<path d="M${f(x - 9)} ${f(y)}L${f(x + 9)} ${f(y)}L${f(x + 9)} ${f(y + 18)}L${f(x)} ${f(y + 12)}L${f(x - 9)} ${f(y + 18)}Z" fill="${c}"/>`
      default:
        return n % 4 === 0 ? `<g transform="translate(${f(x)} ${f(y + 18)}) scale(.5) translate(${f(-x)} ${f(-y - 18)})">${burst(x, y + 18, 20, c, 10)}</g>` : `<circle cx="${f(x)}" cy="${f(y + 8)}" r="2.4" fill="${c}"/>`
    }
  }
  const body = points.map(([x, y], n) => ornament(x, y, n)).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 ${W} 92" width="${W}" height="92" aria-hidden="true"><path d="${line}" fill="none" stroke="${ink}" stroke-width="1.4"/>${body}</svg>\n`
}

// ---------------------------------------------------------------------------

const mascot = await fs.readFile(path.join(root, 'assets/mascot.svg'), 'utf8')
const mascotInner = mascot
  .replace(/^<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replace(/<title[^>]*>.*?<\/title>/, '')
  .trim()

const css = [
  '/* Generated by scripts/season-art.mjs. Shown when seasons.js sets <html data-season>. */',
]
for (const id of Object.keys(COSTUMES)) {
  const dir = path.join(out, id)
  await fs.mkdir(dir, { recursive: true })
  for (const [m, palette] of Object.entries(MODES)) {
    const suffix = m === 'dark' ? '-dark' : ''
    const c = COSTUMES[id](m)
    await fs.writeFile(
      path.join(dir, `mascot${suffix}.svg`),
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -10 400 310" width="400" height="310" role="img" aria-label="${c.name}"><title>${c.name}</title>\n${c.back}\n${mascotInner}\n${c.front}\n</svg>\n`,
    )
    for (const [index, [name, draw]] of ICONS[id].entries()) {
      await fs.writeFile(
        path.join(dir, `icon-${index + 1}${suffix}.svg`),
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><!-- ${name} -->${draw(palette.ink, ACCENT_COLORS[id][0])}</svg>\n`,
      )
    }
    await fs.writeFile(path.join(dir, `accent${suffix}.svg`), accent(id, m))
  }
  const rules = (suffix) =>
    `.season-mascot { background-image: url(${id}/mascot${suffix}.svg); } .season-accent { background-image: url(${id}/accent${suffix}.svg); } .season-icons i:nth-child(1) { background-image: url(${id}/icon-1${suffix}.svg); } .season-icons i:nth-child(2) { background-image: url(${id}/icon-2${suffix}.svg); } .season-icons i:nth-child(3) { background-image: url(${id}/icon-3${suffix}.svg); }`
  const scope = (sel, body) => body.replace(/(^|\} )\./g, `$1${sel} .`)
  css.push(`[data-season="${id}"] { --season: ${ACCENT_COLORS[id][0]}; }`)
  css.push(scope(`[data-season="${id}"]`, rules('')))
  css.push(`@media (prefers-color-scheme: dark) { ${scope(`:root:not([data-theme="light"])[data-season="${id}"]`, rules('-dark'))} }`)
  css.push(scope(`:root[data-theme="dark"][data-season="${id}"]`, rules('-dark')))
  // The chip keeps its icon while the theme is switched off.
  css.push(`.season-chip[data-for="${id}"] .season-chip-icon { background-image: url(${id}/icon-1.svg); }`)
  css.push(`@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .season-chip[data-for="${id}"] .season-chip-icon { background-image: url(${id}/icon-1-dark.svg); } } :root[data-theme="dark"] .season-chip[data-for="${id}"] .season-chip-icon { background-image: url(${id}/icon-1-dark.svg); }`)
}
await fs.writeFile(path.join(out, 'seasons.css'), `${css.join('\n')}\n`)
console.log(`seasonal art for ${Object.keys(COSTUMES).length} seasons written to assets/seasons`)
