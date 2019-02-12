<template>
  <p class="table-legend">
    <span><i class="far fa-circle"></i>: 가능</span>
    <span><i class="fas fa-question"></i>: 모름</span>
    <span><i class="fas fa-times"></i>: 불가</span>
  </p>
</template>
<script>
  export default {
    name: 'table-legend'
  }
</script>
<style lang="scss" scoped>
  .table-legend {
    text-align: right;
    margin: 0;

    span {
      display: inline-block;
      margin-right: 1em;

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
