import path from 'node:path'
import { compatSnippet } from '../compat.js'
import { RULES_BY_ID } from '../rules.js'
import type { AnalysisResult, Finding } from '../types.js'
import { FAVICON_SVG, MASCOT_SVG } from './mascot.js'

export interface HtmlOptions {
  /** Title shown in the header, defaults to the project folder name. */
  projectName?: string
  /** Timestamp printed in the header (defaults to now). */
  generatedAt?: Date
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

/** Escapes text and turns `code` spans into <code> elements. */
function richText(value: string): string {
  return escapeHtml(value).replace(/`([^`]+)`/g, '<code>$1</code>')
}

const SEVERITY_LABEL = { error: 'Error', warning: 'Warning', info: 'Info' } as const

const STYLE = `
:root{--bg:#f7f9f8;--panel:#ffffff;--text:#1d2b36;--muted:#5b6b78;--border:#dfe6e3;--accent:#2c8c63;--accent-soft:#e3f5ec;--code:#eef3f1;--error:#c9373d;--error-soft:#fdecec;--warning:#9a6b00;--warning-soft:#fff4d6;--info:#2563c9;--info-soft:#e8f0fd;--shadow:0 1px 2px rgba(16,24,40,.06),0 1px 3px rgba(16,24,40,.08)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0f1417;--panel:#161d22;--text:#e4ebe8;--muted:#9aa9b3;--border:#26323a;--accent:#42b883;--accent-soft:#16352a;--code:#1d262c;--error:#ff6b6b;--error-soft:#3a1d20;--warning:#f2c14e;--warning-soft:#3a2f12;--info:#7aa7ff;--info-soft:#1a2740;--shadow:none}}
:root[data-theme="dark"]{--bg:#0f1417;--panel:#161d22;--text:#e4ebe8;--muted:#9aa9b3;--border:#26323a;--accent:#42b883;--accent-soft:#16352a;--code:#1d262c;--error:#ff6b6b;--error-soft:#3a1d20;--warning:#f2c14e;--warning-soft:#3a2f12;--info:#7aa7ff;--info-soft:#1a2740;--shadow:none}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--text);font:15px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
a{color:var(--accent)}
code,pre{font-family:ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace;font-size:13px}
code{background:var(--code);padding:1px 5px;border-radius:4px}
.wrap{max-width:1080px;margin:0 auto;padding:0 20px}
header.top{border-bottom:1px solid var(--border);background:var(--panel)}
header.top .wrap{display:flex;align-items:center;gap:18px;padding-top:18px;padding-bottom:18px}
header.top svg{width:96px;height:72px;flex:none}
.brand h1{margin:0;font-size:22px;letter-spacing:-.01em}
.brand p{margin:2px 0 0;color:var(--muted);font-size:14px}
.spacer{flex:1}
button,select,input{font:inherit;color:inherit}
.btn{border:1px solid var(--border);background:var(--panel);border-radius:8px;padding:6px 12px;cursor:pointer}
.btn:hover{border-color:var(--accent)}
.btn:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin:24px 0}
.card{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:14px 16px;box-shadow:var(--shadow)}
.card .n{font-size:28px;font-weight:700;line-height:1.1}
.card .l{color:var(--muted);font-size:13px;margin-top:4px}
.card.error .n{color:var(--error)}.card.warning .n{color:var(--warning)}.card.info .n{color:var(--info)}.card.fix .n{color:var(--accent)}
h2{font-size:18px;margin:28px 0 10px}
.panel{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:16px;box-shadow:var(--shadow)}
.compat pre{margin:0;overflow:auto;background:var(--code);padding:14px;border-radius:8px;max-height:240px}
pre code{padding:0;background:none}
.compat .row{display:flex;align-items:center;gap:12px;margin-bottom:10px;flex-wrap:wrap}
.compat .row p{margin:0;color:var(--muted);flex:1;min-width:220px}
.filters{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:8px 0 14px;position:sticky;top:0;background:var(--bg);padding:10px 0;z-index:2}
.filters input[type=search]{flex:1;min-width:200px;border:1px solid var(--border);background:var(--panel);border-radius:8px;padding:7px 10px}
.filters select{border:1px solid var(--border);background:var(--panel);border-radius:8px;padding:7px 10px;max-width:100%}
.chip{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--border);background:var(--panel);border-radius:999px;padding:5px 12px;cursor:pointer;user-select:none;font-size:14px}
.chip input{accent-color:var(--accent);margin:0}
.count{color:var(--muted);font-size:14px}
details.rule{background:var(--panel);border:1px solid var(--border);border-radius:12px;margin:0 0 12px;box-shadow:var(--shadow);overflow:hidden}
details.rule>summary{list-style:none;cursor:pointer;padding:12px 16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
details.rule>summary::-webkit-details-marker{display:none}
details.rule>summary::before{content:"";width:8px;height:8px;border-right:2px solid var(--muted);border-bottom:2px solid var(--muted);transform:rotate(-45deg);transition:transform .15s;flex:none}
details.rule[open]>summary::before{transform:rotate(45deg)}
.badge{display:inline-block;font-size:12px;font-weight:600;border-radius:999px;padding:2px 9px;text-transform:uppercase;letter-spacing:.03em}
.badge.error{background:var(--error-soft);color:var(--error)}.badge.warning{background:var(--warning-soft);color:var(--warning)}.badge.info{background:var(--info-soft);color:var(--info)}
.badge.fix{background:var(--accent-soft);color:var(--accent)}
.rid{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-weight:600;font-size:14px}
.rtitle{font-weight:600}
.rcount{color:var(--muted);margin-left:auto}
.rbody{padding:0 16px 14px;border-top:1px solid var(--border)}
.rbody .desc{margin:12px 0 6px}
.meta{display:flex;flex-wrap:wrap;gap:8px 16px;font-size:13px;color:var(--muted);margin-bottom:8px}
.flag{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px;background:var(--code);border-radius:4px;padding:1px 6px;color:var(--text)}
ul.findings{list-style:none;margin:0;padding:0}
li.finding{padding:10px 0;border-top:1px dashed var(--border)}
li.finding:first-child{border-top:0}
.loc{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;color:var(--accent);word-break:break-all}
.msg{margin:2px 0 4px}
pre.snippet{margin:0;background:var(--code);padding:6px 10px;border-radius:6px;overflow:auto;white-space:pre}
.empty{padding:24px;text-align:center;color:var(--muted)}
.warnings li{margin:4px 0}
footer{color:var(--muted);font-size:13px;padding:30px 0 40px;text-align:center}
[hidden]{display:none!important}
@media (max-width:600px){header.top svg{width:64px;height:48px}.brand h1{font-size:18px}.rcount{margin-left:0}}
`

const SCRIPT = `
(function(){
  var root=document.documentElement,btn=document.getElementById('theme');
  var order=['auto','light','dark'];
  function apply(t){if(t==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',t)}btn.textContent='Theme: '+t;}
  var saved='auto';try{saved=localStorage.getItem('vueleap-theme')||'auto'}catch(e){}
  apply(saved);
  btn.addEventListener('click',function(){var cur=root.getAttribute('data-theme')||'auto';var next=order[(order.indexOf(cur)+1)%3];apply(next);try{localStorage.setItem('vueleap-theme',next)}catch(e){}});
  var q=document.getElementById('q'),rule=document.getElementById('rule'),fixOnly=document.getElementById('fixable'),count=document.getElementById('count'),empty=document.getElementById('empty');
  var sev=[].slice.call(document.querySelectorAll('input[name=sev]'));
  var groups=[].slice.call(document.querySelectorAll('details.rule'));
  var total=document.querySelectorAll('li.finding').length;
  function update(){
    var text=q.value.trim().toLowerCase(),r=rule.value,shown=0,on={};
    sev.forEach(function(s){on[s.value]=s.checked});
    groups.forEach(function(g){
      var visible=0;
      var okGroup=on[g.dataset.severity]&&(!r||g.dataset.rule===r);
      [].slice.call(g.querySelectorAll('li.finding')).forEach(function(li){
        var ok=okGroup&&(!fixOnly.checked||li.dataset.fixable==='1')&&(!text||li.dataset.search.indexOf(text)!==-1||g.dataset.rule.indexOf(text)!==-1);
        li.hidden=!ok;if(ok)visible++;
      });
      g.hidden=visible===0;shown+=visible;
    });
    count.textContent='Showing '+shown+' of '+total+' findings';
    empty.hidden=shown!==0;
  }
  [q,rule,fixOnly].concat(sev).forEach(function(el){el.addEventListener('input',update);el.addEventListener('change',update)});
  update();
  var copy=document.getElementById('copy');
  if(copy){copy.addEventListener('click',function(){var t=document.getElementById('compat-code').textContent;if(navigator.clipboard){navigator.clipboard.writeText(t).then(function(){copy.textContent='Copied';setTimeout(function(){copy.textContent='Copy'},1500)})}});}
  document.getElementById('expand').addEventListener('click',function(){var open=groups.some(function(g){return !g.open});groups.forEach(function(g){g.open=open});this.textContent=open?'Collapse all':'Expand all'});
})();
`

function findingItem(finding: Finding): string {
  const where = `${finding.file}:${finding.line}:${finding.column}`
  const search = `${where} ${finding.message} ${finding.snippet}`.toLowerCase()
  return `<li class="finding" data-fixable="${finding.fixable ? 1 : 0}" data-search="${escapeHtml(search)}">
<div class="loc">${escapeHtml(where)}${finding.fixable ? ' <span class="badge fix">auto fix</span>' : ''}</div>
<div class="msg">${richText(finding.message)}</div>
${finding.snippet ? `<pre class="snippet"><code>${escapeHtml(finding.snippet)}</code></pre>` : ''}
</li>`
}

/** Renders a standalone HTML report (embedded CSS and JS, light and dark themes, filters). */
export function formatHtml(result: AnalysisResult, options: HtmlOptions = {}): string {
  const project = options.projectName ?? path.basename(result.projectDir)
  const generated = (options.generatedAt ?? new Date()).toISOString().slice(0, 16).replace('T', ' ')
  const { summary } = result
  const byRule = new Map<string, Finding[]>()
  for (const finding of result.findings) {
    const list = byRule.get(finding.ruleId) ?? []
    list.push(finding)
    byRule.set(finding.ruleId, list)
  }

  const groups = summary.byRule
    .map((entry) => {
      const rule = RULES_BY_ID.get(entry.ruleId)
      const findings = byRule.get(entry.ruleId) ?? []
      const flags = [...new Set(findings.flatMap((f) => f.compatFlags))].sort()
      return `<details class="rule" open data-rule="${escapeHtml(entry.ruleId)}" data-severity="${entry.severity}">
<summary><span class="badge ${entry.severity}">${SEVERITY_LABEL[entry.severity]}</span><span class="rid">${escapeHtml(entry.ruleId)}</span><span class="rtitle">${escapeHtml(entry.title)}</span>${entry.fixable > 0 ? `<span class="badge fix">${entry.fixable} auto fixable</span>` : ''}<span class="rcount">${entry.count}</span></summary>
<div class="rbody">
<p class="desc">${richText(rule?.description ?? '')}</p>
<div class="meta"><a href="${escapeHtml(entry.docs)}" target="_blank" rel="noopener">Migration guide</a>${flags.length > 0 ? `<span>@vue/compat: ${flags.map((f) => `<span class="flag">${escapeHtml(f)}</span>`).join(' ')}</span>` : ''}</div>
<ul class="findings">
${findings.map(findingItem).join('\n')}
</ul>
</div>
</details>`
    })
    .join('\n')

  const ruleOptions = summary.byRule
    .map((entry) => `<option value="${escapeHtml(entry.ruleId)}">${escapeHtml(entry.ruleId)} (${entry.count})</option>`)
    .join('')

  const hasCompat = result.compat.runtime.length > 0 || result.compat.compiler.length > 0
  const warnings =
    result.warnings.length > 0
      ? `<h2>Skipped or partially analyzed</h2><div class="panel warnings"><ul>${result.warnings
          .map((w) => `<li><span class="loc">${escapeHtml(w.file)}</span> ${richText(w.message)}</li>`)
          .join('')}</ul></div>`
      : ''

  const favicon = `data:image/svg+xml,${encodeURIComponent(FAVICON_SVG)}`

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="generator" content="${escapeHtml(result.tool.name)} ${escapeHtml(result.tool.version)}">
<title>Vue 3 migration report: ${escapeHtml(project)}</title>
<meta name="description" content="Vue 2 to Vue 3 migration report for ${escapeHtml(project)}: ${summary.total} findings (${summary.error} errors, ${summary.warning} warnings, ${summary.info} info), ${summary.fixable} auto fixable, generated by vueleap.">
<link rel="icon" type="image/svg+xml" href="${favicon}">
<style>${STYLE}</style>
</head>
<body>
<header class="top"><div class="wrap">
${MASCOT_SVG}
<div class="brand"><h1>Vue 3 migration report</h1><p><strong>${escapeHtml(project)}</strong> &middot; ${summary.filesScanned} files scanned &middot; ${escapeHtml(generated)} UTC &middot; ${escapeHtml(result.tool.name)} ${escapeHtml(result.tool.version)}</p></div>
<div class="spacer"></div>
<button class="btn" id="theme" type="button">Theme: auto</button>
</div></header>
<main class="wrap">
<section class="cards" aria-label="Summary">
<div class="card error"><div class="n">${summary.error}</div><div class="l">Errors</div></div>
<div class="card warning"><div class="n">${summary.warning}</div><div class="l">Warnings</div></div>
<div class="card info"><div class="n">${summary.info}</div><div class="l">Info</div></div>
<div class="card fix"><div class="n">${summary.fixable}</div><div class="l">Auto fixable</div></div>
<div class="card"><div class="n">${summary.filesWithFindings}</div><div class="l">Files affected</div></div>
<div class="card"><div class="n">${result.effort.score}</div><div class="l">Effort score (${escapeHtml(result.effort.level)})</div></div>
</section>
${
  hasCompat
    ? `<section class="compat"><h2>Minimal @vue/compat configuration</h2><div class="panel"><div class="row"><p>Run Vue 3 by default and keep only the Vue 2 behaviors this project still relies on. Remove each flag as you fix the matching findings.</p><button class="btn" id="copy" type="button">Copy</button></div><pre><code id="compat-code">${escapeHtml(compatSnippet(result.compat))}</code></pre></div></section>`
    : ''
}
<h2>Findings</h2>
<div class="filters" role="search">
<input type="search" id="q" placeholder="Filter by file, message or rule" aria-label="Filter findings">
<label class="chip"><input type="checkbox" name="sev" value="error" checked> Errors</label>
<label class="chip"><input type="checkbox" name="sev" value="warning" checked> Warnings</label>
<label class="chip"><input type="checkbox" name="sev" value="info" checked> Info</label>
<label class="chip"><input type="checkbox" id="fixable"> Auto fixable only</label>
<select id="rule" aria-label="Filter by rule"><option value="">All rules</option>${ruleOptions}</select>
<button class="btn" id="expand" type="button">Collapse all</button>
<span class="count" id="count" aria-live="polite"></span>
</div>
<section id="rules">
${groups}
<div class="empty" id="empty" hidden>${summary.total === 0 ? 'No Vue 3 breaking changes found.' : 'No findings match the current filters.'}</div>
</section>
${warnings}
</main>
<footer>Generated by <a href="https://github.com/kwy404/vueleap">vueleap</a>, the Vue 2 to Vue 3 migration checker. Each finding links to the official migration guide.</footer>
<script>${SCRIPT}</script>
</body>
</html>
`
}
