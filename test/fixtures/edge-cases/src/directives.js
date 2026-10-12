export function register(app) {
  app.directive('resize', {
    bind(el, binding) {
      el._onResize = binding.value
    },
    update(el, binding) {
      el._onResize = binding.value
    },
  })
}
