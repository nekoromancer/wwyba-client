<template>
  <footer class="footer-section">
    <p class="footer-section__content">
      ⓒ 2019 Nekoromancer All rights reserved. <br>
      <a href="mailto:producer@765production.co.kr"
         class="footer-section__anchor"
         tabindex="300">
        Email: producer@765production.co.kr
      </a>
    </p>
    <p class="footer-section__content">
      네이버에서 제공하는 나눔글꼴이 적용되어 있습니다.<br>
      <a target="_blank"
         class="footer-section__anchor footer-section__font-license"
         tabindex="400"
         href="https://help.naver.com/support/contents/contents.nhn?serviceNo=1074&categoryNo=3497">
        나눔글꼴 라이센스 전문보기
      </a>
    </p>
  </footer>
</template>
<script>
  export default {
    name: 'partial-footer'
  }
</script>
<style lang="scss" scoped>
  .footer-section {
    z-index: 999;
    position: relative;
    padding: 1em 1em;
    background-color: $gunMetal;
    text-align: center;
    font-size: 12px;
    color: $white;
  }

  .footer-section__content {
    margin: 0 0 0.5em;
    line-height: 1.2em;
  }

  .footer-section__anchor {
    font-weight: bold;
    color: $white;
  }
</style>
