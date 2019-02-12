<template>
  <li
    class="make-event__date-item">
    {{datetimeText}}
      <button
        class="make-event__remove-date"
        @click="removeFunction(target)">
        <i class="far fa-times-circle"></i>
      </button>
  </li>
</template>
<script>
  export default {
    name: 'datetime-item',
    props: {
      datetimeText: String,
      target: null,
      removeFunction: Function
    }
  }
</script>
<style lang="scss" scoped>
  .make-event__date-item {
    display: inline-block;
    margin: 0 0.25em 0.25em 0;
    padding: 0.55em 0.5em 0.5em 1em;
    background-color: $lightGreen;
    border-radius: 1.5em;
    font-size: 14px;
    color: $white;
  }

  .make-event__remove-date {
    padding: 0;
    margin: 0 0.25em 0 0.5em;
    vertical-align: middle;
    background: transparent;
    border: 0;
    font-size: 1.25em;

    .fa-times-circle {
      color: $white;
    }
  }
</style>
