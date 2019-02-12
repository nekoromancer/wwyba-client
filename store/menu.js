export const state = () => ({
  menuShow: false,
});

export const mutations = {
  toggle ($state, $toStatus = null) {
    if ($toStatus === null) {
      $state.menuShow = !$state.menuShow
    } else {
      $state.menuShow = $toStatus;
    }
  },
};
