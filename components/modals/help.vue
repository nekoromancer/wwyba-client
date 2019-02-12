<template>
  <div class="help-container">
    <section class="help__wrapper">
      <div class="help__contents">
        <article
          :key="idx"
          v-for="(help, idx) in helps"
          class="help__article"
          :style="{
            transform: 'translate3d('+ ((idx - current) * 100) +'%, 0, 0)'
          }">
          <h2
            v-if="help.header"
            class="help__article__header">
            {{help.header}}
          </h2>
          <div class="help__article__text" v-html="help.text"></div>
        </article>
      </div>
      <div class="help__button-wrapper">
        <button
          @click="slidePrev"
          class="custom-button button--white"
          :class="{
            'button--disabled': currentCount === 0
          }"
          :disabled="currentCount === 0">
          <i class="fas fa-chevron-left"></i> 이전
        </button>
        <button
          @click="slideNext"
          class="custom-button button--white"
          :class="{
            'button--disabled': currentCount === helps.length - 1
          }"
          :disabled="currentCount === helps.length - 1">
          다음 <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    name: 'help',
    data () {
      return {
        current: 0,
        helps: [
          {
            header: '여러명이 만나는 시간약속!',
            text: '여러명이 만나는 모임 일정을<br>잡는 것은 쉬운 일이 아닙니다.<br>하지만 정말 간단하게 하는<br>방법을 알려드릴게요.',
          },
          {
            header: '모임 정보를 입력해요!',
            text: '모임의 제목과 설명을 입력합니다.',
          },
          {
            header: '후보 날짜와 시간을 입력해요!',
            text: '가능한 날짜와 시간을 선택하면<br>시간표가 만들어 집니다!',
          },
          {
            header: '이제 모두에게 알려요!',
            text: 'URL 을 공유하여 모두 언제가 괜찮은지 조사하고 결과를 확인하세요!',
          },
          {
            header: null,
            text: '<p>회원 가입도, 로그인도 필요없고</p><p>시간표는 비밀번호로<br>잠글수도 있어요!</p><p>지금부터 시작해 볼까요?</p>',
          }
        ]
      }
    },
    computed: {
      currentCount () {
        return this.current;
      }
    },
    methods: {
      slideNext () {
        if (this.current < this.helps.length - 1) {
          this.current++;
        }
      },
      slidePrev () {
        if (this.current > 0) {
          this.current--;
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .help-container {
    position: relative;
    width: 80%;
    max-width: 576px;
    height: 100%;
    background-color: $white;
    border-radius: 5px;
    margin: auto;
    padding: 1.5em;
  }

  .help__wrapper {
    overflow: hidden;
    height: 100%;
  }

  .help__contents {
    overflow: hidden;
    position: relative;
    height: 100%;
  }

  .help__article {
    position: absolute;
    width: 100%;
    top: 0;
    background: $white;
    transition: transform 300ms ease-in-out;
  }

  .help__article__header {
    font-size: 1.25em;
    margin-bottom: 1.25em;
    text-align: center;
  }

  .help__article__text {
    text-align: center;
    line-height: 2em;
  }

  .help__button-wrapper {
    position: absolute;
    width: 100%;
    padding: 0 2em;
    bottom: 1em;
    left: 0;
    display: flex;
    justify-content: space-between;

    button {
      width: 48%;
    }
  }
</style>
