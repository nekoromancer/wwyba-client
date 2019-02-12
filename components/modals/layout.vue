<template>
  <section
    class="modal-container"
    :class="{'modal-container--show': modalShow}">
    <div
      class="modal-back"
      @click="modalClose"></div>
    <div class="modal-wrapper">
      <component
        v-if="templateName"
        :is="templateName"></component>
    </div>
    <button
      class="modal-close"
      @click="modalClose">
      <i class="far fa-times-circle"></i>
    </button>
  </section>
</template>
<script>
  import AddTime from '~/components/modals/add-time.vue';
  import Help from '~/components/modals/help.vue';

  export default {
    name: 'modal-layout',
    components: {
      AddTime,
      Help,
    },
    computed: {
      modalShow () {
        return this.$store.state.modal.modalShow;
      },
      templateName () {
        return this.$store.state.modal.templateName;
      }
    },
    methods: {
      modalClose () {
        this.$store.commit('modal/close');
      }
    }
  }
</script>
<style lang="scss" scoped>
  .modal-container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999999;
    flex-direction: column;
    justify-items: center;
    justify-content: space-around;
    align-items: center;

    &.modal-container--show {
      display: flex;
    }
  }

  .modal-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($gunMetal, 0.75);
  }

  .modal-close {
    position: absolute;
    padding: 0;
    top: 0.5em;
    right: 0.5em;
    border: 0;
    background: none;
    font-size: 2em;
    color: $white;
    z-index: 999;
  }
  
  .modal-wrapper {
    position: relative;
    width: 100%;
    height: 80%;
  }
</style>
