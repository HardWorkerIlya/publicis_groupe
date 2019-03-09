<template>
  <div id="app">
    <PcHeader/>
    <router-view/>
    <PcFooter/>
  </div>
</template>

<script>
import PcHeader from './components/PcHeader.vue'
import PcFooter from './components/PcFooter.vue'

export default {
  name: 'app',
  components: {
    PcHeader,
    PcFooter
  }
}
</script>

<style lang="scss">
@import "./assets/styles";

#app {
  background-color: #ffffff;
}
</style>
