<template>
  <div id="people">

  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: "PcPeople",
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

<style>

</style>