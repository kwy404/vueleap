<template>
  <div>
    <p>{{ message | upper }}</p>
  </div>
</template>

<script>
export default {
  props: { message: String },
  beforeDestroy() {},
}
</script>
