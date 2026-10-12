<template>
  <header class="header">
    <base-button @click="$emit('click')">Menu</base-button>
    <span class="badge">{{ cartCount }}</span>
    <input v-model="query" placeholder="Search" @keyup.13="search" @keyup.27="query = ''" @keydown.112="help" />
  </header>
</template>

<script>
import { EventBus } from '../event-bus'

export default {
  name: 'TheHeader',
  props: { cartCount: { type: Number, default: 0 } },
  data() {
    return { query: '' }
  },
  methods: {
    search() {
      EventBus.$emit('search', this.query)
    },
    help() {},
  },
}
</script>
