<template>
  <button
    class="modify-button"
    @click="modifyTo">
    <i class="far fa-edit modify-button__icon"></i>
    <span
      class="modify-button__text"> {{label ? label : '수정'}}</span>
  </button>
</template>
<script>
  export default {
    name: 'modify-button',
    props: {
      label: String,
      name: String,
      from: String,
    },
    methods: {
      modifyTo () {
        this.$router.push({
          name: this.name,
          query: {
            from: this.from
          }
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .modify-button {
    padding: 0;
    font-size: 14px;
    background: transparent;
    border: 0;
    cursor: pointer;
  }

  .modify-button__icon {
    color: $gunMetal;
  }

  .modify-button__text {
    color: $darkGreen;
  }
</style>
