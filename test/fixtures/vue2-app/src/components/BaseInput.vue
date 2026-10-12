<template>
  <label class="field">
    {{ label }}
    <input :value="value" v-bind="$attrs" v-on="$listeners" @input="$emit('input', $event.target.value)" />
  </label>
</template>

<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: ['value', 'label'],
}
</script>
