<template>
  <make-event-container>
    <div class="make-event__wrapper">
      <div class="make-event__input-wrapper">
        <make-event-input-header
          header="응답자를 제한할 수 있습니다."/>
        <div class="make-event__public-setting">
          <label
            class="make-event__label make-event__is-public">
            <input
              type="radio"
              value="public"
              v-model="isPublic">
            <span>
              누구나 참여 가능
            </span>
          </label>
          <label
            class="make-event__label make-event__is-private">
            <input
              type="radio"
              value="private"
              v-model="isPublic">
            <span>
              비밀번호를 설정
            </span>
          </label>

          <div
            class="make-event__password-wrapper"
            v-show="isPublic === 'private'">
            <input
              class="make-event__input input-box"
              type="password"
              title="비밀번호"
              placeholder="비밀번호(4자리 이상)"
              v-model="password">
            <span
              v-show="passwordOk && password.length !== 0"
              class="make-event__ok-icon">
              <i class="fas fa-check"></i>
            </span>
            <span
              v-show="!passwordOk && password.length !== 0"
              class="make-event__not-ok-icon">
              <i class="fas fa-exclamation-triangle"></i>
            </span>
          </div>

          <div
            class="make-event__password-wrapper"
            v-if="isPublic === 'private'">
            <input
              class="make-event__input input-box"
              type="password"
              title="비밀번호 확인"
              placeholder="비밀번호 확인(한번 더 입력)"
              v-model="passwordConfirm">
            <span
              v-show="passwordConfirmOk && passwordConfirm.length !== 0"
              class="make-event__ok-icon">
              <i class="fas fa-check"></i>
            </span>
            <span
              v-show="!passwordConfirmOk && passwordConfirm.length !== 0"
              class="make-event__not-ok-icon">
              <i class="fas fa-exclamation-triangle"></i>
            </span>
          </div>
        </div>
      </div>
      <div
        class="make-event__input-button-wrapper"
        :class="{'input-button-wrapper--modify': isModify}">
        <make-event-back-button
          v-if="!isModify"
          routerName="make-event-step4-a"/>

        <make-event-next-button
          :buttonString="isModify ? '수정' : '다음'"
          :nextAction="setVotingMode"
          :isDisabled="isDisabled"/>
      </div>
    </div>
  </make-event-container>
</template>
<script>
  import MakeEventContainer from '~/components/make-event/make-event-container';
  import MakeEventInputHeader from '~/components/make-event/event-header';
  import MakeEventNextButton from '~/components/make-event/next-button';
  import MakeEventBackButton from '~/components/make-event/back-button';

  export default {
    name: 'make-event-step5',
    components: {
      MakeEventContainer,
      MakeEventInputHeader,
      MakeEventNextButton,
      MakeEventBackButton,
    },
    data () {
      const isPublic = this.$store.state.event.votingMode;

      return {
        isPublic,
        password: '',
        passwordConfirm: '',
        eventTitle: this.$store.state.event.title,
        eventDescription: this.$store.state.event.description,
        eventDates: this.$store.state.event.dates,
        timeType: this.$store.state.event.timeType,
        timeTable: this.$store.state.event.timeTable,
      }
    },
    computed: {
      passwordOk () {
        return this.password.length >= 4;
      },
      passwordConfirmOk () {
        return this.password === this.passwordConfirm;
      },
      isDisabled () {
        return this.isPublic === 'private'
          && (this.password.length < 4 || this.password !== this.passwordConfirm);
      },
      isModify () {
        return !!this.$route.query.from;
      }
    },
    created () {
      if (!this.eventTitle
        || this.eventTitle.trim().length === 0) {
        this.$router.push({
          name: 'make-event-step1'
        });
      } else if (!this.eventDescription
        || this.eventDescription.trim().length === 0) {
        this.$router.push({
          name: 'make-event-step2'
        });
      } else if (!this.eventDates ||
        this.eventDates.length === 0) {
        this.$router.push({
          name: 'make-event-step3'
        });
      } else if (!this.timeType) {
        this.$router.push({
          name: 'make-event-step4'
        });
      } else if (this.timeTable.length === 0) {
        let name;

        if (this.timeType === 'none') {
          name = 'make-event-step4';
        } else if (this.timeType === 'same') {
          name = 'make-event-step4-a'
        } else if (this.timeType === 'each') {
          name = 'make-event-step4-b'
        }
        this.$router.push({
          name
        });
      }
    },
    methods: {
      async setVotingMode () {
        if (this.isPublic === 'private') {
          const data = await this.$store.dispatch('event/setVotingPassword', {
            password: this.password,
            passwordConfirm: this.passwordConfirm,
          });

          if (data.result) {
            this.$router.push({
              name: 'make-event-step6'
            });
          } else {
            this.$toasted.error(data.message, {
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
          this.$store.commit('event/setVotingModeToPublic');
          this.$router.push({
            name: 'make-event-step6'
          });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .make-event__input {
    width: 100%
  }

  .make-event__label {
    display: block;
    margin: 1em 0;
  }

  .make-event__password-wrapper {
    position: relative;
  }

  .make-event__ok-icon,
  .make-event__not-ok-icon {
    position: absolute;
    right: 1em;
    top: 50%;
    transform: translate3d(0, -75%, 0);
    line-height: 0;
  }

  .make-event__ok-icon {
    color: $darkGreen;
  }

  .make-event__not-ok-icon {
    color: $red;
  }
</style>
