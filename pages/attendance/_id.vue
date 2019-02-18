<template>
  <div class="attendance-container container">
    <section class="attendance-wrapper">
      <event-info-header
        :title="title"
        :description="description"
      />
      <label class="attendant-name-wrapper">
        <input
          tabindex="1"
          type="text"
          class="attendance__attendant-name input-box"
          placeholder="이름을 입력해주세요."
          v-model="attendantName">
      </label>
      <p class="attendance-guide">
        ※ 참석 가능한 날짜(시간)에 답변해 주세요.
      </p>
      <table-legend />
      <div class="attendance__time-table-wrapper">
        <date-time-table
          :dates="dates"
          :times="times"
          :example="false">
          <template slot="tableBody">
            <tr>
              <th
                rowspan="3"
                class="timetable__th">
                가능여부
              </th>
              <td
                class="timetable__td answer-column"
                v-for="(dateTime, idx) in timeTable"
                :key="`${dateTime.date}${dateTime.hour}${dateTime.minute}`">
                <label
                  :tabindex="3 * idx + 1"
                  @keypress.enter.space="setAnswer(idx, 'ok')"
                  class="timetable__answer-label">
                  <input
                    class="timetable__answer-input timetable__answer-input--ok"
                    type="radio"
                    v-model="answers[idx]"
                    :name="`${dateTime.date}${dateTime.hour}${dateTime.minute}`"
                    value="ok">
                  <i class="far fa-circle"></i>
                </label>
              </td>
            </tr>
            <tr>
              <td
                class="timetable__td answer-column"
                v-for="(dateTime, idx) in timeTable"
                :key="`${dateTime.date}${dateTime.hour}${dateTime.minute}`">
                <label
                  :tabindex="3 * idx + 2"
                  @keypress.enter.space="setAnswer(idx, 'hold')"
                  class="timetable__answer-label">
                  <input
                    class="timetable__answer-input timetable__answer-input--hold"
                    type="radio"
                    v-model="answers[idx]"
                    :name="`${dateTime.date}${dateTime.hour}${dateTime.minute}`"
                    value="hold">
                  <i class="fas fa-question"></i>
                </label>
              </td>
            </tr>
            <tr>
              <td
                class="timetable__td answer-column"
                v-for="(dateTime, idx) in timeTable"
                :key="`${dateTime.date}${dateTime.hour}${dateTime.minute}`">
                <label
                  :tabindex="3 * idx + 3"
                  @keypress.enter.space="setAnswer(idx, 'not')"
                  class="timetable__answer-label">
                  <input
                    class="timetable__answer-input timetable__answer-input--not"
                    type="radio"
                    v-model="answers[idx]"
                    :name="`${dateTime.date}${dateTime.hour}${dateTime.minute}`"
                    value="not">
                  <i class="fas fa-times"></i>
                </label>
              </td>
            </tr>
          </template>
        </date-time-table>
      </div>
      <div class="attendance__button-wrapper">
        <button
          class="custom-button button--white attendance__show-result-button"
          @click="showResult"
          tabindex="110">
          <i class="far fa-edit modify-button__icon"></i> 결과보기
        </button>
        <button
          class="custom-button button--green attendance__submit"
          @click="submit"
          tabindex="120">
          <i class="far fa-check-circle"></i> 제출하기
        </button>
      </div>
    </section>
  </div>
</template>
<script>
  import EventInfoHeader from '~/components/commons/event-info-header';
  import DateTimeTable from '~/components/commons/date-time-table';
  import TableLegend from '~/components/commons/table-legend';

  export default {
    name: 'attendance-event',
    components: {
      EventInfoHeader,
      DateTimeTable,
      TableLegend,
    },
    async fetch ({app, store, params, redirect}) {
      const response = await app.$axios.get(`/events?id=${params.id}`);

      if (!response.data.event.result) {
        if (response.data.event.message === 'eventNotExist') {
          return redirect(`/`);
        } else {
          return redirect(`/password/${params.id}`);
        }
      } else {
        const event = {
          title: response.data.event.title,
          description: response.data.event.description,
          timeTableData: response.data.event.timeTable,
        };

        store.commit('attendance/setEventInfo', event);
      }
    },
    head () {
      return {
        meta: [
          {name: 'title', content: this.$store.state.attendance.title},
          {name: 'description', content: this.$store.state.attendance.description},
          {hid: 'og:url', property: 'og:url', content: `${process.env.HOST_URL}/attendance/${this.$route.params.id}`},
          {hid: 'og:title', property: 'og:title', content: this.$store.state.attendance.title},
          {hid: 'og:description', property: 'og:description', content: this.$store.state.attendance.description},
        ]
      }
    },
    data () {
      const timeTableData = this.$store.state.attendance.timeTableData;
      this.$store.commit('event/setTimeTable', timeTableData);

      const timeTable = this.$store.getters['event/timeTable'];
      const dates = timeTable.dates;
      const times = timeTable.times;
      const timeTableLength = timeTableData.length;
      const answers = [];

      for (let i = 0; i < timeTableLength; i++) {
        answers.push('hold');
      }

      return {
        timeTable: timeTableData,
        dates,
        times,
        answers,
        attendantName: '',
        title: this.$store.state.attendance.title,
        description: this.$store.state.attendance.description,
      }
    },
    methods: {
      setAnswer ($idx, $value) {
        this.$set(this.answers, $idx, $value);
      },
      showResult () {
        const id = this.$route.params.id;

        this.$router.push({
          path: `/result/${id}`
        });
      },
      submit () {
        const id = this.$route.params.id;

        if (this.attendantName.trim().length > 0) {
          this.$swal.fire({
            title: '결과를 제출 하시겠습니까?',
            text: '제출하면 내용을 수정할 수 없습니다.',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: '취소',
            confirmButtonText: '제출',
            cancelButtonColor: '#c8c8c8',
            confirmButtonColor: '#248232',
          }).then(result => {
            if (!!result.value) {
              this.$axios.post('/votes', {
                id,
                name: this.attendantName,
                voteResults: this.answers.join('|')
              }).then(res => {
                if (!!res.data.result) {
                  this.$router.push({
                    path: `/result/${id}`
                  });
                } else {
                  this.$toasted.error('다시 시도해 주세요!', {
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
              });
            }
          });
        } else {
          this.$toasted.error('이름을 입력해 주세요.', {
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
  .attendance-container {
    background-color: $white;
  }

  .attendance-wrapper {
    position: relative;
    overflow: hidden;
    padding: 1em;
  }

  .attendance-guide {
    font-size: 1em;
  }

  .attendance__attendant-name {
    margin-bottom: 1em;
  }

  .timetable {
    margin-bottom: 2em;
  }
  
  .attendance__time-table-wrapper {
    position: relative;
    overflow: auto;
  }

  .timetable__td.answer-column {
    position: relative;
    padding: 2em 0;
  }

  .timetable__answer-label {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2em;
    cursor: pointer;
  }
  
  .timetable__answer-input {
    display: none;

    &:checked {
      &.timetable__answer-input--ok + svg {
        color: $lightGreen;
      }

      &.timetable__answer-input--hold + svg {
        color: $yellow;
      }

      &.timetable__answer-input--not + svg {
        color: $red;
      }
    }
  }

  .attendance__button-wrapper {
    display: flex;
    justify-content: space-between;

    button {
      width: 49%;
    }
  }
</style>
