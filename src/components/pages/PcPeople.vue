<template>
  <div id="people">
    <hot-table :data="data" licenseKey="non-commercial-and-evaluation"></hot-table>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { HotTable } from '@handsontable/vue'

  export default {
    name: "PcPeople",
    components: {
      HotTable
    },
    data () {
      return {
        data: [
          ["", "Ford", "Volvo", "Toyota", "Honda"],
          ["2016", 10, 11, 12, 13],
          ["2017", 20, 11, 14, 13],
          ["2018", 30, 15, 12, 13]
        ]
      }
    },
    computed: {
      ...mapState(['users'])
    },
    created () {
      this.getTableUsers()
    },
    methods: {
      ...mapActions(['getTableUsers'])
    }
  }
</script>

<style lang="scss">
@import '../../../node_modules/handsontable/dist/handsontable.full.css';

#people {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>