<template>
  <make-event-container>
    <div class="make-event__wrapper">
      <div class="make-event__input-wrapper">
        <make-event-input-header
          header="모든 날짜에 같은 시간을 추가합니다."
          caution="(※ 3개까지 가능합니다)"/>
        <div class="make-event__add-times">
          <button
            class="make-event__add-times-button custom-button button--white"
            @click="openAddTimeModal">
            <i class="fas fa-plus-circle"></i>
          </button>

          <div class="make-event__input-times">
            <p v-if="times.length === 0"
               class="make-event__guide-text guide-text">
              여기에 시간이 추가됩니다
            </p>
            <transition-group name="date-time-item" tag="ul">
              <datetime-item
                v-for="time in times"
                :key="time"
                :datetimeText="moment(time, 'hmm').locale('ko').format('A hh:mm')"
                :target="time"
                :removeFunction="removeTime"/>
            </transition-group>
          </div>
        </div>
      </div>
      <div
        class="make-event__input-button-wrapper"
        :class="{'input-button-wrapper--modify': isModify}">
        <make-event-back-button
          v-if="!isModify"
          routerName="make-event-step4"/>

        <make-event-next-button
          :buttonString="isModify ? '수정' : '다음'"
          :isDisabled="isDisabled"
          :nextAction="toNextStep"/>
      </div>
    </div>
  </make-event-container>
</template>
<script>
  import MakeEventContainer from '~/components/make-event/make-event-container';
  import MakeEventInputHeader from '~/components/make-event/event-header';
  import MakeEventNextButton from '~/components/make-event/next-button';
  import MakeEventBackButton from '~/components/make-event/back-button';
  import DatetimeItem from '~/components/make-event/datetime-item';
  import * as moment from 'moment';

  export default {
    name: 'make-event-step4-a',
    components: {
      MakeEventContainer,
      MakeEventInputHeader,
      MakeEventNextButton,
      MakeEventBackButton,
      DatetimeItem,
    },
    data () {
      return {
        eventTitle: this.$store.state.event.title,
        eventDescription: this.$store.state.event.description,
        eventDates: this.$store.getters['event/dates'],
        timeType: this.$store.state.event.timeType,
      }
    },
    created () {
      if (!this.eventTitle
        || this.eventTitle.trim().length === 0) {
        this.$router.push({
          name: 'make-event-step1'
        });
      } else if (!this.eventDescription
        || this.eventDescription.trim().length === 0) {
        this.$router.push({
          name: 'make-event-step2'
        });
      } else if (!this.eventDates ||
        this.eventDates.length === 0) {
        this.$router.push({
          name: 'make-event-step3'
        });
      } else if (!this.timeType ||
        this.timeType !== 'same') {
        this.$router.push({
          name: 'make-event-step4'
        });
      }
    },
    computed: {
      times () {
        return this.$store.getters['event/times'];
      },
      isDisabled () {
        return this.times.length === 0;
      },
      isModify () {
        return !!this.$route.query.from;
      }
    },
    methods: {
      moment,
      openAddTimeModal () {
        if (this.times.length < 3) {
          this.$store.commit('modal/open', {
            templateName: 'AddTime'
          });
        } else {
          this.$toasted.error('시간은 3개까지만 추가 가능합니다.', {
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
      },
      removeTime ($time) {
        this.$store.commit('event/removeTime', $time);
      },
      toNextStep () {
        const route = {};
        const from = this.$route.query.from;

        if (!!from) {
          route.name = 'make-event-step6';
        } else {
          route.name = 'make-event-step5';
        }

        this.$store.commit('event/createTimeTable');
        this.$router.push(route);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .make-event__add-times-button {
    width: 100%;
    border-radius: 2em;
    height: 2em;
    margin-bottom: 0.5em;
    background: transparent;
    font-size: 1.2em;
  }

  .make-event__input-times {
    min-height: 50px;
    margin-bottom: 1em;
    padding: 0.5em;
    border: 1px solid $gray;
  }
</style>
