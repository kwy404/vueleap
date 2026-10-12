<script setup>
import { ref, set, del } from 'vue'

const props = defineProps({ user: Object })
const flags = ref({})

function enable(name) {
  set(flags.value, name, true)
}

function disable(name) {
  del(flags.value, name)
}
</script>

<template>
  <div :class="{ active: flags.on }" @click="enable('on')" @dblclick="disable('on')">{{ props.user.name }}</div>
</template>

<style scoped>
.v-leave {
  opacity: 1;
}
</style>
