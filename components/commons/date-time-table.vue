<template>
  <table
    class="timetable">
    <thead>
    <tr>
      <th
        rowspan="2"
        class="timetable__th empty-cell">
      </th>
      <th
        class="timetable__th timetable__dates"
        v-for="date in dates"
        :key="date.string"
        :colspan="date.length"
        :rowspan="date.length === 0 ? 2 : ''">
        {{moment(date.string).locale('ko').format('YYYY년 MM월 DD일')}}
      </th>
    </tr>
    <tr>
      <th
        class="timetable__th timetable__times"
        v-for="(time, idx) in times"
        v-if="time !== null"
        :key="idx">
        {{moment(time, 'hmm').locale('ko').format('A hh:mm')}}
      </th>
    </tr>
    </thead>
    <tbody>
      <tr v-if="example">
        <td
          class="timetable__td">
          이름
        </td>
        <td
          v-for="number in times.length"
          :key="number"
          class="timetable__td answer-column">
          참가 가능 여부
        </td>
      </tr>
      <slot name="tableBody"></slot>
    </tbody>
  </table>
</template>
<script>
  import * as moment from 'moment';

  export default {
    name: 'date-time-table',
    props: {
      dates: Array,
      times: Array,
      example: {
        type: Boolean,
        default: true,
      },
    },
    methods: {
      moment,
    }
  }
</script>
<style lang="scss" scoped>
  .timetable {
    border: 1px solid $gray;
    border-collapse: collapse;
    table-layout: fixed;
  }

  .timetable__th {
    border: 1px solid $gray;
    white-space: nowrap;
    padding: 0.5em 1em;

  &.empty-cell {
     background-color: $white;
   }
  }

  .timetable__td {
    border: 1px solid $gray;
    white-space: nowrap;
    padding: 0.5em 1em;
  }

  .timetable__dates {
    background: $darkGreen;
    color: $white;
  }

  .timetable__times {
    background: $white;
  }

  .answer-column {
    text-align: center;
    font-size: 14px;
    color: $gray;
  }
</style>
