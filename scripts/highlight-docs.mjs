// Pre-renders syntax highlighting for every code example in docs/*.html with
// Shiki, using the VS Code "Light+" and "Dark+" themes as dual themes, and
// wraps each block in an editor style window (file name and copy button).
//
// Idempotent: only plain blocks written by scripts/build-docs.mjs, shaped as
// <pre data-title="..."><code class="language-x">...</code></pre>, are
// transformed. Running it twice changes nothing.
//
//   node scripts/highlight-docs.mjs
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHighlighter } from 'shiki'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const docs = path.join(root, 'docs')
const LANGS = ['bash', 'js', 'ts', 'vue', 'html', 'yaml', 'json', 'css']
const BLOCK = /<pre data-title="([^"]*)"><code class="language-([\w-]+)">([\s\S]*?)<\/code><\/pre>/g

const unescapeHtml = (s) =>
  s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&')

const highlighter = await createHighlighter({ themes: ['light-plus', 'dark-plus'], langs: LANGS })

let total = 0
for (const name of (await fs.readdir(docs)).sort()) {
  if (!name.endsWith('.html') || name === 'report-example.html') continue
  const file = path.join(docs, name)
  const html = await fs.readFile(file, 'utf8')
  let counter = 0
  const output = html.replace(BLOCK, (_match, title, lang, body) => {
    counter++
    const id = `code-${counter}`
    const highlighted = highlighter
      .codeToHtml(unescapeHtml(body), {
        lang: LANGS.includes(lang) ? lang : 'text',
        themes: { light: 'light-plus', dark: 'dark-plus' },
        defaultColor: false,
      })
      .replace('<pre class="shiki', `<pre id="${id}" class="shiki`)
    return (
      `<div class="code-window" data-lang="${lang}">` +
      `<div class="code-bar"><span class="code-dots" aria-hidden="true"></span><span class="code-file">${title}</span>` +
      `<button type="button" class="code-copy" v-cloak v-copy-from="#${id}" v-copy-label="Copied" aria-label="Copy ${title} code">Copy</button></div>` +
      `${highlighted}</div>`
    )
  })
  if (output !== html) {
    await fs.writeFile(file, output)
    total += counter
  }
}
highlighter.dispose()
console.log(`highlighted ${total} code blocks`)
