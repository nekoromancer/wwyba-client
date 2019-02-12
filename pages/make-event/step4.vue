<template>
  <make-event-container>
    <div class="make-event__wrapper">
      <div class="make-event__input-wrapper">
        <make-event-input-header
          header="날짜에 시간을 추가하시겠습니까?"/>
        <ul
          class="make-event__time-type">
          <li
            class="make-event__time-type-item">
            <input
              id="no-time"
              class="make-event__time-type-input"
              v-model="timeType"
              type="radio"
              value="none">
            <label
              for="no-time"
              class="make-event__type-type-label">
              날짜만 사용합니다.
            </label>
          </li>
          <li
            class="make-event__time-type-item">
            <input
              id="all-same-time"
              class="make-event__time-type-input"
              v-model="timeType"
              type="radio"
              value="same">
            <label
              for="all-same-time"
              class="make-event__type-type-label">
              모든 날짜에 같은 시간을 추가합니다.
            </label>
          </li>
          <li
            class="make-event__time-type-item">
            <input
              id="each-time"
              class="make-event__time-type-input"
              v-model="timeType"
              type="radio"
              value="each">
            <label
              for="each-time"
              class="make-event__type-type-label">
              날짜마다 다른 시간을 입력합니다.
            </label>
          </li>
        </ul>
      </div>
      <div
        class="make-event__input-button-wrapper"
        :class="{'input-button-wrapper--modify': isModify}">
        <make-event-back-button
          v-if="!isModify"
          routerName="make-event-step3"/>

        <make-event-next-button
          :buttonString="isModify && isTypeNone ? '수정' : '다음'"
          :isDisabled="false"
          :nextAction="setTimeType"/>
      </div>
    </div>
  </make-event-container>
</template>
<script>
  import MakeEventContainer from '~/components/make-event/make-event-container';
  import MakeEventInputHeader from '~/components/make-event/event-header';
  import MakeEventNextButton from '~/components/make-event/next-button';
  import MakeEventBackButton from '~/components/make-event/back-button';
  import TimePicker from '~/components/commons/timepicker';

  export default {
    name: 'make-event-step4',
    components: {
      MakeEventContainer,
      MakeEventInputHeader,
      MakeEventNextButton,
      MakeEventBackButton,
      TimePicker,
    },
    data () {
      return {
        eventTitle: this.$store.state.event.title,
        eventDescription: this.$store.state.event.description,
        eventDates: this.$store.state.event.dates,
        timeType: this.$store.state.event.timeType,
      }
    },
    computed: {
      isModify () {
        return !!this.$route.query.from;
      },
      isTypeNone () {
        return this.timeType === 'none';
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
      } else if (!this.eventDates
        || this.eventDates.length === 0) {
        this.$router.push({
          name: 'make-event-step3'
        });
      }
    },
    methods: {
      setTimeType () {
        const route = {};
        const from = this.$route.query.from;

        if (!!from) {
          route.query = {from}
        }

        this.$store.commit('event/setTimeType', {
          type: this.timeType,
          isModify: !!from,
        });

        if (this.timeType === 'none') {
          this.$store.commit('event/createTimeTable');

          if (!from) {
            route.name = 'make-event-step5';
          } else {
            route.name = 'make-event-step6';
          }
        } else if (this.timeType === 'same') {
          route.name = 'make-event-step4-a'
        } else if (this.timeType === 'each') {
          route.name = 'make-event-step4-b'
        }

        this.$router.push(route);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .make-event__time-type {
    list-style: none;
  }

  .make-event__time-type-item {
    padding: 0.5em 0 0.5em 1em;
  }

  .make-event__time-type-input {
    margin-right: 0.5em;
    vertical-align: middle;
  }
</style>
