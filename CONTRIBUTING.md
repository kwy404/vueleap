# Contributing to vueleap

Thanks for helping people migrate from Vue 2 to Vue 3. Bug reports with a small
code sample are just as valuable as pull requests.

## Setup

```bash
git clone https://github.com/kwy404/vueleap.git
cd vueleap
npm install
npm run build
npm test
```

Useful scripts:

| Script | What it does |
| --- | --- |
| `npm run build` | Compiles `src/` to `dist/` with `tsc` |
| `npm run typecheck` | Type checks sources and tests |
| `npm run lint` | Runs ESLint |
| `npm test` | Runs the Vitest suite |
| `npm run test:update` | Updates snapshots after an intended change |

Try your changes on the fixture app:

```bash
npm run build
node dist/bin.js test/fixtures/vue2-app
node dist/bin.js test/fixtures/vue2-app --fix
```

## How the analyzer works

```
src/
  analyze.ts         walks the project, dispatches files, builds the summary
  files.ts           file discovery (.gitignore aware, skips node_modules and dist)
  rules.ts           the rule registry: id, severity, docs link, compat flags
  context.ts         FileContext: positions, snippets and the report() helper
  scan/template.ts   template AST checks (@vue/compiler-dom)
  scan/script.ts     JavaScript and TypeScript checks (@babel/parser)
  scan/style.ts      CSS transition class checks
  scan/package.ts    dependency checks
  scan/sfc.ts        splits .vue files into blocks (@vue/compiler-sfc)
  fix.ts             applies the edits attached to fixable findings
  compat.ts          builds the @vue/compat configuration
  report/            pretty, JSON and HTML output
```

Every check calls `ctx.report(ruleId, start, end, message, options)` with
absolute character offsets in the file. Positions, snippets and the summary are
derived from that call.

## Adding a rule

1. **Register it** in `src/rules.ts`. Pick a short kebab-case `id`, a severity
   (`error` breaks at runtime or compile time, `warning` changes behavior,
   `info` needs a review), the migration guide link, the related
   `@vue/compat` flags (they must exist in `DeprecationTypes` or
   `CompilerDeprecationTypes`, a test checks this), an `effort` weight and a
   one or two sentence `description`.
2. **Detect it** in the right scanner. Template checks live in
   `scan/template.ts`, script checks in `scan/script.ts` (the `enter` switch is
   the entry point), style checks in `scan/style.ts`. Report on the smallest
   meaningful range, usually the property name or the attribute.
3. **Write a clear message.** Say what changed and what to do instead, in one
   sentence. Use a colon to separate the two parts.
4. **Add a fix only if it is provably safe**, meaning the rewritten code has the
   same meaning in Vue 3 in every case. Pass `fix: [{ start, end, text }]` to
   `report()`. When a rename could collide with an existing key, do not offer a
   fix. If in doubt, leave it as a finding.
5. **Cover it with a fixture.** Add the pattern to
   `test/fixtures/vue2-app` (realistic code) or `test/fixtures/edge-cases`
   (unusual syntax), then run `npm run test:update` and review the snapshot
   diff. A test fails if a rule is never triggered by the fixtures.
6. **Document it** in the rule table of `README.md`.

## Documentation site and images

The site in `docs/` is static HTML served by GitHub Pages. It is generated, so
edit the scripts, not the HTML:

| Script | What it does |
| --- | --- |
| `scripts/render-assets.mjs` | Terminal SVG, animated demo, banners, card sources and `docs/report-example.html`, all from real CLI output |
| `scripts/build-docs.mjs` | Every docs page, rule tables, sitemap and robots.txt |
| `scripts/highlight-docs.mjs` | VS Code style syntax highlighting with Shiki (idempotent) |
| `scripts/render-png.sh` | `og.png`, `social-preview.png` and `report.png` with Edge or Chrome headless |

```bash
npm run docs:build   # build, assets, pages, highlighting
npm run docs:png     # PNG screenshots
```

Interactive parts of the site (theme toggle, copy buttons, package manager
tabs, checklist filters) use [Voodoo.js](https://github.com/kwy404/Voodoo.js)
directives. Article text and code stay in the static HTML.

## Writing style

- English for code, docs and messages (the Portuguese README is the only
  exception).
- No emoji, and no em dash or en dash characters anywhere. Use commas, colons or
  parentheses.
- Keep runtime dependencies to a minimum.

## Pull requests

- One topic per pull request, with a short description of the problem.
- `npm run build && npm run typecheck && npm run lint && npm test` must pass.
- Add a line to `CHANGELOG.md` under an "Unreleased" heading.
