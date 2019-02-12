<template>
  <make-event-container>
    <div class="make-event_wrapper">
      <div class="make-event__input-wrapper">
        <make-event-input-header
          header="날짜별로 시간을 입력합니다."
          caution="(※ 날짜당 3개까지 가능합니다)"/>
        <div
          class="make-event__date-list">
          <div
            class="make-event__date-item"
            v-for="(date, idx) in (dates)"
            :key="idx">
            <p 
              class="make-event__date-wrapper"
              @click="openAddTimeModal(idx)">
              <span class="make-event__date-text">
                {{moment(date.dateObject).format('YYYY년 MM월 DD일')}}
              </span>
              <button
                class="make-event__add-time-button">
                <i class="fas fa-plus-circle"></i>
              </button>
            </p>
            <div class="make-event__date-times">
              <p
                v-if="times[idx].length === 0"
                class="make-event__guide-text guide-text">
                여기에 시간이 추가됩니다.
              </p>
              <transition-group name="date-time-item" tag="ul">
                <datetime-item
                  v-for="time in times[idx]"
                  :key="time"
                  :datetimeText="moment(time, 'hmm').locale('ko').format('A hh:mm')"
                  :target="time"
                  :removeFunction="removeTime(idx, time)"/>
              </transition-group>
            </div>
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
          :isDisabled="false"
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
    name: 'make-event-step4-b',
    components: {
      MakeEventContainer,
      MakeEventInputHeader,
      MakeEventBackButton,
      MakeEventNextButton,
      DatetimeItem,
    },
    data () {
      return {
        eventTitle: this.$store.state.event.title,
        eventDescription: this.$store.state.event.description,
        eventDates: this.$store.state.event.dates,
        timeType: this.$store.state.event.timeType,
        dates: this.$store.getters['event/dates'],
      }
    },
    computed: {
      times () {
        return this.$store.getters['event/times'];
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
        this.timeType !== 'each') {
        this.$router.push({
          name: 'make-event-step4'
        });
      }
    },
    methods: {
      moment,
      openAddTimeModal ($idx) {
        if (this.times[$idx].length < 3) {
          this.$store.commit('event/setTargetIndex', $idx);
          this.$store.commit('modal/open', {
            templateName: 'AddTime',
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
      removeTime ($idx, $time) {
        return () => {
          this.$store.commit('event/removeTimeInDate', {
            index: $idx,
            time: $time,
          });
        }
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
  .make-event__date-wrapper {
    display: inline-block;
    padding: 0.4em 0em 0.25em 1em;
    border: 1px solid $gunMetal;
    border-radius: 2em;
    color: $gunMetal;
    cursor: pointer;
  }

  .make-event__add-time-button {
    background: transparent;
    border: 0;
  }

  .make-event__date-times {
    padding: 0.75em 0.5em 0.5em;
    margin-bottom: 1em;
    border: 1px solid $gray;
    border-radius: 2px;
  }

  .make-event__guide-text {
    position: relative;
    top: -0.25em;
  }
</style>
