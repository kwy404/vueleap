import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const count = ref(0)
    return { count }
  },
})
