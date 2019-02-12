<template>
  <section class="header-section">
    <h1 class="header-section__title">
      <nuxt-link to="/"
                 tabindex="1"
                 class="header-section__title-anchor">
        <span class="header-section__title-text">
          <i class="fas fa-calendar-alt"></i> 일정 조정하기
        </span>
      </nuxt-link>
    </h1>
  </section>
</template>
<script>
  export default {
    name: 'partial-header'
  }
</script>
<style lang="scss" scoped>
  .header-section {
    position: relative;
    z-index: 999;
    background: $darkGreen;
  }

  .header-section__title {
    margin: 0 auto;
    padding: 0.5em;
    font-size: 1.75em;
    max-width: 720px;

    .fa-calendar-alt {
      vertical-align: top;
      margin-right: 0.2em;
      color: $white;
    }
  }

  .header-section__title-anchor {
    text-decoration: none;
  }

  .header-section__title-text {
    color: $white;
  }
</style>
