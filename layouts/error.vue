<template>
  <div class="container error-container">
    <section class="error__wrapper">
      <p class="error__icon-wrapper">
        <i class="far fa-surprise error__icon"></i>
      </p>
      <h1
        class="error__header"
        v-if="error.statusCode === 404">페이지를 찾을 수 없습니다</h1>
      <h1
        v-else
        class="error__header">무엇인가 잘못 되었습니다</h1>
      <p class="error__message">계속해서 이런 문제가 발생하면 관리자에게 문의하세요!</p>
      <div class="error__button-wrapper">
        <nuxt-link to="/">
          <button class="error__button custom-button button--white">
            첫 화면으로
          </button>
        </nuxt-link>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    name: 'error-page',
    props: {
      error: Object
    }
  }
</script>
<style lang="scss" scoped>
  .error-container {
    background: $darkGreen;
    display: flex;
    justify-content: center;
  }

  .error__wrapper {
    padding: 1em;
  }

  .error__icon-wrapper {
    text-align: center;
  }

  .error__icon {
    font-size: 7em;
    color: $white;
    margin-bottom: 0.25em;
  }

  .error__header,
  .error__message {
    color: $white;
    text-align: center;
  }

  .error__message {
    margin-bottom: 3em;
  }

  .error__button-wrapper {
    text-align: center;
  }

  .error__button {
    width: 50%;
  }
</style>
