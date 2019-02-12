<template>
  <div
    class="time-picker"
    :class="{'time-picker--mobile': isMobileDevice}">
    <input
      class="time-picker__time-input"
      type="time"
      step="5"
      ref="inputTime"
      v-model="selectedTime"
      @input="changeTimeInput">
    <div class="time-picker__wrapper">
      <div
        class="time-picker__selector time-picker__hour-selectors">
        <select
          class="time-picker__select"
          title="hours"
          v-model="selectedHours"
          @change="changeTimeSelect">
          <option
            v-for="hour in range(1, 24)"
            :key="`${hour}HH`"
            :value="pad(hour, 2, '0')">
            {{hour}}
          </option>
        </select>
        <p class="time-picker__displayed time-picker__displayed-hour">
          <span>{{selectedHours}}
            <i class="fas fa-caret-down"></i>
          </span>
        </p>
      </div>
      <div class="time-picker__colon">
        <span class="time-picker__colon__displayed">:</span>
      </div>
      <div class="time-picker__selector time-picker__minute-selectors">
        <select
          class="time-picker__select"
          title="minutes"
          v-model="selectedMinutes"
          @change="changeTimeSelect">
          <option
            v-for="minute in range(0, 59, 5)"
            :key="`${minute}mm`"
            :value="pad(minute, 2, '0')">
            {{minute}}
          </option>
        </select>
        <p class="time-picker__displayed time-picker__displayed-minute">
          <span>
            {{selectedMinutes}}
            <i class="fas fa-caret-down"></i>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import _ from 'lodash';
  import isMobile from 'ismobilejs';

  export default {
    name: 'time-picker',
    data () {
      return {
        selectedTime: '12:30',
        selectedHours: '12',
        selectedMinutes: '30',
      }
    },
    computed: {
      isMobileDevice () {
        return isMobile.any;
      }
    },
    methods: {
      range: _.range,
      pad: _.padStart,
      changeTimeInput () {
        const selectedTime = this.selectedTime.replace(':', '');
        this.selectedHours = selectedTime.substr(0, 2);
        this.selectedMinutes = selectedTime.substr(2, 2);

        this.$emit('timeChange', {
          time: selectedTime
        });
      },
      changeTimeSelect () {
        this.selectedTime = `${this.selectedHours}:${this.selectedMinutes}`;

        this.$emit('timeChange', {
          time: `${this.selectedHours}${this.selectedMinutes}`
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .time-picker {
    position: relative;
    margin: auto;
    width: 136px;
    height: 36px;
  }

  .time-picker--mobile {
    &.time-picker--mobile {
      width: 154px;
    }

    .time-picker__select {
      display: none;
    }

    .time-picker__selector {
      &:first-child {
        border-right: 0;
      }

      &:last-child {
        border-left: 0
      }
    }

    .time-picker__displayed-hour {
      .fa-caret-down {
        display: none;
      }

      span {
        padding-left: 1.5em;
      }
    }

    .time-picker__displayed-minute {
      .fa-caret-down {
        margin: 0 0.5em;
      }
    }

    .time-picker__colon {
      border: 1px solid lightgray;
      border-left: 0;
      border-right: 0;
      box-shadow:
        inset 0 10px 8px -10px lightgrey,
        inset 0 -10px 8px -10px lightgrey;
    }

    .time-picker__time-input {
      display: block;
    }
  }

  .time-picker__time-input {
    display: none;
    position: absolute;
    opacity: 0;
    width: 100%;
    min-width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .time-picker__wrapper {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    justify-items: center;
    align-items: center;
  }

  .time-picker__selector,
  .time-picker__colon {
    display: flex;
    position: relative;
    height: 100%;
    flex: 1;
    text-align: center;
    align-items: center;
  }

  .time-picker__colon__displayed {
    width: 100%;
    display: inline-block;
  }

  .fa-caret-down {
    color: $gunMetal;
  }

  .time-picker__selector {
    height: 100%;
    border: 1px solid lightgray;
    box-shadow:
      inset 0 10px 8px -10px lightgrey,
      inset 0 -10px 8px -10px lightgrey;
  }

  .time-picker__select {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
  }

  .time-picker__displayed {
    margin: 0;
    height: 100%;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
</style>
