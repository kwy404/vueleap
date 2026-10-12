<template>
  <div class="home">
    <b-container>
      <base-input v-model="form.email" label="Email" />
      <custom-select v-model="form.size" :options="sizes" />
      <product-list />
    </b-container>
  </div>
</template>

<script>
import BaseInput from '../components/BaseInput.vue'
import CustomSelect from '../components/CustomSelect.vue'
import ProductList from '../components/ProductList.vue'

export default {
  name: 'Home',
  components: { BaseInput, CustomSelect, ProductList },
  data() {
    return { form: {}, sizes: ['S', 'M', 'L'] }
  },
  created() {
    this.$set(this.form, 'email', '')
    this.$delete(this.form, 'legacy')
  },
}
</script>
