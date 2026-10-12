<template>
  <div class="modal" @hook:mounted="onChildMounted">
    <transition-group name="list">
      <p v-for="message in messages" :key="message.id">{{ message.text }}</p>
    </transition-group>
    <slot name="footer" :close="close" />
    <div v-if="$scopedSlots.extra" class="extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return { messages: [] }
  },
  methods: {
    close() {
      this.$children.forEach((child) => child.reset && child.reset())
      this.$destroy()
      this.$el.remove()
    },
    onChildMounted() {},
  },
  destroyed() {
    document.body.classList.remove('modal-open')
  },
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
}
</style>
