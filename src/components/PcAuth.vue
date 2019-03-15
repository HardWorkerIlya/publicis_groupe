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
      <form>
        <transition
          enter-active-class="show"
          leave-active-class="hide">
          <span class="form-label" v-show="!isSignIn">
            <input type="text" name="name" id="name" autocomplete="off" v-model="name" :class="{ hascontent : name }" />
            <label for="name">Имя</label>
          </span>
        </transition>
        <span class="form-label">
          <input type="text" name="login" id="login" autocomplete="off" v-model="login" :class="{ hascontent : login }" />
          <label for="login">Логин</label>
        </span>
        <span class="form-label">
          <input type="password" name="password" id="password" autocomplete="off" v-model="password" :class="{ hascontent : password }" />
          <label for="password">Пароль</label>
        </span>
        <transition
          enter-active-class="show"
          leave-active-class="hide">
          <span class="form-label" v-show="!isSignIn">
            <input type="password" name="confirm" id="confirm" autocomplete="off" v-model="confirm" :class="{ hascontent : confirm }" />
            <label for="confirm">Повторите пароль</label>
          </span>
        </transition>
        <button>{{ isSignIn ? 'Войти' : 'Регистрация' }}</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PcAuth",
    data () {
      return {
        isSignIn: true,
        login: null,
        password: null,
        name: null,
        confirm: null
      }
    }
  }
</script>

<style lang="scss">
#auth {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  background: url(../assets/images/bgc.png) no-repeat;
  -webkit-background-size: cover;
  background-size: cover;

  .auth_panel {
    width: 50%;
    padding: 30px 20px 42px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 4px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;

    .title {
      text-align: center;
      font-family: 'Roboto', sans-serif;
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

      .form-label {
        position: relative;
        display: block;
        max-width: 375px;
        margin: 0 auto 20px;

        &:nth-child(3) {
          margin-bottom: 0;
        }

        &:nth-child(4) {
          margin-top: 20px;
        }

        label {
          -webkit-transform: translateY(50%);
          -moz-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          -o-transform: translateY(-50%);
          transform: translateY(50%);
          -webkit-transition: all 0.2s ease-in-out;
          -moz-transition: all 0.2s ease-in-out;
          transition: all 0.2s ease-in-out;
          position: absolute;
          top: 5px;
          left: 1em;
          background: none;
          color: #C4C4C4;
          cursor: text;
        }

        input {
          display: block;
          border-radius: 4px;
          height: 44px;
          box-sizing: border-box;
          border: 1px solid #C4C4C4;
          padding: 1em;
          width: 100%;
          background-color: #ffffff;

          &:-internal-autofill-previewed,
          &:-internal-autofill-selected {
            background-color: #ffffff !important;
          }

          &:focus {
            border-bottom: 1px solid #DFC800;
            outline: none;
            caret-color: #DFC800;
          }

          &:focus~label,
          &.hascontent~label {
            top: -30%;
            font-size: 10px;
            padding: 0 .3em;
            background: #ffffff;
            border-radius: 4px;
          }
        }

        &.show {
          animation: show .6s ease;

          &:nth-child(4) {
            animation: margin-top .6s ease;
          }

          input {
            animation: show-input .6s ease;
          }

          label {
            animation: show-label .6s ease;
          }
        }

        &.hide {
          animation: show .6s ease reverse;

          &:nth-child(4) {
            animation: margin-top .6s ease reverse;
          }

          input {
            animation: show-input .6s ease reverse;
          }

          label {
            animation: show-label .6s ease reverse;
          }
        }
      }

      button {
        display: block;
        height: 46px;
        width: 184px;
        margin: 30px auto 0;
        padding: 0;
        text-transform: uppercase;
        background: #86764B;
        border-radius: 4px;
        color: #ffffff;
        font: inherit;
        font-weight: bold;
        cursor: pointer;

        &:focus {
          outline: none;
          border: none;
        }

        &:active {
          border: none;
        }

        &:hover {
          background: #424242;

          &:focus {
            background: #000000;
          }
        }
      }
    }
  }
}

@keyframes margin-top {
  from { margin-top: 0; }
  to { margin-top: 20px; }
}

@keyframes show {
  from { margin-bottom: 0; }
  to { margin-bottom: 20px; }
}

@keyframes show-label {
  from { font-size: 0; }
  to { font-size: 14px; }
}

@keyframes show-input {
  from {
    height: 0;
    padding: 0;
  }
  to {
    height: 44px;
    padding: 11px;
  }
}
</style>