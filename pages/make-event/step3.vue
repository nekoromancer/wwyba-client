<template>
  <make-event-container>
    <div class="make-event_wrapper">
      <div class="make-event__input-wrapper">
        <make-event-input-header
          header="날짜를 선택해서 추가해 주세요"
          caution="(※ 10개까지 가능합니다)"/>
        <datepicker
          :inline="true"
          :language="calendarLanguage"
          :maximum-view="'month'"
          @selected="addDate"/>
        <div class="make-event__input-dates">
          <p v-if="eventDates.length === 0"
             class="make-event__guide-text guide-text">
            여기에 날짜가 추가됩니다
          </p>
          <transition-group name="date-time-item" tag="ul">
            <datetime-item
              v-for="item in eventDates"
              :key="item.dateString"
              :datetimeText="moment(item.dateObject).format('YYYY년 MM월 DD일')"
              :target="item"
              :removeFunction="removeDate"/>
          </transition-group>
        </div>
      </div>
      <div
        class="make-event__input-button-wrapper"
        :class="{'input-button-wrapper--modify': isModify}">
        <make-event-back-button
          v-if="!isModify"
          routerName="make-event-step2"/>

        <make-event-next-button
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
  import Datepicker from 'vuejs-datepicker';
  import {ko} from 'vuejs-datepicker/dist/locale';
  import * as moment from 'moment';
  import _ from 'lodash';

  export default {
    name: 'make-event-step3',
    components: {
      MakeEventContainer,
      MakeEventInputHeader,
      MakeEventNextButton,
      MakeEventBackButton,
      DatetimeItem,
      Datepicker,
    },
    data () {
      const calendarLanguage = ko;
      ko.ymd = true;

      return {
        eventTitle: this.$store.state.event.title,
        eventDescription: this.$store.state.event.description,
        eventDates: this.$store.getters['event/dates'],
        calendarLanguage
      }
    },
    computed: {
      isDisabled () {
        return this.eventDates.length === 0;
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
      }
    },
    methods: {
      moment,
      addDate ($date) {
        if (this.isModify) {
          this.$store.commit('event/initTime');
        }

        if (this.eventDates.length >= 10) {
          this.$toasted.error('날짜는 10개까지 입니다.', {
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
          const dateString = moment($date).format('YYYY-MM-DD');

          if (_.filter(this.eventDates, {dateString}).length === 0) {
            this.$store.commit(
              'event/addDate', {
                dateObject: $date,
                dateString
              });

            this.eventDates = this.$store.getters['event/dates'];
          }
        }
      },
      removeDate ($date) {
        if (this.isModify) {
          this.$store.commit('event/initTime');
        }

        this.$store.commit(
          'event/removeDate', $date
        );

        this.eventDates = this.$store.getters['event/dates'];
      },
      toNextStep () {
        const route = {};
        const from = this.$route.query.from;

        if (!!from) {
          route.query = {from}
        }

        route.name = 'make-event-step4';

        this.$router.push(route);
      }
    }
  }
</script>
<style lang="scss">
  .vdp-datepicker__calendar {
    margin: 0 auto 1em;

    .sat {
      color: blue;
    }

    .sun {
      color: $red;
    }

    .cell.selected {
      color: $white;
      background: $lightGreen;

      &:hover {
        color: $white;
        background: $lightGreen;
      }
    }
  }

  .make-event__input-dates {
    min-height: 50px;
    padding: 0.5em;
    border: 1px solid $gray;
    text-align: center;
  }
</style>
