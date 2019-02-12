<template>
  <p class="char-counter">
    <span
      class="char-current-count"
      :class="{'char-current-count--over': string.trim().length > max}">
      {{string.trim().length}}
    </span> / {{max}}
  </p>
</template>
<script>
  export default {
    name: 'char-counter',
    props: {
      string: String,
      max: Number,
    }
  }
</script>
<style lang="scss" scoped>
  .char-counter {
    margin: 0;
    font-size: 1em;
    text-align: right;
  }

  .char-current-count--over {
    color: $red;
  }
</style>
