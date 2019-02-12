<template>
  <make-event-container>
    <div class="make-event__wrapper">
      <div class="make-event__input-wrapper">
        <make-event-input-header
          header="제목을 입력해주세요"
          caution="(※ 100자 이내)"/>
        <input
          class="make-event__input input-box"
          type="text"
          title="일정 제목"
          placeholder="ex) 이번달 회식 일정"
          :value="eventTitle"
          @input="inputTitle"
          @keyup.enter="setTitle">
        <char-counter
          :string="eventTitle"
          :max="100"/>
      </div>
      <div
        class="make-event__input-button-wrapper"
        :class="{'input-button-wrapper--modify': isModify}">
        <make-event-back-button
          v-if="!isModify"
          label="처음 화면으로"
          routerName="index"/>

        <make-event-next-button
          :buttonString="isModify ? '수정' : '다음'"
          :isDisabled="isDisabled"
          :nextAction="setTitle"/>
      </div>
    </div>
  </make-event-container>
</template>
<script>
  import MakeEventContainer from '~/components/make-event/make-event-container';
  import MakeEventInputHeader from '~/components/make-event/event-header';
  import MakeEventNextButton from '~/components/make-event/next-button';
  import MakeEventBackButton from '~/components/make-event/back-button';
  import CharCounter from '~/components/commons/char-counter';

  export default {
    name: 'make-event-step1',
    components: {
      MakeEventContainer,
      MakeEventInputHeader,
      MakeEventNextButton,
      MakeEventBackButton,
      CharCounter,
    },
    data () {
      return {
        eventTitle: this.$store.state.event.title,
      }
    },
    computed: {
      isDisabled () {
        return !this.eventTitle
          || this.eventTitle.trim().length === 0
          || this.eventTitle.trim().length > 100;
      },
      isModify () {
        return !!this.$route.query.from;
      }
    },
    methods: {
      inputTitle ($event) {
        this.eventTitle = $event.target.value;
      },
      setTitle () {
        const route = {};
        const from = this.$route.query.from;

        if (!!from) {
          route.name = from;
        } else {
          route.name = 'make-event-step2';
        }

        if (this.eventTitle.trim().length > 100) {
          this.$toasted.error('제목은 100자 이하입니다.', {
            icon: 'exclamation-triangle',
            duration: 5000,
            action: {
              text: '닫기',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          });
        } else {
          this.$store.commit('event/setTitle', this.eventTitle.trim());
          this.$router.push(route);
        }
      }
    },
  }
</script>
<style lang="scss" scoped>

</style>
