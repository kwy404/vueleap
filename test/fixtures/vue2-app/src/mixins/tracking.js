export default {
  created() {
    this.trackedAt = Date.now()
  },
  beforeDestroy() {
    this.trackedAt = null
  },
}
