export const state = () => ({
  title: '',
  description: '',
  timeTableData: [],
  answers: [],
});

export const mutations = {
  setEventInfo ($state, {title, description, timeTableData}) {
    $state.title = title;
    $state.description = description;
    $state.timeTableData = timeTableData;
  },
};
