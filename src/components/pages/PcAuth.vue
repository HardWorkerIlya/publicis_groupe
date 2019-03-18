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
        <span class="form-label" :class="{ 'has-error' : errors.has('login') }">
          <input type="text" name="login" id="login" autocomplete="off" v-model="login" :class="{ hascontent : login }" v-validate.continues="'required'" />
          <label for="login">Логин</label>
        </span>
        <transition enter-active-class="show-mes">
          <div class="error-mes" v-show="errors.has('login')">
            <div class="message">Error!</div>
          </div>
        </transition>
        <span class="form-label" :class="{ 'has-error' : errors.has('password') }">
          <input type="password" name="password" id="password" autocomplete="off" v-model="password" :class="{ hascontent : password }" v-validate.continues="'required|min:6'" />
          <label for="password">Пароль</label>
        </span>
        <transition enter-active-class="show-mes">
          <div class="error-mes" v-show="errors.has('password')">
            <div class="message">Error!</div>
          </div>
        </transition>
        <transition
          enter-active-class="show"
          leave-active-class="hide">
          <span class="form-label" v-show="!isSignIn">
            <input type="password" name="confirm" id="confirm" autocomplete="off" v-model="confirm" :class="{ hascontent : confirm }" />
            <label for="confirm">Повторите пароль</label>
          </span>
        </transition>
        <button @click.prevent="submitForm">{{ isSignIn ? 'Войти' : 'Регистрация' }}</button>
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

      .form-label {
        position: relative;
        display: block;
        max-width: 375px;
        margin: 0 auto 20px;

        &.has-error {
          margin-bottom: 0;

          input,
          input:focus {
            border-bottom: 1px solid #ff6e74;
          }

          &+ .error-mes {
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 375px;
            height: 40px;
            background-color: #FDEDED;
            text-align: center;
            margin: 4px auto;

            .message {
              font-weight: 300;
              font-size: 12px;
              color: #FF7979;
            }

            .show-mes {
              animation: show-mes .6s ease;
            }
          }
        }

        &:nth-child(4) {
          margin-bottom: 0;
        }

        &:nth-child(6) {
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
          font: inherit;
          display: block;
          border-radius: 4px;
          height: 44px;
          box-sizing: border-box;
          border: 1px solid #C4C4C4;
          padding: 10px;
          width: 100%;
          background-color: #ffffff;

          &[type='password'] {
            font-size: 30px;
          }

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

          &:nth-child(6) {
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

          &:nth-child(6) {
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

@media (max-width: 600px) {
  #auth {
    .auth_panel {
      width: 100%;
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

/*@keyframes show-mes {*/
  /*from {*/
    /*height: 0;*/
    /*!*padding: 0;*!*/
  /*}*/
  /*to {*/
    /*height: 40px;*/
    /*!*padding: 11px;*!*/
  /*}*/
/*}*/
</style>