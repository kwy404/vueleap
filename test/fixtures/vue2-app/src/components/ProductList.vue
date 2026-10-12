<template>
  <div class="products">
    <ul>
      <li v-for="product in products" v-if="product.visible" :key="product.id">
        {{ product.name | capitalize }} costs {{ product.price | currency('EUR') }}
        <product-card :product.sync="selected" :title="product.name | capitalize" />
      </li>
    </ul>
    <dl>
      <template v-for="spec in specs">
        <dt :key="spec.id">{{ spec.label }}</dt>
        <dd>{{ spec.value || 'n/a' }}</dd>
      </template>
    </dl>
    <fancy-list :items="products">
      <template slot-scope="{ item }">{{ item.name }}</template>
    </fancy-list>
  </div>
</template>

<script>
import { EventBus } from '../event-bus'
import FancyList from './FancyList'
import ProductCard from './ProductCard.vue'

export default {
  name: 'ProductList',
  components: { FancyList, ProductCard },
  filters: {
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
  },
  data() {
    return { products: [], specs: [], selected: null }
  },
  watch: {
    products(list) {
      this.$emit('count', list.length)
    },
    specs: {
      handler() {},
      deep: true,
    },
  },
  mounted() {
    EventBus.$on('cart:add', this.onAdd)
    this.$once('hook:beforeDestroy', () => clearInterval(this.timer))
  },
  beforeDestroy() {
    EventBus.$off('cart:add', this.onAdd)
  },
  methods: {
    onAdd(product) {
      this.$set(product, 'inCart', true)
    },
  },
}
</script>
