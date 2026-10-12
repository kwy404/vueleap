<template>
  <ul>
    <li v-for="item in list" :key="item">{{ item }}</li>
  </ul>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    items: { type: Array as PropType<string[]>, default: () => [] },
  },
  data() {
    return { list: [] as string[], tags: [] as string[] }
  },
  watch: {
    list: {
      handler(value: string[]): void {
        this.$emit('change', value)
      },
      deep: true,
    },
    tags(value: string[]): void {
      this.$emit('tags', value)
    },
  },
  beforeDestroy(): void {
    this.$off()
  },
})
</script>
