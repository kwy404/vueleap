// The browser build of @vue/compiler-sfc already contains @babel/parser, so the
// live demo bundle reuses that copy instead of shipping a second one.
export { babelParse as parse } from '@vue/compiler-sfc'
