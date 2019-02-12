import _ from 'lodash';

const addTime = ($state, $date, $time = null) => {
  $state.timeTable.push({
    date: $date.dateString,
    hour: !$time ? null : $time.substr(0, 2),
    minute: !$time ? null : $time.substr(2, 2),
  });
};

export const state = () => ({
  title: '',
  description: '',
  timeType: 'none',
  dates: [],
  times: [],
  timeTable: [],
  votingMode: 'public',
  votingPassword: '',
  votingPasswordConfirm: '',
  targetIndex: 0,
  hashString: '',
});

export const mutations = {
  init ($state) {
    $state.title = '';
    $state.description = '';
    $state.timeType = 'none';
    $state.dates = [];
    $state.times = [];
    $state.timeTable = [];
    $state.votingMode = 'public';
    $state.votingPassword = '';
    $state.targetIndex = 0;
  },
  setTitle ($state, $title) {
    $state.title = $title;
  },
  setDescription ($state, $description) {
    $state.description = $description;
  },
  setTimeType ($state, {type, isModify}) {
    if (!isModify || type !== $state.timeType) {
      if (type === 'each') {
        const datesLength = $state.dates.length;
        $state.times = [];

        for (let i = 0; i < datesLength; i++) {
          $state.times.push([]);
        }
      } else if (type === 'same') {
        $state.times = [];
      }
    }

    $state.timeType = type;
  },
  addDate ($state, $date) {
    $state.dates.push($date);
  },
  removeDate ($state, $date) {
    const index = _.findIndex($state.dates, ['dateString', $date.dateString]);
    $state.dates.splice(index, 1);
  },
  initTime ($state) {
    $state.times = [];
  },
  addTimeToAllDate ($state, $time) {
    $state.times.push($time);
  },
  addTimeToEachDate ($state, $time) {
    $state.times[$state.targetIndex].push($time);
  },
  removeTime ($state, $time) {
    const index = _.findIndex($state.times, $time);
    $state.times.splice(index, 1);
  },
  removeTimeInDate ($state, {index, time}) {
    const timeIndex = _.findIndex($state.times[index], time);
    $state.times[index].splice(timeIndex, 1);
  },
  setVotingModeToPrivate ($state, {password, passwordConfirm}) {
    $state.votingMode = 'private';
    $state.votingPassword = password;
    $state.votingPasswordConfirm = passwordConfirm;
  },
  setVotingModeToPublic ($state) {
    $state.votingMode = 'public';
    $state.votingPassword = '';
    $state.votingPasswordConfirm = '';
  },
  setTargetIndex ($state, $index) {
    $state.targetIndex = $index;
  },
  createTimeTable ($state) {
    $state.timeTable = [];
    const type = $state.timeType;
    const dates = _.orderBy($state.dates, ['dateObject']);
    let times;

    if (type === 'same') {
      times = _.sortBy($state.times);
    } else if (type === 'each') {
      times = [];

      _.each($state.times, $timesOfDate => {
        times.push(_.sortBy($timesOfDate));
      });
    }

    if (type === 'none') {
      _.each(dates, $date => {
        addTime($state, $date, null);
      });
    } else if (type === 'same') {
      _.each(dates, $date => {
        if (times.length === 0) {
          addTime($state, $date, null);
        } else {
          _.each(times, $time => {
            addTime($state, $date, $time);
          });
        }
      });
    } else if (type === 'each') {
      _.each(dates, ($date, $index) => {
        if (times[$index].length === 0) {
          addTime($state, $date, null);
        } else {
          _.each(times[$index], $time => {
            addTime($state, $date, $time);
          });
        }
      });
    }
  },
  setTimeTable ($state, $timeTable) {
    $state.timeTable = $timeTable;
  },
  setHashString ($state, $id) {
    $state.hashString = $id;
  }
};

export const getters = {
  dates ($state) {
    return _.sortBy($state.dates, ['dateObject']);
  },
  times ($state) {
    if ($state.timeType === 'same') {
      return _.sortBy($state.times);
    } else if ($state.timeType === 'each') {
      const times = [];

      _.each($state.times, $timesOfDate => {
        times.push(_.sortBy($timesOfDate));
      });

      return times;
    } else {
      return $state.times;
    }
  },
  timeTable ($state) {
    const timeTable = {};
    const dates = [];
    const times = [];

    _.each($state.timeTable, $dateTime => {
      if (!timeTable.hasOwnProperty($dateTime.date)) {
        timeTable[$dateTime.date] = [];
      }

      if ($dateTime.hour && $dateTime.minute) {
        timeTable[$dateTime.date].push(`${$dateTime.hour}${$dateTime.minute}`);
      }
    });

    _.each(timeTable, ($times, $key) => {
      dates.push({
        string: $key,
        length: $times.length,
      });

      if ($times.length === 0) {
        times.push(null);
      } else {
        _.each($times, $time => {
          times.push($time);
        });
      }
    });

    return {dates, times};
  }
};

export const actions = {
  addTime ({state, commit}, $time) {
    if (state.timeType === 'same') {
      if (_.indexOf(state.times, $time) === -1) {
        commit('addTimeToAllDate', $time);
        return true;
      } else {
        return false;
      }
    } else if (state.timeType === 'each') {
      if (_.indexOf(state.times[state.targetIndex], $time) === -1) {
        commit('addTimeToEachDate', $time);
        return true;
      } else {
        return false;
      }
    }
  },
  setVotingPassword ({state, commit}, {password, passwordConfirm}) {
    const validationResult = {
      result: false,
      message: ''
    };

    if (password.length < 4) {
      validationResult.message = '패스워드는 4자 이상입니다.';
    } else if (password !== passwordConfirm) {
      validationResult.message = '패스워드가 동일하지 않습니다.';
    } else {
      validationResult.result = true;
      commit('setVotingModeToPrivate', {
        password,
        passwordConfirm
      });
    }

    return validationResult;
  }
};
