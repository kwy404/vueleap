// Bundles the real analyzer and codemods (src/source.ts) for the browser, for
// the live demo at the top of the docs site. Output: docs/live/engine.js.
//
//   node scripts/build-live.mjs
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

await build({
  root,
  configFile: false,
  logLevel: 'warn',
  publicDir: false,
  define: { 'process.env.NODE_ENV': '"production"', __DEV__: 'false' },
  resolve: {
    alias: [
      { find: /^@vue\/compiler-sfc$/, replacement: path.join(root, 'node_modules/@vue/compiler-sfc/dist/compiler-sfc.esm-browser.js') },
      { find: /^@babel\/parser$/, replacement: path.join(root, 'scripts/live/babel-parser.ts') },
    ],
  },
  build: {
    outDir: path.join(root, 'docs/live'),
    // demo.js and view.js live in the same folder, so keep it.
    emptyOutDir: false,
    target: 'es2020',
    minify: true,
    reportCompressedSize: true,
    lib: { entry: path.join(root, 'scripts/live/engine.ts'), formats: ['es'], fileName: () => 'engine.js' },
  },
})
console.log('docs/live/engine.js written')
