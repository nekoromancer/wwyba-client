<template>
  <div class="result-container container">
    <section class="result-wrapper">
      <event-info-header
        :title="title"
        :description="description"
      />
      <table-legend />
      <div class="result__time-table-wrapper">
        <date-time-table
          :dates="dates"
          :times="times"
          :example="false">
          <template slot="tableBody">
            <tr
              v-for="each in result"
              :key="each.name">
              <th class="timetable__th">
                {{each.name}}
              </th>
              <td
                v-for="(answer, idx) in each.answers"
                :key="idx"
                class="timetable__td answer-column">
                <i
                  v-if="answer === 'ok'"
                  class="far fa-circle"></i>
                <i
                  v-else-if="answer === 'hold'"
                  class="fas fa-question"></i>
                <i
                  v-else-if="answer === 'not'"
                  class="fas fa-times"></i>
              </td>
            </tr>
          </template>
        </date-time-table>
      </div>
      <div class="result__button-wrapper">
        <nuxt-link to="/">
          <button class="custom-button button--green result__button result__button-to-top">
            메인 페이지로 <i class="fas fa-undo-alt"></i>
          </button>
        </nuxt-link>
      </div>
    </section>
  </div>
</template>
<script>
  import EventInfoHeader from '~/components/commons/event-info-header';
  import DateTimeTable from '~/components/commons/date-time-table';
  import TableLegend from '~/components/commons/table-legend';
  import _ from 'lodash';

  export default {
    name: 'result',
    components: {
      EventInfoHeader,
      DateTimeTable,
      TableLegend,
    },
    async fetch ({app, store, params, redirect}) {
      const response = await app.$axios.get(`/votes?id=${params.id}`);

      if (response.data.result) {
        const votes = response.data.result.votes;

        store.commit('result/setEventInfo', {
          title: response.data.result.title,
          description: response.data.result.description,
          timeTable: response.data.result.timeTables,
          result: _.map(votes, $item => {
            $item.answers = $item['vote_results'].split('|');
            return $item;
          }),
        });
      } else {
        return redirect(`/`);
      }
    },
    head () {
      return {
        meta: [
          {name: 'title', content: this.$store.state.attendance.title},
          {name: 'description', content: this.$store.state.attendance.description}
        ]
      }
    },
    data () {
      const timeTableData = this.$store.state.result.timeTable;

      this.$store.commit('event/setTimeTable', timeTableData);
      const timeTable = this.$store.getters['event/timeTable'];
      const dates = timeTable.dates;
      const times = timeTable.times;

      return {
        title: this.$store.state.result.title,
        description: this.$store.state.result.description,
        result: this.$store.state.result.result,
        dates,
        times,
      }
    }
  }
</script>
<style lang="scss" scoped>
  .result-wrapper {
    position: relative;
    overflow: hidden;
    padding: 1em;
  }

  .result__time-table-wrapper {
    position: relative;
    overflow: auto;
  }

  .timetable {
    margin-bottom: 2em;
  }

  .answer-column {
    background: $gunMetal;
    .fa-circle {
      color: $lightGreen;
    }

    .fa-question {
      color: $yellow;
    }

    .fa-times {
      color: $red;
    }
  }

  .result__button-wrapper {
    padding: 2em 0;
  }

  .result__button {
    width: 100%;
  }
</style>
