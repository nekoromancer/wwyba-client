<template>
  <div>
    <Spinner />
    <ModalContainer />
    <Header/>
    <nuxt/>
    <Footer/>
  </div>
</template>
<script>
  import Header from '~/components/partials/header';
  import Footer from '~/components/partials/footer';
  import ModalContainer from '~/components/modals/layout';
  import Spinner from '~/components/commons/spinner';

  export default {
    components: {
      Header,
      Footer,
      ModalContainer,
      Spinner,
    }
  }
</script>
<style lang="scss">
  html {
    .toasted-container {
      z-index: 9999999;

      .svg-inline--fa {
        margin-right: 0.5em;
      }
    }
  }
</style>
