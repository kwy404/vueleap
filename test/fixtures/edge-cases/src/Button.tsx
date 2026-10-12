export default {
  name: 'TsxButton',
  props: { label: String },
  render(h: unknown) {
    return <button onClick={this.$listeners.click}>{this.label}</button>
  },
}
