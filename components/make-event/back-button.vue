<template>
  <button
    class="make-event__back-button custom-button button--white"
    @click="backAction">
    {{label ? label : '이전 단계로'}} <i class="fas fa-undo-alt"></i>
  </button>
</template>
<script>
  export default {
    name: 'make-event-back-button',
    props: {
      routerName: String,
      label: String,
    },
    methods: {
      backAction () {
        this.$router.push({
          name: this.routerName
        });
      }
    }
  }
</script>
