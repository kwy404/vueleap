// Small pieces shared by build-docs.mjs and highlight-docs.mjs: VS Code style
// file icons for editor tabs and the copy button (Voodoo.js v-copy-from).

const label = (text, bg, fg = '#ffffff', size = 7.2) =>
  `<svg class="file-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><rect width="16" height="16" rx="3" fill="${bg}"/><text x="8" y="11.2" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="${size}" font-weight="700" fill="${fg}">${text}</text></svg>`

const ICONS = {
  vue: '<svg class="file-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path fill="#41b883" d="M9.8 1.5H13L8 10.1 3 1.5h3.2L8 4.6z"/><path fill="#41b883" d="M0 1.5h3l5 8.6 5-8.6h3L8 15z"/><path fill="#35495e" d="M3 1.5h3.2L8 4.6l1.8-3.1H13L8 10.1z"/></svg>',
  js: label('JS', '#f1dd35', '#1e1e1e'),
  ts: label('TS', '#3178c6'),
  json: label('{ }', '#cbcb41', '#1e1e1e', 6.4),
  html: label('&lt;/&gt;', '#e44d26', '#ffffff', 6),
  yaml: label('YML', '#a074c4', '#ffffff', 5.4),
  css: label('#', '#42a5f5'),
  terminal:
    '<svg class="file-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><rect x=".5" y="1.5" width="15" height="13" rx="2.5" fill="none" stroke="currentColor"/><path d="m4 5.5 2.5 2.5L4 10.5M8 10.5h4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
}

/** Icon for a file name such as "vite.config.js", or for a language or "terminal". */
export function fileIcon(name) {
  if (ICONS[name]) return ICONS[name]
  const ext = /\.(\w+)$/.exec(name)?.[1] ?? ''
  const key = { mjs: 'js', cjs: 'js', jsx: 'js', mts: 'ts', tsx: 'ts', yml: 'yaml' }[ext] ?? ext
  return ICONS[key] ?? ICONS.js
}

export const copyButton = (id, title) =>
  `<button type="button" class="code-copy" v-cloak v-copy-from="#${id}" v-copy-label="Copied" aria-label="Copy ${title}">` +
  `<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M4 4V1.5A1.5 1.5 0 0 1 5.5 0h7A1.5 1.5 0 0 1 14 1.5v9a1.5 1.5 0 0 1-1.5 1.5H10v2.5A1.5 1.5 0 0 1 8.5 16h-7A1.5 1.5 0 0 1 0 14.5v-9A1.5 1.5 0 0 1 1.5 4H4Zm1.5 0h3A1.5 1.5 0 0 1 10 5.5v5h2.5V1.5h-7V4Zm-4 1.5v9h7v-9h-7Z"/></svg><span>Copy</span></button>`
