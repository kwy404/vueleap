<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/kwy404/vueleap@main/assets/banner-dark.svg">
    <img src="https://cdn.jsdelivr.net/gh/kwy404/vueleap@main/assets/banner.svg" width="820" alt="vueleap, the Vue 2 to Vue 3 migration tool: Hop the frog leaps from a lily pad marked 2 to a lily pad marked 3">
  </picture>
</p>

<h1 align="center">vueleap: migrate Vue 2 to Vue 3 with one command</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/vueleap"><img src="https://img.shields.io/npm/v/vueleap?color=42b883&label=npm" width="80" alt="vueleap npm version"></a>
  <a href="https://www.npmjs.com/package/vueleap"><img src="https://img.shields.io/npm/dm/vueleap" width="110" alt="vueleap npm downloads per month"></a>
  <a href="https://www.npmjs.com/package/vueleap"><img src="https://img.shields.io/npm/dt/vueleap" width="100" alt="vueleap total npm downloads"></a>
  <a href="https://github.com/kwy404/vueleap/actions/workflows/ci.yml"><img src="https://github.com/kwy404/vueleap/actions/workflows/ci.yml/badge.svg" width="96" alt="CI status of the Vue 3 migration tool"></a>
  <a href="https://github.com/kwy404/vueleap/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/vueleap?color=42b883" width="78" alt="MIT license"></a>
  <a href="https://github.com/kwy404/vueleap/blob/main/package.json"><img src="https://img.shields.io/node/v/vueleap?color=42b883" width="90" alt="Node.js 18 or newer"></a>
</p>

<p align="center">
  <a href="https://github.com/kwy404/vueleap/blob/main/i18n/README.pt-BR.md">Leia em Português (pt-BR)</a> &middot;
  <a href="https://kwy404.github.io/vueleap/">Documentation</a> &middot;
  <a href="https://kwy404.github.io/vueleap/report-example.html">Sample report</a> &middot;
  <a href="https://kwy404.github.io/vueleap/vue-3-breaking-changes-checklist.html">Breaking changes checklist</a>
</p>

**Find everything that breaks when you migrate from Vue 2 to Vue 3, in one command.** vueleap is a free, open source Vue 3 migration tool: it scans a Vue 2 project and lists every Vue 3 breaking change file by file and line by line, explains each one with a link to the official migration guide, prints the exact `@vue/compat` flags your project needs for the migration build, and applies safe automatic fixes.

```bash
npx vueleap
```

<table>
  <tr>
    <td width="33%" valign="top"><img src="https://cdn.jsdelivr.net/gh/kwy404/vueleap@main/assets/icons/scan.svg" width="40" alt="Scan icon: Vue 2 to Vue 3 breaking changes checker"><br><b>Scan the whole project</b><br>41 checks over templates, scripts, styles and package.json, with file, line and column.</td>
    <td width="33%" valign="top"><img src="https://cdn.jsdelivr.net/gh/kwy404/vueleap@main/assets/icons/fix.svg" width="40" alt="Wrench icon: safe automatic Vue 3 codemods"><br><b>Apply safe fixes</b><br>8 codemods that are provably safe, shown as a diff before anything is written.</td>
    <td width="33%" valign="top"><img src="https://cdn.jsdelivr.net/gh/kwy404/vueleap@main/assets/icons/compat.svg" width="40" alt="Toggle icon: @vue/compat build flags"><br><b>Get exact compat flags</b><br>The minimal <code>configureCompat</code> and <code>compatConfig</code> for the migration build.</td>
  </tr>
  <tr>
    <td width="33%" valign="top"><img src="https://cdn.jsdelivr.net/gh/kwy404/vueleap@main/assets/icons/report.svg" width="40" alt="Chart icon: HTML Vue 3 migration report"><br><b>Share an HTML report</b><br>One standalone file with filters, light and dark themes and guide links.</td>
    <td width="33%" valign="top"><img src="https://cdn.jsdelivr.net/gh/kwy404/vueleap@main/assets/icons/ci.svg" width="40" alt="Pipeline icon: Vue 3 migration checks in CI"><br><b>Gate it in CI</b><br><code>--fail-on error</code> and <code>--json</code> keep Vue 2 only code from coming back.</td>
    <td width="33%" valign="top"><img src="https://cdn.jsdelivr.net/gh/kwy404/vueleap@main/assets/icons/api.svg" width="40" alt="Braces icon: programmatic Node.js API"><br><b>Use the API</b><br><code>analyze()</code> and <code>fix()</code> from Node.js for your own tooling.</td>
  </tr>
</table>

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/kwy404/vueleap@main/assets/demo.svg" width="100%" alt="Animated terminal demo: npx vueleap scans a Vue 2 app and prints Vue 3 breaking changes such as filters, beforeDestroy renames and keyCode modifiers, then a summary with an effort score">
</p>

## Table of contents

- [How do I check what breaks when migrating from Vue 2 to Vue 3?](#how-do-i-check-what-breaks-when-migrating-from-vue-2-to-vue-3)
- [What does vueleap check?](#what-does-vueleap-check)
- [Which fixes can vueleap apply automatically?](#which-fixes-can-vueleap-apply-automatically)
- [Which @vue/compat flags does my project need?](#which-vuecompat-flags-does-my-project-need)
- [What does the HTML report look like?](#what-does-the-html-report-look-like)
- [How do I run vueleap in CI?](#how-do-i-run-vueleap-in-ci)
- [Can I use vueleap from Node.js?](#can-i-use-vueleap-from-nodejs)
- [FAQ](#faq)
- [How does vueleap compare to other Vue 3 migration tools?](#how-does-vueleap-compare-to-other-vue-3-migration-tools)
- [Documentation and guides](#documentation-and-guides)
- [Contributing](#contributing)
- [License](#license)

## How do I check what breaks when migrating from Vue 2 to Vue 3?

Run vueleap at the root of your Vue 2 project. No install, no config:

```bash
npx vueleap                      # report for the current directory
npx vueleap ./apps/web           # report for another directory
npx vueleap --html report.html   # also write a standalone HTML report
npx vueleap --fix                # preview safe fixes as a diff
npx vueleap --fix --write        # apply them
```

`vue2to3` is installed as an alias, so `npx -p vueleap vue2to3` works too.

vueleap reads `.vue` single file components (template, `<script>`, `<script setup>`, `<style>`), JavaScript, TypeScript, JSX, TSX, CSS, SCSS, Less and Stylus files, plus `package.json`. It respects `.gitignore` (including nested ones), always skips `node_modules` and `dist`, and never follows symbolic links. Pug templates are skipped with a warning, the rest of the file is still analyzed.

This is the real output for the sample app in [`test/fixtures/vue2-app`](https://github.com/kwy404/vueleap/tree/main/test/fixtures/vue2-app) (excerpt):

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/kwy404/vueleap@main/assets/terminal.svg" width="100%" alt="vueleap terminal report for a Vue 2 app: Vue 3 breaking changes grouped by rule, each with file, line, column, migration guide link and @vue/compat flag">
</p>

| Option | Description |
| --- | --- |
| `--json` | Print the report as JSON (stable `schemaVersion: 1`) |
| `--html <file>` | Also write a standalone HTML report |
| `--fix` | Preview the safe automatic fixes as a unified diff (dry run) |
| `--write` | With `--fix`, write the fixes to disk |
| `--fail-on <level>` | Exit with code 1 when a finding at or above `error`, `warning` or `info` exists (default `none`) |
| `--compat` | Print only the `@vue/compat` configuration |
| `--rule <id>` / `--skip-rule <id>` | Run only, or skip, some rules (repeatable) |
| `--ignore <pattern>` | Extra ignore pattern in `.gitignore` syntax (repeatable) |
| `--no-gitignore` | Do not read `.gitignore` files |
| `--list-rules` | List every rule |
| `--verbose` | Print every finding (the default caps each rule at 15 lines) |
| `--no-color` | Disable colors |

Exit codes: `0` success, `1` findings at or above `--fail-on`, `2` usage or runtime error.

## What does vueleap check?

41 rules based on the official [Vue 3 migration guide](https://v3-migration.vuejs.org/breaking-changes/). Severity tells you what to expect: **error** breaks at compile time or at runtime, **warning** changes behavior, **info** deserves a review. Each rule links to its guide entry.

| Rule | Severity | Where | What it finds | Auto fix | @vue/compat flag |
| --- | --- | --- | --- | --- | --- |
| [`filters`](https://v3-migration.vuejs.org/breaking-changes/filters) | error | Template | Filters are removed |  | `COMPILER_FILTERS` `FILTERS` |
| [`listeners`](https://v3-migration.vuejs.org/breaking-changes/listeners-removed) | error | Script | $listeners is removed |  | `INSTANCE_LISTENERS` |
| [`scoped-slots`](https://v3-migration.vuejs.org/breaking-changes/slots-unification) | error | Script | $scopedSlots is removed | yes | `INSTANCE_SCOPED_SLOTS` |
| [`event-emitter`](https://v3-migration.vuejs.org/breaking-changes/events-api) | error | Script | $on, $off and $once are removed |  | `INSTANCE_EVENT_EMITTER` |
| [`hook-events`](https://v3-migration.vuejs.org/breaking-changes/vnode-lifecycle-events) | warning | Template | hook: lifecycle events are renamed | yes | `INSTANCE_EVENT_HOOKS` |
| [`set-delete`](https://v3-migration.vuejs.org/breaking-changes/#removed-apis) | error | Script | $set, $delete, Vue.set and Vue.delete are removed |  | `GLOBAL_SET` `GLOBAL_DELETE` `INSTANCE_SET` `INSTANCE_DELETE` |
| [`children`](https://v3-migration.vuejs.org/breaking-changes/children) | error | Script | $children is removed |  | `INSTANCE_CHILDREN` |
| [`destroy`](https://v3-migration.vuejs.org/breaking-changes/#removed-apis) | error | Script | $destroy is removed |  | `INSTANCE_DESTROY` |
| [`global-mount`](https://v3-migration.vuejs.org/breaking-changes/global-api#mounting-app-instance) | error | Script | new Vue() is replaced by createApp() |  | `GLOBAL_MOUNT` |
| [`global-api`](https://v3-migration.vuejs.org/breaking-changes/global-api) | error | Script | Global Vue API moved to the app instance |  | `GLOBAL_OBSERVABLE` `GLOBAL_PRIVATE_UTIL` |
| [`global-prototype`](https://v3-migration.vuejs.org/breaking-changes/global-api#vue-prototype-replaced-by-config-globalproperties) | error | Script | Vue.prototype is replaced by app.config.globalProperties |  | `GLOBAL_PROTOTYPE` |
| [`global-extend`](https://v3-migration.vuejs.org/breaking-changes/global-api#vue-extend-removed) | error | Script | Vue.extend is removed |  | `GLOBAL_EXTEND` |
| [`config-production-tip`](https://v3-migration.vuejs.org/breaking-changes/global-api#config-productiontip-removed) | warning | Script | Vue.config.productionTip is removed | yes | `CONFIG_PRODUCTION_TIP` |
| [`config-ignored-elements`](https://v3-migration.vuejs.org/breaking-changes/global-api#config-ignoredelements-is-now-config-compileroptions-iscustomelement) | warning | Script | Vue.config.ignoredElements is replaced by isCustomElement |  | `CONFIG_IGNORED_ELEMENTS` |
| [`config-key-codes`](https://v3-migration.vuejs.org/breaking-changes/keycode-modifiers) | error | Script | Vue.config.keyCodes is removed |  | `CONFIG_KEY_CODES` |
| [`global-config`](https://v3-migration.vuejs.org/breaking-changes/global-api#a-new-global-api-createapp) | warning | Script | Vue.config moved to app.config |  | `CONFIG_SILENT` `CONFIG_DEVTOOLS` `CONFIG_OPTION_MERGE_STRATS` |
| [`destroy-hooks`](https://v3-migration.vuejs.org/breaking-changes/#other-minor-changes) | error | Script | beforeDestroy and destroyed are renamed | yes | `OPTIONS_BEFORE_DESTROY` `OPTIONS_DESTROYED` |
| [`directive-hooks`](https://v3-migration.vuejs.org/breaking-changes/custom-directives) | error | Script | Custom directive hooks are renamed | yes | `CUSTOM_DIR` |
| [`component-v-model`](https://v3-migration.vuejs.org/breaking-changes/v-model) | error | Script | v-model on components uses modelValue |  | `COMPONENT_V_MODEL` |
| [`sync-modifier`](https://v3-migration.vuejs.org/breaking-changes/v-model) | error | Template | .sync is replaced by v-model:prop | yes | `COMPILER_V_BIND_SYNC` |
| [`native-modifier`](https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed) | warning | Template | The .native modifier is removed |  | `COMPILER_V_ON_NATIVE` |
| [`keycode-modifiers`](https://v3-migration.vuejs.org/breaking-changes/keycode-modifiers) | error | Template | KeyCode modifiers are removed | yes | `V_ON_KEYCODE_MODIFIER` |
| [`functional-components`](https://v3-migration.vuejs.org/breaking-changes/functional-components) | error | Template | Functional components changed |  | `COMPONENT_FUNCTIONAL` |
| [`inline-template`](https://v3-migration.vuejs.org/breaking-changes/inline-template-attribute) | error | Template | inline-template is removed |  | `COMPILER_INLINE_TEMPLATE` |
| [`template-v-for-key`](https://v3-migration.vuejs.org/breaking-changes/key-attribute) | error | Template | Key must be on &lt;template v-for&gt; |  |  |
| [`v-if-v-for`](https://v3-migration.vuejs.org/breaking-changes/v-if-v-for) | error | Template | v-if now has higher priority than v-for |  | `COMPILER_V_IF_V_FOR_PRECEDENCE` |
| [`v-bind-object-order`](https://v3-migration.vuejs.org/breaking-changes/v-bind) | warning | Template | v-bind="object" is order sensitive |  | `COMPILER_V_BIND_OBJECT_ORDER` |
| [`transition-classes`](https://v3-migration.vuejs.org/breaking-changes/transition) | warning | Style | Transition classes renamed | yes | `TRANSITION_CLASSES` |
| [`transition-group-root`](https://v3-migration.vuejs.org/breaking-changes/transition-group) | info | Template | &lt;transition-group&gt; renders no wrapper |  | `TRANSITION_GROUP_ROOT` |
| [`render-function-h`](https://v3-migration.vuejs.org/breaking-changes/render-function-api) | error | Script | Render functions no longer receive h |  | `RENDER_FUNCTION` |
| [`attrs-class-style`](https://v3-migration.vuejs.org/breaking-changes/attrs-includes-class-style) | info | Script | $attrs now includes class and style |  | `INSTANCE_ATTRS_CLASS_STYLE` |
| [`data-object`](https://v3-migration.vuejs.org/breaking-changes/data-option) | error | Script | data must be a function |  | `OPTIONS_DATA_FN` |
| [`watch-array`](https://v3-migration.vuejs.org/breaking-changes/watch) | info | Script | Array watchers need deep for mutations |  | `WATCH_ARRAY` |
| [`deprecated-slot-syntax`](https://v2.vuejs.org/v2/guide/components-slots.html#Deprecated-Syntax) | error | Template | slot and slot-scope attributes are removed |  |  |
| [`is-on-element`](https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop#customized-built-in-elements) | warning | Template | is on native elements needs the vue: prefix |  | `COMPILER_IS_ON_ELEMENT` |
| [`composition-api-plugin`](https://github.com/vuejs/composition-api#readme) | warning | Script | @vue/composition-api is built in |  |  |
| [`vue-version`](https://v3-migration.vuejs.org/migration-build) | warning | package.json | Vue 2 dependency |  |  |
| [`vue2-tooling`](https://v3-migration.vuejs.org/migration-build#installation) | warning | package.json | Vue 2 build or test tooling |  |  |
| [`vue-router-v3`](https://router.vuejs.org/guide/migration/) | error | package.json | vue-router 3 does not support Vue 3 |  |  |
| [`vuex-v3`](https://vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html) | error | package.json | Vuex 3 does not support Vue 3 |  |  |
| [`vue2-libraries`](https://v3-migration.vuejs.org/) | error | package.json | Vue 2 only library |  |  |

The same list, with explanations, is on the [Vue 3 breaking changes checklist](https://kwy404.github.io/vueleap/vue-3-breaking-changes-checklist.html).

## Which fixes can vueleap apply automatically?

Only rewrites that keep exactly the same meaning in Vue 3. Formatting is preserved because vueleap edits the exact character ranges it reported, nothing is reprinted.

| Rule | Before | After |
| --- | --- | --- |
| `destroy-hooks` | `beforeDestroy()`, `destroyed()` | `beforeUnmount()`, `unmounted()` |
| `directive-hooks` | `bind`, `inserted`, `componentUpdated`, `unbind` | `beforeMount`, `mounted`, `updated`, `unmounted` |
| `scoped-slots` | `this.$scopedSlots.default` | `this.$slots.default` |
| `transition-classes` | `.fade-enter`, `.v-leave`, `enter-class` | `.fade-enter-from`, `.v-leave-from`, `enter-from-class` |
| `keycode-modifiers` | `@keyup.13`, `@keyup.27` | `@keyup.enter`, `@keyup.esc` |
| `sync-modifier` | `:title.sync="doc.title"` | `v-model:title="doc.title"` |
| `hook-events` | `@hook:mounted` | `@vue:mounted` |
| `config-production-tip` | `Vue.config.productionTip = false` | (line removed) |

Safety rules:

- Dry run by default: `--fix` prints a diff, `--fix --write` writes.
- A rename is skipped when the new name already exists in the same object (for example a half migrated mixin with both `destroyed` and `unmounted`).
- Transition classes are renamed only for names used by a `<transition name>` or that have `-enter-active` style classes, so an unrelated `.btn-enter` is never touched.
- KeyCode modifiers are only rewritten when one key name matches (`.112` is reported, not guessed).
- Files are resolved inside the project root and checked again with their real path, and a file that changed since the analysis aborts the write.

## Which @vue/compat flags does my project need?

The [migration build](https://v3-migration.vuejs.org/migration-build) (`@vue/compat`) runs Vue 2 code on Vue 3 and lets you switch each Vue 2 behavior on or off. vueleap maps every finding to its flag and prints the smallest configuration: Vue 3 behavior by default (`MODE: 3`) with only the flags the code still needs. Runtime flags go to `configureCompat()`, template compiler flags (`COMPILER_*`) go to your build tool.

```bash
npx vueleap --compat
```

Real output for [`test/fixtures/edge-cases`](https://github.com/kwy404/vueleap/tree/main/test/fixtures/edge-cases):

```js
// main.js (with 'vue' aliased to '@vue/compat')
import { configureCompat } from 'vue'

configureCompat({
  MODE: 3,
  CUSTOM_DIR: true,
  GLOBAL_DELETE: true,
  GLOBAL_EXTEND: true,
  GLOBAL_SET: true,
  INSTANCE_EVENT_EMITTER: true,
  INSTANCE_LISTENERS: true,
  OPTIONS_BEFORE_DESTROY: true,
  OPTIONS_DESTROYED: true,
  RENDER_FUNCTION: true,
  TRANSITION_CLASSES: true,
  WATCH_ARRAY: true,
})

// vite.config.js
import vue from '@vitejs/plugin-vue'

export default {
  resolve: { alias: { vue: '@vue/compat' } },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 3,
            COMPILER_FILTERS: true,
          },
        },
      },
    }),
  ],
}
```

Every flag name is checked by the test suite against the `DeprecationTypes` and `CompilerDeprecationTypes` enums shipped with Vue. Remove flags as you fix findings, and drop `@vue/compat` when the list is empty. More in [@vue/compat build flags explained](https://kwy404.github.io/vueleap/vue-compat-build-flags.html).

## What does the HTML report look like?

`npx vueleap --html report.html` writes one standalone file (no external scripts or styles) that you can attach to a ticket or share with your team. It has summary cards, the compat configuration with a copy button, filters by severity, rule, text and fixability, and light and dark themes. [Open the live sample report](https://kwy404.github.io/vueleap/report-example.html).

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/kwy404/vueleap@main/assets/report.png" width="100%" alt="vueleap HTML report for a Vue 2 app: summary cards with errors, warnings and auto fixable count, minimal @vue/compat configuration and Vue 3 breaking changes grouped by rule">
</p>

## How do I run vueleap in CI?

Fail the build when Vue 2 only code is introduced, or track migration progress over time:

```yaml
# .github/workflows/vue3-migration.yml
name: Vue 3 migration
on: [push, pull_request]
jobs:
  vueleap:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npx vueleap --fail-on error --html vueleap-report.html
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: vueleap-report
          path: vueleap-report.html
```

`--json` prints a machine readable report (`summary`, `effort`, `compat`, `findings` with `ruleId`, `severity`, `file`, `line`, `column`, `docs`, `compatFlags`, `fixable`) for dashboards and custom checks.

## Can I use vueleap from Node.js?

Yes. The package is ESM and ships TypeScript types.

```ts
import { promises as fs } from 'node:fs'
import { analyze, fix, formatHtml, compatSnippet } from 'vueleap'

const result = await analyze('./my-vue2-app', { skipRules: ['attrs-class-style'] })

console.log(result.summary.error, 'errors in', result.summary.filesWithFindings, 'files')
console.log('effort score:', result.effort.score, result.effort.level)
console.log(compatSnippet(result.compat))

for (const finding of result.findings) {
  console.log(`${finding.file}:${finding.line}:${finding.column}`, finding.ruleId, finding.message)
}

// Preview fixes (nothing is written without write: true)
const { files } = await fix('./my-vue2-app', { write: false })
for (const file of files) console.log(file.diff)

await fs.writeFile('report.html', formatHtml(result))
```

Main exports: `analyze`, `fix`, `planFixes`, `applyEdits`, `formatPretty`, `formatJson`, `formatHtml`, `compatSnippet`, `collectCompatFlags`, `RULES`, plus the `AnalysisResult`, `Finding` and `RuleMeta` types.

## FAQ

### How long does a Vue 2 to Vue 3 migration take?

It depends on how much the code relies on removed APIs and on Vue 2 only libraries, so measure instead of guessing: `npx vueleap` ends with an **effort score**. Each finding adds its rule weight (an event bus call weighs more than a lifecycle rename, a UI library such as Vuetify 2 or BootstrapVue weighs a lot), and auto fixable findings count for a tenth. As a rough guide one point is about an hour of focused work, but the score is best used to compare projects and track progress. The sample app scores 59, mostly because of BootstrapVue, vue-router 3 and Vuex 3.

### Should I use @vue/compat?

For medium and large apps, usually yes: the migration build lets the app run on Vue 3 while you convert code step by step, and vueleap tells you exactly which flags to enable. It is a migration aid, not a long term runtime, and libraries that rely on Vue 2 internals (the official docs mention Vuetify, Quasar and Element UI) need their Vue 3 versions anyway. Small apps are often faster to migrate directly, using `npx vueleap --fix --write` and the report.

### Is Vue 2 still supported?

No. Vue 2 reached end of life on **December 31, 2023**. It no longer receives updates from the Vue team, including security fixes, and most of the ecosystem now targets Vue 3. Existing apps keep working, but the risk grows over time. See [Vue 2 end of life](https://kwy404.github.io/vueleap/vue-2-end-of-life.html).

### Does vueleap change my code?

Only with `--fix --write`. Without `--write`, `--fix` prints a diff. A plain `npx vueleap` only reads files.

### Does it work with TypeScript, `<script setup>` and class components?

Yes: `lang="ts"` and `lang="tsx"` blocks, `.ts` and `.tsx` files, Vue 2.7 `<script setup>` (including the 2.7 only `set` and `del` imports), and `vue-property-decorator` or `vue-class-component` classes are analyzed.

### Does it support Nuxt 2?

It analyzes the Vue code of a Nuxt 2 app and reports `nuxt` 2 in `package.json` with a pointer to the Nuxt migration guide, but it does not check Nuxt specific APIs.

### Can it produce false positives?

Static analysis can only see code, not runtime values, so a few findings may need judgment (for example `$attrs` info findings or a `v-bind="obj"` order warning where the keys never overlap). Component checks only run on objects that really look like Vue options, and the test suite includes look alike code that must not be reported. Use `--skip-rule` for checks that do not apply to you.

## How does vueleap compare to other Vue 3 migration tools?

| | vueleap | [vue-codemod](https://github.com/vuejs/vue-codemod) | [GoGoCode](https://github.com/thx/gogocode) (`gogocode-plugin-vue`) | [eslint-plugin-vue](https://eslint.vuejs.org/) |
| --- | --- | --- | --- | --- |
| Main purpose | Project wide report and plan | Code transformations | Code transformations | Linting in the editor and CI |
| Reports breaking changes with file and line | Yes | No | No | Yes, with its `no-deprecated-*` rules |
| `@vue/compat` flags for your project | Yes | No | No | No |
| Vue 2 only dependencies and effort estimate | Yes | No | No | No |
| Automatic rewrites | 8 safe codemods | Several transformations (jscodeshift) | Broad transformation of a whole project | Autofix for some rules |
| Status | Active | README says "experimental" | Plugin for Vue 2 to 3 published by the GoGoCode team | Maintained by the Vue team |

They work well together: run vueleap to see the size of the migration and to configure the compat build, use a transformation tool if you want large automated rewrites, and keep eslint-plugin-vue in your editor afterwards.

## Documentation and guides

- [vueleap documentation home](https://kwy404.github.io/vueleap/)
- [How to migrate Vue 2 to Vue 3, step by step](https://kwy404.github.io/vueleap/migrate-vue-2-to-vue-3.html)
- [Vue 3 breaking changes checklist](https://kwy404.github.io/vueleap/vue-3-breaking-changes-checklist.html)
- [@vue/compat build flags explained](https://kwy404.github.io/vueleap/vue-compat-build-flags.html)
- [Vue filters removed in Vue 3](https://kwy404.github.io/vueleap/vue-filters-removed-vue-3.html)
- [Event bus in Vue 3 ($on, $off, $once)](https://kwy404.github.io/vueleap/vue-event-bus-vue-3.html)
- [v-model changes in Vue 3](https://kwy404.github.io/vueleap/v-model-changes-vue-3.html)
- [Vue 2 end of life](https://kwy404.github.io/vueleap/vue-2-end-of-life.html)
- [Sample HTML report](https://kwy404.github.io/vueleap/report-example.html)

## More from kwy404

- [graphemely](https://kwy404.github.io/graphemely/): truncate, slice and count strings with emoji safely.
- [edgegoat](https://kwy404.github.io/edgegoat/): edge case test inputs for time zones, DST, unicode and numbers.
- [numberparrot](https://kwy404.github.io/numberparrot/): parse localized number and currency strings back into numbers.
- [breakhound](https://github.com/kwy404/breakhound): find bugs in any JavaScript library automatically, no tests needed.
- [Voodoo.js](https://github.com/kwy404/Voodoo.js): the HTML first framework behind the interactive parts of the docs site.

## Contributing

Issues and pull requests are welcome. [CONTRIBUTING.md](https://github.com/kwy404/vueleap/blob/main/CONTRIBUTING.md) explains the architecture and how to add a rule in a few steps (register it, detect it, add a fixture, update the snapshot).

```bash
npm install
npm run build && npm run typecheck && npm run lint && npm test
```

## License

[MIT](https://github.com/kwy404/vueleap/blob/main/LICENSE) &copy; 2026 [Alexandre Kohler](https://github.com/kwy404)
