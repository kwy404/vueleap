import type { CompatFlags, Finding } from './types.js'

/** Flags handled by the template compiler (`compilerOptions.compatConfig`). */
export const COMPILER_FLAGS = new Set([
  'COMPILER_IS_ON_ELEMENT',
  'COMPILER_V_BIND_SYNC',
  'COMPILER_V_BIND_OBJECT_ORDER',
  'COMPILER_V_ON_NATIVE',
  'COMPILER_V_IF_V_FOR_PRECEDENCE',
  'COMPILER_NATIVE_TEMPLATE',
  'COMPILER_INLINE_TEMPLATE',
  'COMPILER_FILTERS',
])

export function collectCompatFlags(findings: readonly Finding[]): CompatFlags {
  const runtime = new Set<string>()
  const compiler = new Set<string>()
  for (const finding of findings) {
    for (const flag of finding.compatFlags) (COMPILER_FLAGS.has(flag) ? compiler : runtime).add(flag)
  }
  return { runtime: [...runtime].sort(), compiler: [...compiler].sort() }
}

/**
 * Builds the smallest @vue/compat configuration for a project: Vue 3 behavior
 * everywhere (MODE: 3) with only the Vue 2 behaviors the code still relies on.
 */
export function compatSnippet(flags: CompatFlags): string {
  if (flags.runtime.length === 0 && flags.compiler.length === 0) {
    return '// No @vue/compat flags needed: this project can run on plain Vue 3.\n'
  }
  const lines: string[] = []
  lines.push("// main.js (with 'vue' aliased to '@vue/compat')")
  lines.push("import { configureCompat } from 'vue'")
  lines.push('')
  lines.push('configureCompat({')
  lines.push('  MODE: 3,')
  for (const flag of flags.runtime) lines.push(`  ${flag}: true,`)
  lines.push('})')
  lines.push('')
  lines.push('// vite.config.js')
  lines.push("import vue from '@vitejs/plugin-vue'")
  lines.push('')
  lines.push('export default {')
  lines.push("  resolve: { alias: { vue: '@vue/compat' } },")
  if (flags.compiler.length === 0) {
    lines.push('  plugins: [vue()],')
  } else {
    lines.push('  plugins: [')
    lines.push('    vue({')
    lines.push('      template: {')
    lines.push('        compilerOptions: {')
    lines.push('          compatConfig: {')
    lines.push('            MODE: 3,')
    for (const flag of flags.compiler) lines.push(`            ${flag}: true,`)
    lines.push('          },')
    lines.push('        },')
    lines.push('      },')
    lines.push('    }),')
    lines.push('  ],')
  }
  lines.push('}')
  return `${lines.join('\n')}\n`
}
