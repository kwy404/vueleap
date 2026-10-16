// vueleap live demo: turns code plus a list of marked ranges into highlighted
// HTML. Shared by the browser (docs/live/demo.js) and the site build, which
// uses it to render the first example into the static page.
//
// The output contains exactly the characters of the code, so a transparent
// textarea laid over it lines up character for character.

export const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Offsets where each line starts. */
export function lineStarts(text) {
  const starts = [0]
  for (let i = 0; i < text.length; i++) if (text.charCodeAt(i) === 10) starts.push(i + 1)
  return starts
}

const KEYWORDS =
  'import|export|default|from|as|const|let|var|function|return|if|else|new|this|true|false|null|undefined|for|of|in|while|class|extends|async|await|typeof|instanceof|delete|void|switch|case|break|continue|try|catch|finally|throw|interface|type|enum|implements|public|private|protected|readonly'
const JS = new RegExp(
  [
    '(\\/\\*[\\s\\S]*?(?:\\*\\/|$))', // 1 block comment
    '(\\/\\/[^\\n]*)', // 2 line comment
    '("(?:[^"\\\\\\n]|\\\\.)*"?|\'(?:[^\'\\\\\\n]|\\\\.)*\'?|`(?:[^`\\\\]|\\\\.)*`?)', // 3 string
    `(\\b(?:${KEYWORDS})\\b)`, // 4 keyword
    '(\\b\\d+(?:\\.\\d+)?\\b)', // 5 number
    '([A-Za-z_$][\\w$]*(?=\\s*\\())', // 6 call
    '(@[A-Za-z_]\\w*)', // 7 decorator
  ].join('|'),
  'g',
)
const JS_CLASSES = [null, 'tk-c', 'tk-c', 'tk-s', 'tk-k', 'tk-n', 'tk-f', 'tk-k']

const CSS = new RegExp(
  [
    '(\\/\\*[\\s\\S]*?(?:\\*\\/|$))', // 1 comment
    '("(?:[^"\\\\\\n]|\\\\.)*"?|\'(?:[^\'\\\\\\n]|\\\\.)*\'?)', // 2 string
    '(@[\\w-]+)', // 3 at rule
    '([\\w-]+(?=\\s*:[^;{}]*[;}]))', // 4 property
    '([.#][A-Za-z_-][\\w-]*)', // 5 class or id selector
    '(-?\\b\\d+(?:\\.\\d+)?(?:[a-z%]+)?)', // 6 number
  ].join('|'),
  'g',
)
const CSS_CLASSES = [null, 'tk-c', 'tk-s', 'tk-k', 'tk-a', 'tk-t', 'tk-n']

function scan(code, from, to, rx, classes, out) {
  rx.lastIndex = from
  let m
  while ((m = rx.exec(code)) && m.index < to) {
    if (m[0] === '') {
      rx.lastIndex++
      continue
    }
    const group = m.findIndex((g, i) => i > 0 && g !== undefined)
    out.push({ s: m.index, e: Math.min(m.index + m[0].length, to), c: classes[group] })
  }
}

/** Single file components: tags and attributes, plus script and style blocks. */
function scanVue(code, out) {
  const n = code.length
  let i = 0
  while (i < n) {
    const lt = code.indexOf('<', i)
    const mustache = code.indexOf('{{', i)
    if (mustache !== -1 && (lt === -1 || mustache < lt)) {
      const close = code.indexOf('}}', mustache + 2)
      const end = close === -1 ? n : close + 2
      out.push({ s: mustache, e: mustache + 2, c: 'tk-p' })
      scan(code, mustache + 2, close === -1 ? n : close, JS, JS_CLASSES, out)
      if (close !== -1) out.push({ s: close, e: end, c: 'tk-p' })
      i = end
      continue
    }
    if (lt === -1) break
    if (code.startsWith('<!--', lt)) {
      const close = code.indexOf('-->', lt + 4)
      const end = close === -1 ? n : close + 3
      out.push({ s: lt, e: end, c: 'tk-c' })
      i = end
      continue
    }
    const tag = /^<\/?([A-Za-z][\w-]*)/.exec(code.slice(lt, lt + 64))
    if (!tag) {
      i = lt + 1
      continue
    }
    out.push({ s: lt, e: lt + tag[0].length, c: 'tk-t' })
    // Attributes up to the closing >.
    const attr = /\s*(?:([@:#]?[A-Za-z_][\w.:\-[\]]*)(?:\s*=\s*("[^"]*"?|'[^']*'?|[^\s>]+))?|(\/?>))/y
    let j = lt + tag[0].length
    let closed = false
    while (j < n) {
      attr.lastIndex = j
      const m = attr.exec(code)
      if (!m || m[0] === '') break
      if (m[3]) {
        const at = attr.lastIndex - m[3].length
        out.push({ s: at, e: attr.lastIndex, c: 'tk-t' })
        j = attr.lastIndex
        closed = true
        break
      }
      const nameAt = m.index + m[0].indexOf(m[1])
      out.push({ s: nameAt, e: nameAt + m[1].length, c: 'tk-a' })
      if (m[2]) {
        const valueAt = attr.lastIndex - m[2].length
        const dynamic = /^[@:#]|^v-/.test(m[1])
        out.push({ s: valueAt, e: valueAt + 1, c: 'tk-s' })
        if (dynamic && m[2].length > 2) scan(code, valueAt + 1, attr.lastIndex - 1, JS, JS_CLASSES, out)
        else out.push({ s: valueAt + 1, e: Math.max(valueAt + 1, attr.lastIndex - 1), c: 'tk-s' })
        if (m[2].length > 1) out.push({ s: attr.lastIndex - 1, e: attr.lastIndex, c: 'tk-s' })
      }
      j = attr.lastIndex
    }
    i = Math.max(j, lt + 1)
    const name = tag[1].toLowerCase()
    if (closed && !tag[0].startsWith('</') && (name === 'script' || name === 'style')) {
      const close = code.toLowerCase().indexOf(`</${name}`, i)
      const end = close === -1 ? n : close
      scan(code, i, end, name === 'script' ? JS : CSS, name === 'script' ? JS_CLASSES : CSS_CLASSES, out)
      i = end
    }
  }
}

/** Syntax tokens for a file kind: 'vue', 'js' or 'css'. Tokens never overlap. */
export function tokenize(code, kind) {
  const out = []
  if (kind === 'vue') scanVue(code, out)
  else if (kind === 'css') scan(code, 0, code.length, CSS, CSS_CLASSES, out)
  else scan(code, 0, code.length, JS, JS_CLASSES, out)
  out.sort((a, b) => a.s - b.s)
  const clean = []
  let cursor = 0
  for (const t of out) {
    if (t.s < cursor || t.e <= t.s) continue
    clean.push(t)
    cursor = t.e
  }
  return clean
}

export const kindOf = (filename) => {
  const ext = (/\.[^./]+$/.exec(filename) || [''])[0].toLowerCase()
  if (ext === '.vue') return 'vue'
  if (/^\.(css|scss|sass|less|styl|stylus|pcss|postcss)$/.test(ext)) return 'css'
  return 'js'
}

/**
 * Highlighted HTML for `code`. `marks` are ranges [{ s, e, c, t }] drawn on top
 * of the syntax colors (class `c`, title `t`); an empty range becomes a caret.
 */
export function render(code, kind, marks = []) {
  const tokens = tokenize(code, kind)
  const points = new Set([0, code.length])
  for (const t of tokens) points.add(t.s).add(t.e)
  for (const m of marks) points.add(Math.min(m.s, code.length)).add(Math.min(m.e, code.length))
  const cuts = [...points].sort((a, b) => a - b)
  let html = ''
  let ti = 0
  for (let k = 0; k < cuts.length; k++) {
    const at = cuts[k]
    for (const m of marks) if (m.s === at && m.e === at) html += `<span class="mk-cut"${m.t ? ` title="${esc(m.t)}"` : ''}></span>`
    if (k === cuts.length - 1) break
    const end = cuts[k + 1]
    if (end === at) continue
    while (ti < tokens.length && tokens[ti].e <= at) ti++
    const token = tokens[ti] && tokens[ti].s <= at && tokens[ti].e >= end ? tokens[ti].c : ''
    const active = marks.filter((m) => m.s <= at && m.e >= end && m.e > m.s)
    const cls = [token, ...active.map((m) => m.c)].filter(Boolean).join(' ')
    const title = active.map((m) => m.t).filter(Boolean)[0]
    const text = esc(code.slice(at, end))
    html += cls ? `<span class="${cls}"${title ? ` title="${esc(title)}"` : ''}>${text}</span>` : text
  }
  // A trailing newline needs a character after it, or the last line collapses.
  return html + (code.endsWith('\n') || code === '' ? ' ' : '')
}

/** Line numbers for a gutter. */
export const gutter = (code) => Array.from({ length: lineStarts(code).length }, (_, i) => i + 1).join('\n')

/** Marks for findings, positioned in `code`. */
export function findingMarks(code, findings) {
  const starts = lineStarts(code)
  return findings.map((f) => {
    const s = (starts[f.line - 1] ?? 0) + f.column - 1
    let e = (starts[f.endLine - 1] ?? 0) + f.endColumn - 1
    if (e <= s) e = Math.min(code.length, s + 1)
    return { s, e, c: `mk-${f.severity}`, t: `${f.ruleId}: ${f.message}` }
  })
}

/** The parts of a fixSource result the page needs, positions included. */
export function slim(result, inputFindings) {
  const pick = (f) => ({ ruleId: f.ruleId, severity: f.severity, message: f.message, line: f.line, column: f.column, endLine: f.endLine, endColumn: f.endColumn, docs: f.docs })
  return {
    filename: result.filename,
    code: result.code,
    changes: result.changes,
    fixed: result.fixed.map(pick),
    remaining: result.remaining.map(pick),
    compat: result.compat,
    warnings: result.warnings.map((w) => w.message),
    input: inputFindings.map(pick),
  }
}

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`
const CHECK = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>'

/** The summary and the two lists under the editors. `empty` is true for blank input. */
export function reportHtml(data, empty = false) {
  if (empty) return '<p class="live-empty">Paste a Vue 2 component, a script or a stylesheet into the Vue 2 editor. The Vue 3 version shows up as you type.</p>'
  const flags = [...data.compat.runtime, ...data.compat.compiler]
  const fixed = data.fixed.length
  const left = data.remaining.length
  const sum = `<div class="live-sum">
<span class="sum-pill is-fixed"><b>${fixed}</b> rewritten</span>
<span class="sum-pill is-left"><b>${left}</b> left for you</span>
<span class="sum-pill"><b>${flags.length}</b> compat ${flags.length === 1 ? 'flag' : 'flags'}</span>
</div>`
  if (!fixed && !left) {
    const warn = data.warnings.length ? `<p class="live-warn">${esc(data.warnings[0])}</p>` : ''
    return `${sum}<p class="live-clean">${CHECK} Nothing to change. As far as vueleap can tell, this code already runs on Vue 3.</p>${warn}`
  }
  const fixedItems = data.fixed
    .map((f) => `<li class="li-fixed"><span class="li-ic">${CHECK}</span><span class="li-body"><span class="li-head"><code>${esc(f.ruleId)}</code><small>line ${f.line}</small></span><span class="li-msg">${esc(f.message)}</span></span></li>`)
    .join('')
  const leftItems = data.remaining
    .map(
      (f) =>
        `<li class="li-left"><span class="sev-dot sev-${f.severity}" aria-label="${f.severity}"></span><span class="li-body"><span class="li-head"><button type="button" class="li-jump" data-line="${f.line}"><code>${esc(f.ruleId)}</code><small>line ${f.line}</small></button><a class="li-doc" href="${esc(f.docs)}">Guide</a></span><span class="li-msg">${esc(f.message)}</span></span></li>`,
    )
    .join('')
  const flagLine = flags.length
    ? `<p class="live-flags"><span>Until those are done, <code>@vue/compat</code> keeps this file running with</span>${flags.map((f) => `<code class="flag">${f}</code>`).join('')}</p>`
    : ''
  return `${sum}<div class="live-lists">
<div class="live-col"><h3>${plural(fixed, 'change', 'changes')} rewritten for you</h3>${fixed ? `<ul class="live-list">${fixedItems}</ul>` : '<p class="live-none">Nothing in this file is a pure rename, so nothing was rewritten.</p>'}</div>
<div class="live-col"><h3>${plural(left, 'change', 'changes')} left for you</h3>${left ? `<ul class="live-list">${leftItems}</ul>` : '<p class="live-none">Nothing left. This file is ready for Vue 3.</p>'}</div>
</div>${flagLine}`
}
