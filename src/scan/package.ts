import type { FileContext } from '../context.js'

interface LibraryAdvice {
  /** Report when the major version is below this value (undefined: any version). */
  below?: number
  suggestion: string
  docs: string
  effort: number
}

const LIBRARIES: Readonly<Record<string, LibraryAdvice>> = {
  'bootstrap-vue': {
    suggestion: 'BootstrapVue only supports Vue 2. Migrate to bootstrap-vue-next (Bootstrap 5) or plain Bootstrap 5 markup.',
    docs: 'https://bootstrap-vue-next.github.io/bootstrap-vue-next/',
    effort: 20,
  },
  vuetify: {
    below: 3,
    suggestion: 'Vuetify 2 only supports Vue 2. Upgrade to Vuetify 3 and follow its upgrade guide.',
    docs: 'https://vuetifyjs.com/en/getting-started/upgrade-guide/',
    effort: 30,
  },
  'element-ui': {
    suggestion: 'Element UI only supports Vue 2. Migrate to Element Plus, its Vue 3 successor.',
    docs: 'https://element-plus.org/',
    effort: 25,
  },
  'vue-i18n': {
    below: 9,
    suggestion: 'vue-i18n 8 only supports Vue 2. Upgrade to vue-i18n 9 or later (createI18n).',
    docs: 'https://vue-i18n.intlify.dev/guide/migration/vue3.html',
    effort: 3,
  },
  'portal-vue': {
    below: 3,
    suggestion: 'portal-vue 2 only supports Vue 2. Use the built-in <Teleport> component (or portal-vue 3).',
    docs: 'https://vuejs.org/guide/built-ins/teleport.html',
    effort: 1,
  },
  'vue-meta': {
    below: 3,
    suggestion: 'vue-meta 2 only supports Vue 2. Use @unhead/vue for document head management.',
    docs: 'https://unhead.unjs.io/',
    effort: 2,
  },
  'vue-class-component': {
    below: 8,
    suggestion: 'vue-class-component 7 only supports Vue 2. Rewrite components with the Composition API and <script setup>, or move to vue-facing-decorator.',
    docs: 'https://vuejs.org/guide/extras/composition-api-faq.html',
    effort: 8,
  },
  'vue-property-decorator': {
    suggestion: 'vue-property-decorator depends on vue-class-component 7 (Vue 2). Rewrite components with the Composition API and <script setup>, or move to vue-facing-decorator.',
    docs: 'https://vuejs.org/guide/extras/composition-api-faq.html',
    effort: 8,
  },
  vuedraggable: {
    below: 4,
    suggestion: 'vuedraggable 2 only supports Vue 2. Upgrade to vuedraggable 4 (published as vuedraggable@next).',
    docs: 'https://github.com/SortableJS/vue.draggable.next',
    effort: 1,
  },
  'vee-validate': {
    below: 4,
    suggestion: 'vee-validate 3 only supports Vue 2. Upgrade to vee-validate 4, which has a new API.',
    docs: 'https://vee-validate.logaretm.com/v4/',
    effort: 4,
  },
  nuxt: {
    below: 3,
    suggestion: 'Nuxt 2 runs on Vue 2. Migrate to Nuxt 3 or later following the Nuxt migration guide.',
    docs: 'https://nuxt.com/docs/migration/overview',
    effort: 20,
  },
}

const TOOLING: Readonly<Record<string, { below?: number; suggestion: string }>> = {
  'vue-template-compiler': { suggestion: 'vue-template-compiler is Vue 2 only: remove it, Vue 3 ships @vue/compiler-sfc.' },
  'vue-loader': { below: 16, suggestion: 'vue-loader 15 compiles Vue 2 SFCs: upgrade to vue-loader 17.' },
  '@vitejs/plugin-vue2': { suggestion: '@vitejs/plugin-vue2 is for Vue 2: switch to @vitejs/plugin-vue.' },
  '@vue/test-utils': { below: 2, suggestion: '@vue/test-utils 1 is for Vue 2: upgrade to @vue/test-utils 2.' },
  'vue-server-renderer': { suggestion: "vue-server-renderer is Vue 2 only: use renderToString from 'vue/server-renderer'." },
  '@vue/composition-api': { suggestion: '@vue/composition-api backports the Composition API to Vue 2.6: remove it, the API is built into Vue 3.' },
}

const DEPENDENCY_FIELDS = ['dependencies', 'devDependencies', 'peerDependencies'] as const

/** Returns the major version a semver range targets, when it can be determined. */
export function majorOf(range: string): number | undefined {
  const value = range.trim()
  if (/^(npm|file|link|git|github|workspace|https?):/i.test(value) || value.includes('/')) return undefined
  if (value === '*' || value === 'latest' || value === '' || value === 'next') return undefined
  const match = /(\d+)/.exec(value)
  return match ? Number(match[1]) : undefined
}

function keyOffset(text: string, name: string): number {
  const escaped = name.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')
  const match = new RegExp(`"${escaped}"\\s*:`).exec(text)
  return match ? match.index : 0
}

export function scanPackageJson(ctx: FileContext): void {
  let pkg: Record<string, unknown>
  try {
    pkg = JSON.parse(ctx.text) as Record<string, unknown>
  } catch (error) {
    ctx.warn(`Could not parse package.json: ${(error as Error).message}`)
    return
  }

  const deps = new Map<string, string>()
  for (const field of DEPENDENCY_FIELDS) {
    const section = pkg[field]
    if (!section || typeof section !== 'object') continue
    for (const [name, range] of Object.entries(section as Record<string, unknown>)) {
      if (typeof range === 'string' && !deps.has(name)) deps.set(name, range)
    }
  }

  const at = (name: string): [number, number] => {
    const start = keyOffset(ctx.text, name)
    return [start, start + name.length + 2]
  }

  const vue = deps.get('vue')
  if (vue !== undefined && majorOf(vue) === 2) {
    ctx.report('vue-version', ...at('vue'), `vue ${vue} is Vue 2: upgrade to vue@^3.5. To migrate step by step, alias vue to @vue/compat first.`)
  }

  const router = deps.get('vue-router')
  const routerMajor = router === undefined ? undefined : majorOf(router)
  if (routerMajor !== undefined && routerMajor < 4) {
    ctx.report('vue-router-v3', ...at('vue-router'), `vue-router ${router} only works with Vue 2: upgrade to vue-router 4 (createRouter, createWebHistory).`)
  }

  const vuex = deps.get('vuex')
  const vuexMajor = vuex === undefined ? undefined : majorOf(vuex)
  if (vuexMajor !== undefined && vuexMajor < 4) {
    ctx.report('vuex-v3', ...at('vuex'), `vuex ${vuex} only works with Vue 2: upgrade to Vuex 4 (createStore) or migrate to Pinia, the recommended store for Vue 3.`)
  }

  for (const [name, advice] of Object.entries(TOOLING)) {
    const range = deps.get(name)
    if (range === undefined) continue
    const major = majorOf(range)
    if (advice.below !== undefined && (major === undefined || major >= advice.below)) continue
    ctx.report('vue2-tooling', ...at(name), `${name} ${range}: ${advice.suggestion}`)
  }

  for (const [name, advice] of Object.entries(LIBRARIES)) {
    const range = deps.get(name)
    if (range === undefined) continue
    const major = majorOf(range)
    if (advice.below !== undefined && (major === undefined || major >= advice.below)) continue
    ctx.report('vue2-libraries', ...at(name), `${name} ${range}: ${advice.suggestion}`, { docs: advice.docs, effort: advice.effort })
  }
}
