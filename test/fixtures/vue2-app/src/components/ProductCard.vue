<template>
  <article class="card" :class="{ selected: isSelected }">
    <h3>{{ product.name }}</h3>
    <button @click="$emit('update:product', product)">Select</button>
  </article>
</template>

<script>
export default {
  name: 'ProductCard',
  props: { product: Object, isSelected: Boolean },
}
</script>
