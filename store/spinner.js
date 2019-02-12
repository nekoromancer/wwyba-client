export const state = () => ({
  spinnerShow: false,
});

export const mutations = {
  active ($state) {
    $state.spinnerShow = true;
  },
  inactive ($state) {
    $state.spinnerShow = false;
  }
};
