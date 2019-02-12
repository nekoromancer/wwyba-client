export const state = () => ({
  modalShow: false,
  templateName: null,
});

export const mutations = {
  open ($state, {templateName}) {
    $state.modalShow = true;
    $state.templateName = templateName;
  },
  close ($state) {
    $state.modalShow = false;
    $state.templateName = null;
  }
};
