<template>
  <section class="time-picker-modal-container">
    <h1 class="time-picker-modal__header">시간을 선택해 주세요</h1>
    <time-picker
      @timeChange="timeChange"/>
    <div class="time-picker-modal__button-wrapper">
      <button
        class="time-picker-modal__cancel custom-button button--white"
        @click="cancel">
        <i class="far fa-times-circle"></i> 취소
      </button>
      <button
        class="time-picker-modal__add custom-button button--gray"
        @click="addTime">
        <i class="fas fa-plus-circle"></i> 추가
      </button>
    </div>
  </section>
</template>
<script>
  import timePicker from '~/components/commons/timepicker';

  export default {
    name: 'modal-add-time',
    components: {
      timePicker
    },
    data () {
      return {
        time: null,
      }
    },
    methods: {
      timeChange ($event) {
        this.time = $event.time;
      },
      cancel () {
        this.$store.commit('modal/close');
      },
      async addTime () {
        if (!this.time) {
          this.time = timePicker
            .data()
            .selectedTime
            .replace(':', '');
        }

        const result = await this.$store.dispatch('event/addTime', this.time);

        if (!!result) {
          this.$store.commit('modal/close');
        } else {
          this.$toasted.error('같은 시간이 있어요!', {
            icon: 'exclamation-triangle',
            duration: 5000,
            action: {
              text: '닫기',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .time-picker-modal-container {
    width: 80%;
    max-width: 720px;
    padding: 1em 0;
    margin: auto;
    border-radius: 1em;
    background: $white;
  }

  .time-picker-modal__header {
    margin-bottom: 1.5em;
    text-align: center;
    font-size: 1.25em;
  }

  .time-picker-modal__button-wrapper {
    padding-top: 1em;
    text-align: center;

    button {
      padding: 0 1em;
      height: 2em;
      font-size: 0.9em;
    }
  }
</style>
