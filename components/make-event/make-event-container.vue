<template>
  <div class="container make-event-container">
    <slot name="modal"></slot>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'make-event-container'
  }
</script>
<style lang="scss" scoped>
  .make-event-container {
    background: $white;
  }

  .make-event__wrapper {
    position: relative;
    width: 100%;
  }

  .make-event__event-info-wrapper {
    padding: 1em;
  }

  .make-event__input-wrapper {
    padding: 1em;
    overflow: hidden;
  }

  .make-event__input {
    margin-bottom: 0.5em;
  }

  .make-event__input-button-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 1em;

    button {
      width: 49%;
    }

    &.input-button-wrapper--modify {
      button {
        width: 100%;
      }
    }
  }
</style>
