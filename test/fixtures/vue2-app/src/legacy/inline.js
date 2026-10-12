import Vue from 'vue'

Vue.component('legacy-counter', {
  data: function () {
    return { count: 0 }
  },
  template: '<button @click.native="count++">{{ count | number }}</button>',
})
