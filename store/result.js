export const state = () => ({
  title: '',
  description: '',
  timeTable: [],
  result: [],
  shortenUrl: '',
});

export const mutations = {
  setEventInfo($state, {title, description, timeTable, result}) {
    $state.title = title;
    $state.description = description;
    $state.timeTable = timeTable;
    $state.result = result;
  },
  setShortenUrl($state, {url}) {
    $state.shortenUrl = url;
  }
};
