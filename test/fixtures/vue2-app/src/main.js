import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseButton from './components/BaseButton.vue'
import tooltip from './directives/tooltip'
import tracking from './mixins/tracking'
import { api } from './api'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.config.ignoredElements = ['ion-icon']
Vue.config.keyCodes = { f2: 113 }

Vue.use(BootstrapVue)
Vue.mixin(tracking)
Vue.component('BaseButton', BaseButton)
Vue.directive('tooltip', tooltip)
Vue.directive('focus', {
  inserted(el) {
    el.focus()
  },
})

Vue.filter('currency', (value) => `$${Number(value).toFixed(2)}`)
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
