<template>
  <section>
    <legacy-panel inline-template>
      <div>{{ title }}</div>
    </legacy-panel>
    <table>
      <tr is="product-row" v-for="row in rows" :key="row.id" :row="row"></tr>
    </table>
    <div id="widget" class="widget" v-bind="widgetAttrs"></div>
    <modal>
      <template slot="footer">
        <base-button @click="save">Save</base-button>
      </template>
    </modal>
  </section>
</template>

<script>
export default {
  name: 'LegacyWidget',
  data: {
    rows: [],
    widgetAttrs: { id: 'override' },
  },
}
</script>
