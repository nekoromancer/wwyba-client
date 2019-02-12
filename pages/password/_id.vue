<template>
  <div class="container password-container">
    <div class="password-wrapper">
      <h1>패스워드 입력</h1>
      <p>비공개 시간표입니다. 패스워드를 입력 해주세요.</p>

      <label>
        <span class="hidden">패스워드</span>
        <input
          v-model="password"
          class="password__input-password"
          type="password"
          placeholder="패스워드를 입력 해주세요">
      </label>

      <div class="password__button-wrapper">
        <button
          class="password__button custom-button button--white"
          @click="submitPassword">
          <i class="far fa-check-circle"></i> 입력
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'password',
    async fetch ({app, store, params}) {
      const response = await app.$axios.get(`/events?id=${params.id}`);

      const event = {
        title: response.data.event.result.title,
        description: response.data.event.result.description,
      };

      store.commit('attendance/setEventInfo', event);
    },
    head () {
      return {
        meta: [
          {name: 'title', content: this.$store.state.attendance.title},
          {name: 'description', content: this.$store.state.attendance.description},
          {hid: 'og:url', property: 'og:url', content: `${process.env.HOST_URL}/password/${this.$route.params.id}`},
          {hid: 'og:title', property: 'og:title', content: this.$store.state.attendance.title},
          {hid: 'og:description', property: 'og:description', content: this.$store.state.attendance.description},
        ]
      }
    },
    data () {
      return {
        password: ''
      }
    },
    methods: {
      async submitPassword () {
        if (this.password.trim().length >= 4) {
          const result = await this.$axios.post('/tokens', {
            id: this.$route.params.id,
            password: this.password,
          });

          if (result.data.token) {
            this.$cookies.set('jwt-token', result.data.token, {
              path: '/',
              maxAge: 60 * 60 * 23,
            });

            this.$router.push({
              path: `/attendance/${this.$route.params.id}`,
            })
          } else {
            this.$toasted.error('패스워드가 틀립니다', {
              icon: 'exclamation-triangle',
              duration: 5000,
              action: {
                text: '닫기',
                onClick: (e, toastObject) => {
                  toastObject.goAway(0);
                }
              }
            });
          }
        } else {
          let message;
          if (this.password.trim().length === 0) {
            message = '패스워드를 입력해주세요'
          } else {
            message = '패스워드는 4자 이상입니다'
          }
          this.$toasted.error(message, {
            icon: 'exclamation-triangle',
            duration: 5000,
            action: {
              text: '닫기',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }
          });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .password-container {
    display: flex;
    justify-content: center;
    background: $darkGreen;
  }

  .password-wrapper {
    padding: 1em;
    color: $white;
    margin-bottom: 4em;
  }

  .password__input-password {
    width: 100%;
    height: 3em;
    padding: 0.5em;
    border: 0;
    border-bottom: 1px solid $white;
    background: transparent;
    margin-bottom: 2em;
    color: $white;
    border-radius: 0;

    &::placeholder {
      color: $gray
    }
  }

  .password__button-wrapper {
    width: 100%;
  }

  .password__button {
    width: 100%;
  }
</style>
