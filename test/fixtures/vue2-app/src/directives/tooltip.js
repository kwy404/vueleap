export default {
  bind(el, binding) {
    el.setAttribute('title', binding.value)
  },
  componentUpdated(el, binding) {
    el.setAttribute('title', binding.value)
  },
  unbind(el) {
    el.removeAttribute('title')
  },
}
