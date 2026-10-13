// The docs site illustration set: pond and journey line art drawn as inline
// SVG. Strokes use CSS classes (see docs/style.css) so every drawing follows
// the light and dark theme on its own:
//   .ink   currentColor outlines        .leaf  the Vue green accent
//   .water ripples and water lines      .tint  soft green fill
//
// Used by scripts/build-docs.mjs. Nothing here touches the file system.

const f = (n) => Number(n.toFixed(2))

/**
 * A lily pad seen in perspective: an ellipse with the classic wedge notch.
 * `notch` is the angle (degrees) where the wedge opens, `gap` its width.
 */
export function padPath(cx, cy, rx, ry, notch = -20, gap = 34) {
  const a1 = ((notch - gap / 2) * Math.PI) / 180
  const a2 = ((notch + gap / 2) * Math.PI) / 180
  const p1 = [cx + rx * Math.cos(a1), cy + ry * Math.sin(a1)]
  const p2 = [cx + rx * Math.cos(a2), cy + ry * Math.sin(a2)]
  return `M${f(cx)} ${f(cy)}L${f(p2[0])} ${f(p2[1])}A${f(rx)} ${f(ry)} 0 1 1 ${f(p1[0])} ${f(p1[1])}Z`
}

const svgOpen = (viewBox, cls, size, label) =>
  `<svg class="${cls}" viewBox="${viewBox}"${size ? ` width="${size[0]}" height="${size[1]}"` : ''} fill="none" stroke-linecap="round" stroke-linejoin="round"${
    label ? ` role="img" aria-label="${label}"` : ' aria-hidden="true" focusable="false"'
  }>`

// Icons: 48 x 48, stroke 2.2, one ink color and one green accent.
const ICONS = {
  scan: `<path class="tint leaf" d="${padPath(24, 36, 17, 6.5, -12, 30)}"/>
<circle class="ink" cx="21" cy="18" r="8.5"/><path class="ink" d="m27.2 24.2 6.3 6.3"/><path class="leaf" d="M17 18.5h8M17 14.8h5"/>`,
  understand: `<path class="ink" d="M12 7h17l7 7v27H12z"/><path class="ink" d="M29 7v7h7"/>
<circle class="leaf tint" cx="18" cy="21" r="2.2"/><path class="ink" d="M23 21h8"/>
<circle class="leaf tint" cx="18" cy="28" r="2.2"/><path class="ink" d="M23 28h8"/>
<circle class="leaf tint" cx="18" cy="35" r="2.2"/><path class="ink" d="M23 35h5"/>`,
  fix: `<path class="tint leaf" d="${padPath(22, 37, 16, 6, 200, 30)}"/>
<path class="ink" d="m14 33 2.4-7.6L31.6 10.2a3 3 0 0 1 4.2 0l2 2a3 3 0 0 1 0 4.2L22.6 31.6z"/><path class="ink" d="m28.8 13 6.2 6.2M16.4 25.4l6.2 6.2"/>`,
  compat: `<path class="tint leaf" d="${padPath(11, 35, 9, 4.2, -30, 36)}"/><path class="tint leaf" d="${padPath(37, 35, 9, 4.2, 210, 36)}"/>
<path class="ink" d="M5 28c6-13 32-13 38 0"/><path class="ink" d="M5 28h38"/><path class="leaf" d="M14 22.4V28M24 19.8V28M34 22.4V28"/>`,
  ship: `<path class="tint leaf" d="${padPath(24, 37, 17, 6.5, -15, 30)}"/>
<path class="ink" d="M21 37V8"/><path class="leaf tint" d="M21 9h15l-4 5.5 4 5.5H21z"/><path class="water" d="M4 44h7M37 44h7"/>`,
  eol: `<path class="leaf tint" d="M12 27a12 12 0 0 1 24 0z"/><path class="ink" d="M4 27h40"/><path class="water" d="M10 33h28M15 38.5h18M20 43.5h8"/><path class="ink" d="M24 5v4M9.7 11l2.8 2.8M38.3 11l-2.8 2.8"/>`,
  plan: `<ellipse class="ink" cx="11" cy="37" rx="7" ry="3"/><ellipse class="ink" cx="25" cy="27" rx="6" ry="2.6"/><ellipse class="leaf tint" cx="37" cy="15" rx="7" ry="3"/>
<path class="water" d="M14 33c2-3 5-4 8-5M28 23c2-2.6 4-4 6-5" stroke-dasharray="0.1 3.6"/><path class="ink" d="M37 15V5l5 2.5-5 2.5"/>`,
  checklist: `<rect class="ink" x="10" y="8" width="28" height="35" rx="4"/><path class="ink" d="M18 8V5h12v3"/>
<path class="leaf" d="m15.5 19 2.5 2.5 4.5-5M15.5 29l2.5 2.5 4.5-5"/><path class="ink" d="M26 19h7M26 29h7M17 38h16"/>`,
  filters: `<path class="ink" d="M7 9h26l-10 12.5V36l-6 3V21.5z"/><path class="leaf" d="M40 7v34"/><path class="water" d="M10 44h20"/>`,
  bus: `<path class="tint leaf" d="${padPath(9, 37, 7, 3.2, -30, 40)}"/><path class="tint leaf" d="${padPath(39, 37, 7, 3.2, 210, 40)}"/>
<path class="ink" d="M9 30C12 10 36 10 39 30" stroke-dasharray="0.1 4"/><path class="ink" d="m34 26.5 5 3.5 2-5.6"/><rect class="leaf tint" x="18" y="10" width="12" height="9" rx="1.6"/><path class="leaf" d="m18.5 10.8 5.5 4.4 5.5-4.4"/>`,
  vmodel: `<path class="ink" d="M10 17h24M29 11.5l5.5 5.5L29 22.5"/><path class="leaf" d="M38 31H14M19 25.5 13.5 31l5.5 5.5"/><path class="water" d="M8 43h32"/>`,
  report: `<rect class="ink" x="5" y="8" width="38" height="32" rx="4"/><path class="ink" d="M5 15h38"/><circle class="leaf" cx="10" cy="11.5" r=".6"/><circle class="leaf" cx="14" cy="11.5" r=".6"/>
<path class="leaf tint" d="M11 33V26h5v7zM20 33V21h5v12zM29 33V24h5v9z"/>`,
  ci: `<circle class="ink" cx="12" cy="12" r="4"/><circle class="ink" cx="12" cy="36" r="4"/><circle class="leaf tint" cx="36" cy="24" r="4"/>
<path class="ink" d="M12 16v16M12 24h6c6 0 8-4 14-0"/><path class="water" d="M30 38h12"/>`,
  api: `<path class="ink" d="m16 15-9 9 9 9M32 15l9 9-9 9"/><path class="leaf" d="m27 10-6 28"/>`,
}

/** One icon of the set, sized for the page. */
export const icon = (name, size = 40, cls = '') => `${svgOpen('0 0 48 48', `art-icon ${cls}`.trim(), [size, size])}<g stroke-width="2.2">${ICONS[name]}</g></svg>`

/** A lily pad badge with a stop number in it, used for the journey stops. */
export function padBadge(n, size = 64) {
  return `${svgOpen('0 0 64 64', 'pad-badge', [size, size])}<path class="tint leaf" stroke-width="2.4" d="${padPath(32, 34, 27, 24, -55, 30)}"/>
<path class="leaf" stroke-width="1.6" opacity=".55" d="M32 34 13 22M32 34l-20 10M32 34l4 22M32 34l20 6"/>
<text x="31" y="42" text-anchor="middle" class="pad-num">${n}</text></svg>`
}

/** Small pad used as a node on the journey rail and the docs stepper. */
export const padNode = (cls = 'node') =>
  `${svgOpen('0 0 32 32', cls)}<path stroke-width="2" d="${padPath(16, 16, 12.5, 11, -50, 34)}"/></svg>`

// The mascot, inlined so the hero is one drawing. Same artwork as assets/mascot.svg.
function mascotInner(mascot) {
  return mascot
    .replace(/^<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/<title[^>]*>.*?<\/title>/, '')
    .trim()
}

function reed(x, y, h, lean) {
  return `<path class="ink" d="M${x} ${y}c${lean * 0.3} ${-h * 0.4} ${lean * 0.6} ${-h * 0.7} ${lean} ${-h}"/>`
}

/** Hero scene: the pond, reeds, stepping stones, a dragonfly and Hop mid leap. */
export function heroPond(mascot) {
  const ripples = [
    [232, 368, 96, 22, ''],
    [232, 368, 126, 30, ' stroke-dasharray="2 9"'],
    [368, 368, 96, 22, ''],
    [368, 368, 132, 32, ' stroke-dasharray="2 9"'],
  ]
    .map(([cx, cy, rx, ry, dash]) => `<ellipse class="water" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"${dash}/>`)
    .join('')
  const stones = [
    [58, 430, 20, 7],
    [112, 412, 16, 6],
    [158, 398, 12, 4.6],
  ]
    .map(([cx, cy, rx, ry]) => `<ellipse class="ink tint-soft" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/>`)
    .join('')
  const smallPads = [
    [500, 418, 26, 8, 200],
    [546, 392, 16, 5.5, -20],
    [470, 300, 14, 5, 160],
  ]
    .map(([cx, cy, rx, ry, notch]) => `<path class="leaf tint" d="${padPath(cx, cy, rx, ry, notch, 32)}"/>`)
    .join('')
  return `${svgOpen('10 44 580 416', 'hero-art', null, 'Hop, the vueleap frog, leaping across a pond from a lily pad marked 2 to a lily pad marked 3')}
<g stroke-width="2">
<path class="water" d="M20 448h560M70 458h460" opacity=".7"/>
${ripples}
${stones}
${smallPads}
<path class="leaf" d="M500 418l-8-12M500 418l12-9" opacity=".6"/>
${reed(30, 446, 120, 14)}${reed(44, 446, 160, -6)}${reed(58, 446, 104, 22)}${reed(570, 440, 128, -16)}${reed(556, 440, 92, 10)}
<ellipse class="leaf tint" cx="${44 - 6}" cy="${446 - 160 + 16}" rx="5" ry="14"/>
<ellipse class="leaf tint" cx="${570 - 16}" cy="${440 - 128 + 16}" rx="5" ry="13"/>
<path class="leaf" d="M44 400c-14-8-22-22-24-36M58 410c14-10 22-24 24-40"/>
<g class="dragonfly">
<path class="ink" d="M470 92l70-18"/><circle class="ink" cx="543" cy="73" r="4"/>
<ellipse class="water" cx="508" cy="70" rx="20" ry="7" transform="rotate(-38 508 70)"/><ellipse class="water" cx="512" cy="96" rx="20" ry="7" transform="rotate(32 512 96)"/>
<ellipse class="water" cx="494" cy="76" rx="16" ry="5.5" transform="rotate(-24 494 76)"/><ellipse class="water" cx="497" cy="94" rx="16" ry="5.5" transform="rotate(20 497 94)"/>
</g>
<circle class="water" cx="150" cy="96" r="4"/><circle class="water" cx="168" cy="72" r="2.6"/><circle class="water" cx="138" cy="66" r="2"/>
</g>
<svg x="100" y="128" width="400" height="300" viewBox="0 0 400 300">${mascotInner(mascot)}</svg>
</svg>`
}

/** The 2 to 3 metamorphosis: four stages, each its own drawing. */
export const METAMORPHOSIS = [
  [
    'Spawn',
    'A Vue 2 app',
    `<path class="leaf tint" d="${padPath(100, 112, 70, 20, -18, 30)}"/>
${[
  [78, 82, 13],
  [104, 74, 14],
  [128, 86, 12],
  [92, 100, 12],
  [118, 102, 11],
  [64, 98, 9],
  [140, 104, 8],
]
  .map(([cx, cy, r]) => `<circle class="ink fill-bg" cx="${cx}" cy="${cy}" r="${r}"/><circle class="leaf-dot" cx="${cx + 2}" cy="${cy - 1}" r="${r * 0.32}"/>`)
  .join('')}
<text x="100" y="44" text-anchor="middle" class="art-label">2</text>`,
  ],
  [
    'Tadpole',
    'Measured and planned',
    `<path class="water" d="M24 126h152M44 136h112"/>
<ellipse class="ink tint" cx="80" cy="86" rx="24" ry="19"/><circle class="leaf-dot" cx="70" cy="80" r="3.6"/>
<path class="ink" d="M103 82c14-9 24 8 38-2s20 6 34-4"/><path class="ink" d="M103 92c14 3 26-4 40 2s20 0 30-6"/>
<path class="water" d="M38 58c4-6 10-6 14 0M150 50c3-4 8-4 11 0"/>`,
  ],
  [
    'Froglet',
    'Running on @vue/compat',
    `<path class="leaf tint" d="${padPath(100, 118, 64, 16, 200, 30)}"/>
<ellipse class="ink tint" cx="98" cy="82" rx="30" ry="22"/><circle class="ink fill-bg" cx="82" cy="60" r="9"/><circle class="ink fill-bg" cx="112" cy="60" r="9"/>
<circle class="leaf-dot" cx="84" cy="61" r="3.4"/><circle class="leaf-dot" cx="114" cy="61" r="3.4"/>
<path class="ink" d="M70 94c-10 4-14 12-10 20h10M126 94c10 4 14 12 10 20h-10"/><path class="ink" d="M127 76c16-2 26 6 38 0"/><path class="ink" d="M88 88c6 4 14 4 20 0"/>`,
  ],
  [
    'Frog',
    'Pure Vue 3',
    `<path class="leaf tint" d="${padPath(100, 116, 74, 20, -20, 30)}"/>
<ellipse class="ink tint" cx="100" cy="84" rx="38" ry="26"/><circle class="ink fill-bg" cx="80" cy="58" r="11"/><circle class="ink fill-bg" cx="120" cy="58" r="11"/>
<circle class="leaf-dot" cx="82" cy="59" r="4.2"/><circle class="leaf-dot" cx="122" cy="59" r="4.2"/>
<path class="ink" d="M84 90c10 7 22 7 32 0"/><path class="ink" d="M64 100c-10 6-12 12-4 14h14M136 100c10 6 12 12 4 14h-14"/>
<text x="164" y="44" text-anchor="middle" class="art-label">3</text>`,
  ],
]

export const metamorphosisArt = (body, label) => `${svgOpen('0 0 200 150', 'meta-art', null, label)}<g stroke-width="2.4">${body}</g></svg>`

/** A wide divider: a water line with ripples and a few pads. */
export const rippleDivider = () =>
  `${svgOpen('0 0 1200 48', 'ripple-divider')}<g stroke-width="2">
<path class="water" d="M0 30c60 0 60-8 120-8s60 8 120 8 60-8 120-8 60 8 120 8 60-8 120-8 60 8 120 8 60-8 120-8 60 8 120 8 60-8 120-8 60 8 120 8"/>
<path class="leaf tint" d="${padPath(300, 26, 26, 8, -20, 32)}"/><path class="leaf tint" d="${padPath(860, 26, 20, 6.5, 200, 32)}"/>
<ellipse class="water" cx="600" cy="27" rx="34" ry="8" stroke-dasharray="2 7"/><ellipse class="water" cx="600" cy="27" rx="16" ry="4"/>
</g></svg>`

/** 404: Hop missed the lily pad, only the eyes are above the water. */
export const splashArt = () =>
  `${svgOpen('0 0 420 260', 'splash-art', null, 'Hop the frog missed the lily pad and splashed into the pond, only the eyes are above the water')}<g stroke-width="2.4">
<ellipse class="water" cx="190" cy="176" rx="150" ry="34" stroke-dasharray="2 9"/><ellipse class="water" cx="190" cy="176" rx="104" ry="23"/><ellipse class="water" cx="190" cy="176" rx="60" ry="13"/>
<path class="fill-bg" stroke="none" d="M150 176h80v30h-80z"/>
<circle class="ink tint" cx="172" cy="160" r="15"/><circle class="ink tint" cx="208" cy="160" r="15"/>
<circle class="ink fill-bg" cx="172" cy="160" r="8"/><circle class="ink fill-bg" cx="208" cy="160" r="8"/><circle class="leaf-dot" cx="174" cy="161" r="3.4"/><circle class="leaf-dot" cx="210" cy="161" r="3.4"/>
<path class="water" d="M130 176h120"/>
<path class="water" d="M140 120l-12-18M160 108l-4-20M222 108l6-20M242 120l14-16"/>
<path class="leaf tint" d="${padPath(352, 196, 46, 14, 200, 32)}"/><text x="352" y="204" text-anchor="middle" class="art-label sm">3</text>
<path class="water" d="M24 236h372M80 248h260"/>
</g></svg>`

// Interface icons, 24 x 24 line icons in the same hand.
const UI = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/>',
  system: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  reset: '<path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.6"/><path d="M4 4v4.6h4.6"/>',
  file: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
}
export const ui = (name, size = 18) =>
  `<svg class="ui-icon" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${UI[name]}</svg>`

export const BRAND = {
  github:
    '<svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>',
  linkedin:
    '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
  npm: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M1 7h22v9H12v1.6H7.2V16H1V7Zm1.3 1.3v6.4h3.2V9.9h1.6v4.8h1.6V8.3H2.3Zm8 0v8h3.2v-1.6h3.2V8.3h-6.4Zm3.2 1.6h1.6v3.2h-1.6V9.9Zm4.8-1.6v6.4h3.2V9.9h1.6v4.8h1.6V8.3h-6.4Z"/></svg>',
}
