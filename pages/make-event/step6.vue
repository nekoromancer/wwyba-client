<template>
  <make-event-container>
    <div class="make-event__wrapper">
      <div class="make-event__input-wrapper">
        <make-event-input-header
          header="다음과 같이 시간표가 생성됩니다."
          caution="(표를 좌우로 스크롤해서 확인해 보세요)"/>

        <section
          class="make-event__timetable-header">
          <h1
            class="make-event__timetable__title">
            {{eventTitle}}
            <modify-button
              label="제목 수정"
              name="make-event-step1"
              from="make-event-step6"/>
          </h1>
          <textarea
            class="make-event__timetable__description"
            v-model="eventDescription"
            readonly></textarea>
          <p
            class="make-event__modify-wrapper">
            <modify-button
              label="설명 수정"
              name="make-event-step2"
              from="make-event-step6"/>
          </p>
          <p
            class="make-event__timetable__voting-mode">
            공개설정: {{votingMode}}
          </p>
          <p
            class="make-event__modify-wrapper">
            <modify-button
              label="공개설정 수정"
              name="make-event-step5"
              from="make-event-step6"/>
          </p>
        </section>
      </div>
      <div class="make-event__input-wrapper table-wrapper">
        <date-time-table
          :dates="dates"
          :times="times"/>
      </div>
      <p
        class="make-event__modify-wrapper modify-time-table">
        <modify-button
          label="시간표 수정"
          name="make-event-step3"
          from="make-event-step6"/>
      </p>
      <div class="make-event__input-button-wrapper">
        <make-event-back-button
          routerName="make-event-step5"/>

        <button
          @click="submit"
          class="custom-button button--green">
          만들기 <i class="far fa-check-circle"></i>
        </button>
      </div>
    </div>
  </make-event-container>
</template>
<script>
  import MakeEventContainer from '~/components/make-event/make-event-container';
  import MakeEventInputHeader from '~/components/make-event/event-header';
  import MakeEventNextButton from '~/components/make-event/next-button';
  import MakeEventBackButton from '~/components/make-event/back-button';
  import DateTimeTable from '~/components/commons/date-time-table';
  import ModifyButton from '~/components/commons/modify-button';

  export default {
    name: 'make-event-step6',
    components: {
      MakeEventContainer,
      MakeEventInputHeader,
      MakeEventNextButton,
      MakeEventBackButton,
      DateTimeTable,
      ModifyButton,
    },
    data () {
      const timeTable = this.$store.getters['event/timeTable'];
      const dates = timeTable.dates;
      const times = timeTable.times;

      const votingMode = this.$store.state.event.votingMode === 'public'
        ? '누구나 참여'
        : '비밀번호 사용';

      return {
        dates,
        times,
        votingMode,
        eventTitle: this.$store.state.event.title,
        eventDescription: this.$store.state.event.description,
        eventDates: this.$store.state.event.dates,
        timeType: this.$store.state.event.timeType,
        timeTable: this.$store.state.event.timeTable,
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
      } else if (!this.timeType) {
        this.$router.push({
          name: 'make-event-step4'
        });
      } else if (this.timeTable.length === 0) {
        let name;

        if (this.timeType === 'none') {
          name = 'make-event-step4';
        } else if (this.timeType === 'same') {
          name = 'make-event-step4-a'
        } else if (this.timeType === 'each') {
          name = 'make-event-step4-b'
        }
        this.$router.push({
          name
        });
      }
    },
    methods: {
      submit () {
        this.$axios.post('/events', {
          eventTitle: this.eventTitle,
          eventDescription: this.eventDescription,
          votingMode: this.$store.state.event.votingMode,
          votingPassword: this.$store.state.event.votingPassword,
          timeTable: this.timeTable,
        }).then(res => {
          this.$store.commit('event/setHashString', res.data.id);
          this.$router.push({
            name: 'make-event-complete'
          });
        }).catch(err => {
          console.error(err);

          this.$toasted.error('다시 시도 해주세요!', {
            icon: 'exclamation-triangle',
            duration: 5000,
            action: {
              text: '닫기',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          });
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .table-wrapper {
    overflow: auto;
  }

  .make-event__timetable__voting-mode {
    margin: 0 0 0.5em 0;
    font-size: 14px;
    text-align: right;
    font-weight: bold;
  }

  .make-event__timetable__title {
    margin-bottom: 1em;
  }

  .make-event__timetable__description {
    width: 100%;
    min-height: 3em;
    resize: none;
    border: 1px solid $gray;
    padding: 1em;
    line-height: 1.5em;
  }

  .make-event__modify-wrapper {
    margin: 0 0 1em 0;
    text-align: right;

    &.modify-time-table {
      padding-right: 1em;
    }
  }
</style>
