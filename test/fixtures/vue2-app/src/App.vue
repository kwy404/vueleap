<template>
  <div id="app">
    <the-header :cart-count="cartCount" @click.native="toggleMenu" />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'

export default {
  name: 'App',
  components: { TheHeader },
  computed: {
    cartCount() {
      return Object.keys(this.$store.state.cart).length
    },
  },
  methods: {
    toggleMenu() {
      this.$root.$emit('menu:toggle')
    },
  },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
