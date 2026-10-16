// Examples for the live demo at the top of the docs site. Each one is a small,
// realistic Vue 2 file. The build runs the real fixSource on every example and
// embeds the results, so switching examples is instant before the engine loads.

export const EXAMPLES = [
  {
    id: 'component',
    label: 'Component',
    filename: 'PriceTag.vue',
    code: `<template>
  <div class="price-tag" v-on="$listeners">
    <p>{{ price | currency }}</p>
    <currency-picker :code.sync="code" />
    <input
      v-model="price"
      @keyup.13="save"
      @keydown.27="cancel"
    >
  </div>
</template>

<script>
import EventBus from './event-bus'

export default {
  props: ['price'],
  filters: {
    currency: (value) => '$' + value.toFixed(2),
  },
  mounted() {
    EventBus.$on('reset', this.cancel)
  },
  beforeDestroy() {
    EventBus.$off('reset', this.cancel)
  },
}
</script>
`,
  },
  {
    id: 'directive',
    label: 'Directive',
    filename: 'tooltip.js',
    code: `export default {
  bind(el, binding) {
    el.title = binding.value
  },
  inserted(el) {
    el.dataset.ready = 'true'
  },
  componentUpdated(el, binding) {
    el.title = binding.value
  },
  unbind(el) {
    el.title = ''
  },
}
`,
  },
  {
    id: 'main',
    label: 'main.js',
    filename: 'main.js',
    code: `import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(router)
Vue.prototype.$http = fetch

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
`,
  },
  {
    id: 'transition',
    label: 'Transition',
    filename: 'FadeBox.vue',
    code: `<template>
  <transition name="fade">
    <div v-if="open" class="box">
      <slot />
    </div>
  </transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
`,
  },
  {
    id: 'render',
    label: 'Render function',
    filename: 'FancyList.js',
    code: `export default {
  props: ['items'],
  render(h) {
    return h('ul', this.items.map((item) =>
      this.$scopedSlots.item({ item })
    ))
  },
  destroyed() {
    this.$set(this.cache, 'list', null)
  },
}
`,
  },
]
