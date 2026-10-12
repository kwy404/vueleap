# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/).

## [0.1.0] - 2026-10-12

### Added

- `npx vueleap` command (with `vue2to3` as an alias) that scans a Vue 2 project
  and reports every Vue 3 breaking change with file, line, column, explanation
  and a link to the official migration guide.
- 41 rules covering templates, scripts, styles and `package.json`, including
  filters, `$listeners`, `$scopedSlots`, the event bus API, `$set` and
  `$delete`, the global API, lifecycle and directive hook renames, `v-model`
  changes, `.sync`, `.native`, keyCode modifiers, functional components,
  transition classes, render functions and Vue 2 only libraries.
- Minimal `@vue/compat` configuration (runtime `configureCompat` flags and
  compiler `compatConfig` flags) generated from the findings.
- `--fix` dry run with unified diffs and `--fix --write` for 8 safe codemods.
- Pretty terminal report, `--json`, and a standalone `--html` report with light
  and dark themes and filters.
- `--fail-on` exit codes for CI.
- Programmatic API: `analyze`, `fix`, `formatPretty`, `formatJson`,
  `formatHtml` and the rule registry.

[0.1.0]: https://github.com/kwy404/vueleap/releases/tag/v0.1.0
