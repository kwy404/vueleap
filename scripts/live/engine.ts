// Entry of the browser bundle behind the live demo on the docs site. It is the
// same analyzer and the same codemods as the CLI, built by scripts/build-live.mjs.
export { analyzeSource, fixSource } from '../../src/source.js'
export { compatSnippet } from '../../src/compat.js'
export { RULES_BY_ID } from '../../src/rules.js'
