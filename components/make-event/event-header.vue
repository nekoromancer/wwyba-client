<template>
  <h1 class="make-event__input-header">
    <slot
      name="header"
      :header="header">
      {{header}}
    </slot>
    <br />
    <slot
      name="caution"
      :caution="caution">
      <span
        v-if="caution"
        class="make-event__input-caution">
        {{caution}}
      </span>
    </slot>
  </h1>
</template>
<script>
  export default {
    name: 'make-event-input-header',
    props: {
      header: String,
      caution: {
        type: String,
        default: null
      }
    }
  }
</script>
<style lang="scss" scoped>
  .make-event__input-header {
    text-align: left;
    font-size: 20px;
    margin-bottom: 1em;
  }

  .make-event__input-caution {
    font-size: 14px;
    color: $red;
  }
</style>
