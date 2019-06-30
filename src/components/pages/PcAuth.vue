<template>
  <div id="auth">
    <div class="auth_panel">
      <div class="title">Авторизация пользователя</div>
      <div class="tabs">
        <div
          class="login-tab"
          :class="{ active: isSignIn }"
          @click="isSignIn = !isSignIn"
        >
          Вход
        </div>
        <div
          class="login-tab"
          :class="{ active: !isSignIn }"
          @click="isSignIn = !isSignIn"
        >
          Регистрация
        </div>
      </div>
      <transition name="panel" mode="out-in">
        <form
          v-if="isSignIn"
          key="sign-in"
          class="sign-in"
        >
          <pc-input
            v-model="login"
            name="login"
            label="Логин"
            rules="required"
          />
          <pc-input
            v-model="password"
            type="password"
            name="password"
            label="Пароль"
            rules="required|min:6"
          />
          <pc-button @pc-click="submitForm">
            {{ isSignIn ? 'Войти' : 'Регистрация' }}
          </pc-button>
        </form>
        <form
          v-else
          key="sign-up"
          class="sign-up"
        >
          <pc-input
            v-model="name"
            name="name"
            label="Имя"
          />
          <pc-input
            v-model="login"
            name="login"
            label="Логин"
            rules="required"
          />
          <pc-input
            v-model="password"
            type="password"
            name="password"
            label="Пароль"
            rules="required|min:6"
          />
          <pc-input
            v-model="confirm"
            type="password"
            name="confirm"
            label="Повторите пароль"
            rules="required|min:6"
          />
          <pc-button @pc-click="submitForm">
            {{ isSignIn ? 'Войти' : 'Регистрация' }}
          </pc-button>
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
  import PcInput from '../PcInput'
  import PcButton from '../PcButton'

  export default {
    name: 'PcAuth',
    components: {
      PcInput,
      PcButton
    },
    data () {
      return {
        isSignIn: true,
        login: null,
        password: null,
        name: null,
        confirm: null
      }
    },
    methods: {
      submitForm () {
        this.$validator.validate().then(valid => {
          let fieldArray = ['login', 'password', 'name', 'confirm']

          if (valid) {
            fieldArray.forEach((field) => {
              this[field] = null
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
@import "../../assets/partials/variables";

#auth {
  display: flex;
  padding: 0 16px;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  background: url(../../assets/images/bgc.png) no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
  font-family: $--font-family;
  font-size: 14px;

  .auth_panel {
    transition: all .5s ease;
    width: 50%;
    padding: 30px 20px 42px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 4px;
    max-width: 550px;

    .title {
      text-align: center;
      text-transform: uppercase;
      font-size: 22px;
      line-height: 22px;
      color: #86764B;
      font-weight: bold;
    }

    .tabs {
      border-bottom: 1px solid #E5E5E5;
      display: flex;
      flex-direction: row;
      justify-content: center;

      .login-tab {
        display: flex;
        text-transform: uppercase;
        line-height: 30px;
        margin: 10px;
        margin-top: 23px;
        margin-bottom: -1px;
        cursor: pointer;
        border: none;
        padding-left: 10px;
        padding-right: 10px;
        
        &.active {
          border-bottom: 1px solid #85754A;
          font-weight: bold;
        }
      }
    }

    form {
      margin: 35px 0 0;
    }

    .panel-enter-active {
      animation: show-panel .3s;
    }

    .panel-leave-active {
      animation: show-panel .3s reverse;
    }
  }
}

@media (max-width: 600px) {
  #auth {
    .auth_panel {
      width: 100%;
    }
  }
}

@keyframes show-panel {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style>