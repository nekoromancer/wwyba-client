<template>
  <make-event-container>
    <div class="make-event__wrapper">
      <div class="make-event__input-wrapper">
        <make-event-input-header
          header="일정에 대한 설명을 입력해 주세요"
          caution="(※ 500자 이내)"/>
        <textarea
          class="make-event__input make-event__description textarea"
          title="일정 설명"
          placeholder="ex) 이번달 회식에 관한 일정을 듣고자합니다."
          v-model="eventDescription"></textarea>
        <char-counter
          :string="eventDescription"
          :max="500"/>
      </div>
      <div
        class="make-event__input-button-wrapper"
        :class="{'input-button-wrapper--modify': isModify}">
        <make-event-back-button
          v-if="!isModify"
          routerName="make-event-step1"/>

        <make-event-next-button
          :buttonString="isModify ? '수정' : '다음'"
          :isDisabled="isDisabled"
          :nextAction="setDescription"/>
      </div>
    </div>
  </make-event-container>
</template>
<script>
  import MakeEventContainer from "~/components/make-event/make-event-container";
  import MakeEventInputHeader from '~/components/make-event/event-header';
  import MakeEventNextButton from '~/components/make-event/next-button';
  import MakeEventBackButton from '~/components/make-event/back-button';
  import CharCounter from '~/components/commons/char-counter';

  export default {
    name: 'make-event-step2',
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
        eventDescription: this.$store.state.event.description,
      }
    },
    computed: {
      isDisabled () {
        return !this.eventDescription
          || this.eventDescription.trim().length === 0
          || this.eventDescription.trim().length > 500;
      },
      isModify () {
        return !!this.$route.query.from;
      }
    },
    created () {
      if (!this.eventTitle
        || this.eventTitle.trim().length === 0) {
        this.$router.push({
          name: 'make-event-step1'
        });
      }
    },
    methods: {
      setDescription () {
        if (this.eventDescription.trim().length > 500) {
          this.$toasted.error('설명은 500자 이하입니다.', {
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
          const route = {};
          const from = this.$route.query.from;

          if (!!from) {
            route.name = from;
          } else {
            route.name = 'make-event-step3';
          }

          this.$store.commit('event/setDescription', this.eventDescription.trim());
          this.$router.push(route);
        }
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
