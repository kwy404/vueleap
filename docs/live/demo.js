// vueleap live demo: paste Vue 2 on the left, read Vue 3 on the right.
// The examples come with results computed at build time, so they show up at
// once. Editing loads ./engine.js, the real analyzer and codemods bundled for
// the browser, and everything then runs locally. Nothing is uploaded.
import { findingMarks, gutter, kindOf, render, reportHtml, slim } from './view.js'

const root = document.querySelector('[data-live]')
if (root) init(root)

function detect(code) {
  if (/<(template|script|style)[\s>]/i.test(code)) return 'Component.vue'
  const scripty = /\b(import|export|function|const|let|var|new|return)\b|=>/.test(code)
  if (!scripty && /^[\s\S]*?[^{};]+\{[^{}]*:[^{}]*\}/.test(code)) return 'styles.css'
  if (/\binterface\s+\w+|\btype\s+\w+\s*=|:\s*(string|number|boolean|void)\b/.test(code)) return 'script.ts'
  return 'script.js'
}

function init(root) {
  const $ = (sel) => root.querySelector(sel)
  const data = JSON.parse(document.getElementById('live-data').textContent)
  const examples = data.examples
  const input = $('[data-input]')
  const hlIn = $('[data-hl-in]')
  const gutIn = $('[data-gut-in]')
  const hlOut = $('[data-hl-out]')
  const gutOut = $('[data-gut-out]')
  const flash = $('[data-flash]')
  const nameIn = $('[data-name-in]')
  const nameOut = $('[data-name-out]')
  const iconIn = $('[data-icon-in]')
  const iconOut = $('[data-icon-out]')
  const report = $('[data-report]')
  const status = $('[data-status]')
  const hop = $('[data-hop]')
  const copy = $('[data-copy]')
  const exButtons = Array.prototype.slice.call(root.querySelectorAll('[data-ex]'))
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

  let filename = examples[0].filename
  let last = examples[0].result
  let engine = null
  let loading = null
  let timer = 0
  let run = 0

  const setStatus = (text, state) => {
    status.textContent = text
    status.dataset.state = state
  }

  const paintInput = (code, findings) => {
    hlIn.innerHTML = render(code, kindOf(filename), findingMarks(code, findings))
    gutIn.textContent = gutter(code)
    syncIn()
  }

  const paintOutput = (result) => {
    const marks = result.changes.map((r) => ({ s: r.start, e: r.end, c: 'mk-new', t: 'Rewritten by vueleap' }))
    hlOut.innerHTML = render(result.code, kindOf(filename), marks.concat(findingMarks(result.code, result.remaining)))
    gutOut.textContent = gutter(result.code)
    report.innerHTML = reportHtml(result, !input.value.trim())
    nameIn.textContent = filename
    nameOut.textContent = filename
    const ext = (/\.(\w+)$/.exec(filename) || ['', 'js'])[1]
    const icon = data.icons[ext] || data.icons.js
    iconIn.innerHTML = icon
    iconOut.innerHTML = icon
  }

  const leap = () => {
    if (reduced.matches) return
    hop.classList.remove('is-leaping')
    void hop.offsetWidth
    hop.classList.add('is-leaping')
  }

  const show = (result, animate) => {
    last = result
    paintInput(input.value, result.input)
    paintOutput(result)
    if (animate && result.fixed.length) leap()
  }

  function syncIn() {
    hlIn.scrollTop = input.scrollTop
    hlIn.scrollLeft = input.scrollLeft
    gutIn.scrollTop = input.scrollTop
  }
  input.addEventListener('scroll', syncIn, { passive: true })
  hlOut.addEventListener('scroll', () => { gutOut.scrollTop = hlOut.scrollTop }, { passive: true })

  const loadEngine = () => {
    if (!loading) {
      setStatus('Loading vueleap into this page...', 'loading')
      loading = import('./engine.js').then(
        (mod) => {
          engine = mod
          setStatus('Running in your browser. Nothing is uploaded.', 'live')
          return mod
        },
        () => {
          loading = null
          setStatus('Could not load vueleap. Check the connection and edit again.', 'error')
        },
      )
    }
    return loading
  }

  const convert = async () => {
    const id = ++run
    const code = input.value
    if (!code.trim()) {
      show({ filename, code: '', changes: [], fixed: [], remaining: [], compat: { runtime: [], compiler: [] }, warnings: [], input: [] }, false)
      return
    }
    const mod = engine || (await loadEngine())
    if (!mod || id !== run) return
    try {
      const options = { filename }
      const result = mod.fixSource(code, options)
      show(slim(result, mod.analyzeSource(code, options).findings), true)
    } catch (error) {
      setStatus(`vueleap stopped on this code: ${error.message}`, 'error')
    }
  }

  input.addEventListener('input', () => {
    exButtons.forEach((b) => b.setAttribute('aria-pressed', 'false'))
    const guess = detect(input.value)
    if (kindOf(guess) !== kindOf(filename)) filename = guess
    // Repaint the text at once so the colors never lag behind the caret.
    paintInput(input.value, [])
    clearTimeout(timer)
    timer = setTimeout(convert, 160)
  })
  input.addEventListener('focus', loadEngine, { once: true })

  exButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const example = examples[Number(button.dataset.ex)]
      exButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)))
      filename = example.filename
      input.value = example.code
      input.scrollTop = 0
      hlOut.scrollTop = 0
      run++
      show(example.result, true)
    })
  })

  $('[data-clear]').addEventListener('click', () => {
    input.value = ''
    exButtons.forEach((b) => b.setAttribute('aria-pressed', 'false'))
    run++
    show({ filename, code: '', changes: [], fixed: [], remaining: [], compat: { runtime: [], compiler: [] }, warnings: [], input: [] }, false)
    input.focus()
  })

  copy.addEventListener('click', () => {
    const label = copy.querySelector('span')
    const done = (text) => {
      label.textContent = text
      setTimeout(() => { label.textContent = 'Copy' }, 1600)
    }
    if (navigator.clipboard) navigator.clipboard.writeText(last.code).then(() => done('Copied'), () => done('Press Ctrl+C'))
    else done('Press Ctrl+C')
  })

  // Jump from a finding to its line in the Vue 3 code.
  report.addEventListener('click', (event) => {
    const jump = event.target.closest('[data-line]')
    if (!jump) return
    const line = Number(jump.dataset.line)
    const style = getComputedStyle(hlOut)
    const height = parseFloat(style.lineHeight) || 22
    const top = parseFloat(style.paddingTop) + (line - 1) * height
    hlOut.scrollTo({ top: Math.max(0, top - hlOut.clientHeight / 3), behavior: reduced.matches ? 'auto' : 'smooth' })
    flash.style.setProperty('--y', `${top}px`)
    flash.style.setProperty('--h', `${height}px`)
    flash.classList.remove('is-on')
    void flash.offsetWidth
    flash.classList.add('is-on')
  })
  hlOut.addEventListener('scroll', () => { flash.style.setProperty('--s', `${hlOut.scrollTop}px`) }, { passive: true })

  // Load the engine when the page is idle, so the first edit is instant.
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1500))
  const saveData = navigator.connection && navigator.connection.saveData
  if (!saveData) window.addEventListener('load', () => idle(() => { if (!loading) loadEngine() }), { once: true })
  root.classList.add('is-ready')
}
