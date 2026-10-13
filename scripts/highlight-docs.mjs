// Pre-renders syntax highlighting for every code example in docs/*.html with
// Shiki, using the VS Code "Light+" and "Dark+" themes as dual themes, and
// wraps each block in a VS Code style window: title bar with window dots, a tab
// with the file icon and name, line numbers and a copy button. Shell blocks get
// a VS Code style integrated terminal frame instead.
//
// Idempotent: only plain blocks written by scripts/build-docs.mjs, shaped as
// <pre data-title="..."><code class="language-x">...</code></pre>, are
// transformed. Running it twice changes nothing.
//
// A block written with data-frame="bare" and data-id="..." is highlighted
// without a frame, because build-docs.mjs already wrapped it in a custom one
// (the package manager tabs and the tabbed editor showcase).
//
//   node scripts/highlight-docs.mjs
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHighlighter } from 'shiki'
import { copyButton, fileIcon } from './frame-parts.mjs'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const docs = path.join(root, 'docs')
const LANGS = ['bash', 'js', 'ts', 'vue', 'html', 'yaml', 'json', 'css']
const BLOCK = /<pre data-title="([^"]*)"(?: data-frame="(\w+)")?(?: data-id="([\w-]+)")?><code class="language-([\w-]+)">([\s\S]*?)<\/code><\/pre>/g

const unescapeHtml = (s) =>
  s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&')

const highlighter = await createHighlighter({ themes: ['light-plus', 'dark-plus'], langs: LANGS })

/** Marks shell lines that are commands (not comments, not blank) so CSS can draw a prompt. */
const promptLines = (source) => ({
  line(node, line) {
    const text = source.split('\n')[line - 1] ?? ''
    if (text.trim() && !text.trim().startsWith('#')) this.addClassToHast(node, 'cmd')
  },
})

function highlight(source, lang, id, label) {
  const shell = lang === 'bash'
  return highlighter
    .codeToHtml(source, {
      lang: LANGS.includes(lang) ? lang : 'text',
      themes: { light: 'light-plus', dark: 'dark-plus' },
      defaultColor: false,
      transformers: shell ? [promptLines(source)] : [],
    })
    .replace('<pre class="shiki', `<pre id="${id}" class="${shell ? 'term ' : 'numbered '}shiki`)
    .replace(' tabindex="0"', ` tabindex="0" aria-label="${label}"`)
}

let total = 0
for (const name of (await fs.readdir(docs)).sort()) {
  if (!name.endsWith('.html') || name === 'report-example.html') continue
  const file = path.join(docs, name)
  const html = await fs.readFile(file, 'utf8')
  let counter = 0
  const output = html.replace(BLOCK, (_match, title, frame, givenId, lang, body) => {
    counter++
    const id = givenId || `code-${counter}`
    const pre = highlight(unescapeHtml(body), lang, id, `${title} code`)
    if (frame === 'bare') return pre
    if (lang === 'bash') {
      return (
        `<figure class="window terminal" data-lang="bash">` +
        `<div class="window-bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>` +
        `<span class="panel-tab">Terminal</span><span class="panel-shell">${fileIcon('terminal')}<span>${title === 'Terminal' ? 'bash' : title}</span></span>` +
        `${copyButton(id, 'command')}</div>${pre}</figure>`
      )
    }
    return (
      `<figure class="window editor" data-lang="${lang}">` +
      `<div class="window-bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>` +
      `<span class="tab active">${fileIcon(title)}<span>${title}</span></span>${copyButton(id, `${title} code`)}</div>` +
      `${pre}</figure>`
    )
  })
  if (output !== html) {
    await fs.writeFile(file, output)
    total += counter
  }
}
highlighter.dispose()
console.log(`highlighted ${total} code blocks`)
