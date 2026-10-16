<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/kwy404/vueleap@main/assets/banner-dark.svg">
    <img src="https://cdn.jsdelivr.net/gh/kwy404/vueleap@main/assets/banner.svg" width="820" alt="Hop the frog leaps from a lily pad marked 2 to a lily pad marked 3">
  </picture>
</p>

<h1 align="center">vueleap</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/vueleap"><img src="https://img.shields.io/npm/v/vueleap?color=42b883&label=npm" width="80" alt="npm version"></a>
  <a href="https://github.com/kwy404/vueleap/actions/workflows/ci.yml"><img src="https://github.com/kwy404/vueleap/actions/workflows/ci.yml/badge.svg" width="96" alt="CI status"></a>
  <a href="https://github.com/kwy404/vueleap/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/vueleap?color=42b883" width="78" alt="MIT license"></a>
</p>

<p align="center">
  <a href="https://kwy404.github.io/vueleap/">Website and live demo</a> &middot;
  <a href="https://kwy404.github.io/vueleap/report-example.html">Sample report</a> &middot;
  <a href="https://github.com/kwy404/vueleap/blob/main/i18n/README.pt-BR.md">Português</a>
</p>

vueleap reads a Vue 2 project and tells you what breaks on Vue 3, file by file and line by line. It rewrites the changes that are pure renames, links every other finding to the official migration guide, and prints the `@vue/compat` flags the rest of the code still needs.

```bash
npx vueleap
```

Nothing to install or configure, and nothing leaves your machine. You can also [paste a component on the website](https://kwy404.github.io/vueleap/#try) and see the Vue 3 version right away.

## Usage

```bash
npx vueleap                    # report for the current folder
npx vueleap ./app --html report.html
npx vueleap --fix              # preview the safe fixes as a diff
npx vueleap --fix --write      # apply them
npx vueleap --compat           # print only the @vue/compat config
npx vueleap --fail-on error    # exit with code 1 in CI
```

Run `npx vueleap --help` for every option, or `--list-rules` for the 41 checks. They cover templates, scripts, styles and `package.json`, including filters, `$listeners`, the event bus API, `$set`, the global API, lifecycle and directive hook renames, `v-model` and `.sync`, keyCode modifiers, functional components, transition classes, render functions and Vue 2 only libraries.

## Safe fixes

`--fix` only rewrites changes that keep the same meaning on Vue 3, and it edits the exact characters it reported, so your formatting stays.

| Rule | Vue 2 | Vue 3 |
| --- | --- | --- |
| `destroy-hooks` | `beforeDestroy`, `destroyed` | `beforeUnmount`, `unmounted` |
| `directive-hooks` | `bind`, `inserted`, `componentUpdated`, `unbind` | `beforeMount`, `mounted`, `updated`, `unmounted` |
| `scoped-slots` | `this.$scopedSlots.default` | `this.$slots.default` |
| `transition-classes` | `.fade-enter`, `enter-class` | `.fade-enter-from`, `enter-from-class` |
| `keycode-modifiers` | `@keyup.13` | `@keyup.enter` |
| `sync-modifier` | `:title.sync="t"` | `v-model:title="t"` |
| `hook-events` | `@hook:mounted` | `@vue:mounted` |
| `config-production-tip` | `Vue.config.productionTip = false` | line removed |

Nothing is written without `--write`, files outside the project are never touched, and a file that changed after the analysis stops the write.

## Compat flags

The [migration build](https://v3-migration.vuejs.org/migration-build) runs Vue 2 style code on Vue 3, one flag per feature. `npx vueleap --compat` prints the smallest config for your code: Vue 3 behavior by default (`MODE: 3`) plus only the flags you still need. Remove flags as findings go away, then remove `@vue/compat`.

## In CI

```yaml
- run: npx vueleap --fail-on error --html vueleap-report.html
```

`--json` prints the full report (summary, effort score, compat flags and every finding) for other tools.

## From code

The package is ESM with TypeScript types.

```ts
import { analyze, fix, fixSource } from 'vueleap'

const result = await analyze('./my-app')
console.log(result.summary.error, result.compat.runtime)

const { files } = await fix('./my-app') // a dry run unless { write: true }

// One file in memory, also in the browser:
const { code, remaining } = fixSource(vue2Component, { filename: 'Price.vue' })
```

Other exports: `analyzeSource`, `planFixes`, `applyEdits`, `formatPretty`, `formatJson`, `formatHtml`, `compatSnippet` and `RULES`.

## Guides

- [Migration guide](https://kwy404.github.io/vueleap/migrate-vue-2-to-vue-3.html)
- [Rules reference](https://kwy404.github.io/vueleap/vue-3-breaking-changes-checklist.html)
- [Compat flags](https://kwy404.github.io/vueleap/vue-compat-build-flags.html)
- [v-model on components](https://kwy404.github.io/vueleap/v-model-changes-vue-3.html)

## More from kwy404

[Monsoon](https://kwy404.github.io/monsoon/), [Voodoo.js](https://kwy404.github.io/Voodoo.js/), [breakhound](https://kwy404.github.io/breakhound/), [graphemely](https://kwy404.github.io/graphemely/), [numberparrot](https://kwy404.github.io/numberparrot/), [edgegoat](https://kwy404.github.io/edgegoat/), [cookieowl](https://kwy404.github.io/cookieowl/), [installkite](https://kwy404.github.io/installkite/), [a11ymedic](https://kwy404.github.io/a11ymedic/), [fontsketch](https://kwy404.github.io/fontsketch/) and [kastor](https://kwy404.github.io/kastor/).

## Contributing

Issues and pull requests are welcome. [CONTRIBUTING.md](https://github.com/kwy404/vueleap/blob/main/CONTRIBUTING.md) explains how to add a rule.

```bash
npm install
npm run build && npm run typecheck && npm run lint && npm test
```

## License

[MIT](https://github.com/kwy404/vueleap/blob/main/LICENSE). Made by [Alexandre Kohler](https://github.com/kwy404) ([GitHub](https://github.com/kwy404), [LinkedIn](https://www.linkedin.com/in/alexandre-silva-173687256/)). The website is built with [Monsoon](https://kwy404.github.io/monsoon/) and its interactive parts with [Voodoo.js](https://kwy404.github.io/Voodoo.js/).
