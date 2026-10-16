# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.1.0] - 2026-10-16

### Added

- `analyzeSource(code, { filename })` analyzes one file held in memory, with no project folder needed.
- `fixSource(code, { filename })` applies the same safe fixes as `--fix` to one file in memory and returns the new code, the ranges it rewrote and what is left to do by hand.
- Both functions avoid Node built-ins, so they also run in the browser. The live demo on the website uses them.

## [1.0.0] - 2026-10-13

### Changed

- First stable release. The public API is now covered by semantic versioning: breaking changes only in a new major version.

## [0.1.2] - 2026-10-12

### Changed

- Redesigned documentation site: new hero, VS Code style editor and terminal frames for every code example, FAQ accordion, mobile menu and a footer with related projects.
- The animated terminal demo on the home page is now real HTML text that fits small and large screens.
- README shows monthly and total npm downloads and links related projects.
- The CLI report snapshot no longer depends on the package version.

## [0.1.1] - 2026-10-12

### Fixed

- The npm page now shows the English README. The Portuguese translation moved to `i18n/README.pt-BR.md`.

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
