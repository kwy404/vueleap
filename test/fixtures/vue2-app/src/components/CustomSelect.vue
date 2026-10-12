<template>
  <select :value="selected" @change="$emit('change', $event.target.value)">
    <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
  </select>
</template>

<script>
export default {
  name: 'CustomSelect',
  model: {
    prop: 'selected',
    event: 'change',
  },
  props: {
    selected: String,
    options: { type: Array, default: () => [] },
  },
}
</script>
