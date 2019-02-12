<template>
  <section class="container index-container">
    <section class="introduce-section">
      <h1 class="introduce-section__title">
        <span class="introduce-section__title__text introduce-section__title__text--first">
          시간
        </span>
        <span class="introduce-section__title__text introduce-section__title__text--second">
          언제
        </span>
        <span class="introduce-section__title__text introduce-section__title__text--third">
          괜찮으세요?
        </span>
        <span class="introduce-section__title__circle introduce-section__title__circle--orange"></span>
      </h1>
      <p class="introduce-section__description">
        골치 아픈 모임 날짜 잡기<br>
        간단하게 해보세요!<br><br>
        총대를 맨 당신을 응원합니다.
      </p>
      <div class="introduce-section__button_wrapper">
          <button
            class="introduce-section__button custom-button button--white">
            <span class="introduce-section__button__label">도움말</span> <i class="far fa-question-circle"></i>
          </button>
        <nuxt-link :to="{name: 'make-event-step1'}">
          <button class="introduce-section__button custom-button button--gray">
            <span class="introduce-section__button__label">시작하기</span> <i class="far fa-play-circle"></i>
          </button>
        </nuxt-link>
      </div>
    </section>
  </section>
</template>

<script>
  export default {
    name: 'main-page',
    created () {
      this.$store.commit('event/init');
    },
  }
</script>

<style lang="scss" scoped>
  .index-container {
    background-color: $darkGreen;
    justify-content: center;
    align-self: center;
  }

  .introduce-section {
    width: 100%;
  }

  .introduce-section__title {
    z-index: 0;
    position: relative;
    width: 100px;
    height: 100px;
    margin: 0 auto 1em;
    background-color: $white;
    border-radius: 50%;
    box-shadow: 3px 3px 1px $black;
    text-shadow: 1px 1px $white;
    text-align: center;
  }

  .introduce-section__title__text {
    position: relative;
    display: block;
  }

  .introduce-section__title__text--first {
    top: 8px;
    left: -24px;
    font-weight: bold;
    color: $black;
  }

  .introduce-section__title__text--second {
    font-size: 20px;
    top: 4px;
    left: 12px;
    color: $gunMetal;
  }

  .introduce-section__title__text--third {
    left: 17px;
    top: 4px;
    word-break: keep-all;
    font-size: 26px;
    font-weight: bold;
    color: $black;
  }

  .introduce-section__title__circle {
    position: absolute;
    display: block;
    border-radius: 50%;
  }

  .introduce-section__title__circle--orange {
    z-index: -1;
    bottom: 0;
    left: 0;
    width: 1.25em;
    height: 1.25em;
    background-color: $orange;
  }

  .introduce-section__description {
    margin: 0 0 1em;
    padding: 1em 0;
    line-height: 1.5em;
    text-align: center;
    font-size: 18px;
    color: $white;
  }

  .introduce-section__button_wrapper {
    text-align: center;
    letter-spacing: 0.2em;
  }

  .introduce-section__button {
    width: 30%;
  }

  .introduce-section__button__label + svg {
    vertical-align:  middle;
  }
</style>

