<template>
  <div>{{ greeting }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Hello extends Vue {
  @Prop({ default: 'world' }) readonly name!: string

  get greeting(): string {
    return `Hello ${this.name}`
  }

  beforeDestroy(): void {
    window.removeEventListener('resize', this.onResize)
  }

  onResize(): void {}
}
</script>
