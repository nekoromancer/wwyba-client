<template>
  <make-event-container>
    <div class="make-event__wrapper">
      <div class="make-event__input-wrapper">
        <make-event-input-header
          header="시간표가 생성되었습니다."
          caution="(※ 주소를 복사하는 걸 잊지 마세요!)"/>

        <section class="make-event__copy">
          <h1 class="make-event__copy-header">
            투표용 URL 주소(클릭하여 복사하기)
          </h1>
          <label
            class="make-event__copy-wrapper"
            @click="copyUrl">
            <span class="hidden">
              투표용 URL 주소
            </span>
            <i class="make-event__copy-icon far fa-copy"></i>
            <input
              class="make-event__copy-url-text"
              v-model="votingUrl"
              type="text"
              readonly>
          </label>
        </section>
      </div>
      <div class="make-event__input-button-wrapper">
        <nuxt-link
          tag="button"
          to="/"
          class="make-event__button-to-top custom-button button--white">
            처음으로 <i class="fas fa-undo-alt"></i>
        </nuxt-link>
        <button
          @click="toFirstStep"
          class="make-event__button-to-top custom-button button--white">
            다른 일정 만들기 <i class="far fa-sticky-note"></i>
        </button>
      </div>
    </div>
  </make-event-container>
</template>
<script>
  import MakeEventContainer from '~/components/make-event/make-event-container';
  import MakeEventInputHeader from '~/components/make-event/event-header';

  export default {
    name: 'make-event-complete',
    components: {
      MakeEventContainer,
      MakeEventInputHeader,
    },
    fetch ({store, $axios}) {
      const id = store.state.event.hashString;
      const host = process.env.HOST_URL || location.origin;
      const url = encodeURIComponent(`${host}/attendance/${id}`);

      $axios.get(`/urls?url=${url}`)
        .then(res => {
          store.commit('result/setShortenUrl', {
            url: res.data.url
          })
        });
    },
    computed: {
      votingUrl () {
        return this.$store.state.result.shortenUrl;
      }
    },
    created () {
      if (this.$store.state.event.hashString.length === 0) {
        this.$router.push({
          path: '/'
        });
      }
    },
    methods: {
      copyUrl () {
        this.$copyText(this.votingUrl)
          .then(() => {
            this.onCopySuccess()
          }, $error => {
            this.onCopyError();
            console.error($error);
          });
      },
      onCopySuccess () {
        this.$toasted.success('복사 되었습니다', {
          icon: 'clipboard-check',
          duration: 5000,
          action: {
            text: '닫기',
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        });
      },
      onCopyError () {
        this.$toasted.error('복사에 실패했습니다', {
          icon: 'exclamation-triangle',
          duration: 5000,
          action: {
            text: '닫기',
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        });
      },
      toFirstStep () {
        this.$store.commit('event/init');
        this.$router.push({
          name: 'make-event-step1',
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .make-event__copy-header {
    font-size: 1.2em;
    margin-bottom: 1em;
  }

  .make-event__copy-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
    border: 1px solid $gray;
    border-radius: 3px;
    cursor: pointer;
    padding-left: 1em;
    background: rgba($gray, 0.25);
  }
  
  .make-event__copy-icon {
    position: absolute;
    left: 1em;
    top: 1em;
  }

  .make-event__copy-url-text {
    width: 100%;
    border: none;
    padding: 1em 1em 1em 2em;
    cursor: pointer;
    background: transparent;
  }
</style>
