<template lang="pug">
div.price {{ amount | currency }}
</template>

<script>
export default {
  props: ['amount'],
  destroyed() {
    console.log('gone')
  },
}
</script>
