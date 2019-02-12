<template>
  <button
    class="make-event__next-button custom-button button--gray"
    :class="{'button--disabled': isDisabled}"
    :disabled="isDisabled"
    @click="nextAction">
    {{buttonString ? buttonString : '다음'}} <i class="fas fa-arrow-circle-right"></i>
  </button>
</template>
<script>
  export default {
    name: 'make-event-next-button',
    props: {
      isDisabled: Boolean,
      nextAction: Function,
      buttonString: String,
    }
  }
</script>
<style lang="scss" scoped>
  .fa-arrow-circle-right {
    vertical-align: middle;
  }
</style>
