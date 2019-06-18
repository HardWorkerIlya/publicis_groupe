<template>
  <button
    class="pc-button"
    @click.prevent="$emit('pc-click')"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'PcButton',
  props: {
    text: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
.pc-button {
  display: block;
  height: 46px;
  min-width: 184px;
  margin: 30px auto 0;
  padding: 0;
  text-transform: uppercase;
  background: #86764B;
  border-radius: 4px;
  color: #ffffff;
  font: inherit;
  font-weight: bold;
  cursor: pointer;

  &:focus {
    outline: none;
    border: none;
  }

  &:active {
    border: none;
  }

  &:hover {
    background: #424242;

    &:focus {
      background: #000000;
    }
  }
}
</style>