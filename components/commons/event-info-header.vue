<template>
  <div class="event-info-header">
    <h1
      class="event-info-header__title">
      {{title}}
    </h1>
    <textarea
      tabindex="1"
      readonly
      class="event-info-header__textarea"
      v-model="description"></textarea>
  </div>
</template>
<script>
  export default {
    name: 'event-info-header',
    props: {
      title: String,
      description: String,
    }
  }
</script>
<style lang="scss" scoped>
  .event-info-header__title {
    font-size: 1.5em;
    margin-bottom: 1em;
  }

  .event-info-header__textarea {
    width: 100%;
    height: 6.75em;
    padding: 1em;
    margin-bottom: 1em;
    resize: none;
    border: 1px solid $gray;
    line-height: 1.5em;
  }
</style>
