export default {
  name: 'FancyList',
  props: { items: { type: Array, required: true } },
  render(h) {
    return h(
      'ul',
      this.items.map((item) => h('li', [this.$scopedSlots.default({ item })])),
    )
  },
}
