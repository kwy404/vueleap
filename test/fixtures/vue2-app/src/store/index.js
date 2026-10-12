import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { cart: {}, favorites: [] },
  mutations: {
    addToCart(state, product) {
      Vue.set(state.cart, product.id, product)
    },
    removeFromCart(state, id) {
      Vue.delete(state.cart, id)
    },
  },
})
