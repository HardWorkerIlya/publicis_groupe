<template>
  <header>
    <div id="logo">
      <img src="../assets/images/logo.png" alt="">
    </div>
    
    <div
      class="menu-icon"
      @click="isOpen = !isOpen"
    >
      <img src="../assets/images/menu.png" alt="" v-show="!isOpen">
      <img src="../assets/images/close.png" alt="" v-show="isOpen">
    </div>
    
    <div id="logo-mobile">
      <img src="../assets/images/logo-mobile.png">
    </div>


    <nav>
      <transition
        enter-active-class="show"
        leave-active-class="hide"
      >
        <ul v-show="!isMobileView || isOpen">
          <li :class="{ 'active' : path === '/media' }" @click="isOpen = false">
            <router-link to="/media">
              Media
            </router-link>
          </li>
          <li :class="{ 'active' : path === '/digital' }" @click="isOpen = false">
            <router-link to="/digital">
              Digital
            </router-link>
          </li>
          <li :class="{ 'active' : path === '/social' }" @click="isOpen = false">
            <router-link to="/social">
              Social
            </router-link>
          </li>
          <li :class="{ 'active' : path === '/commerce' }" @click="isOpen = false">
            <router-link to="/commerce">
              Commerce
            </router-link>
          </li>
          <li :class="{ 'active' : path === '/people' }" @click="isOpen = false">
            <router-link to="/people">
              People
            </router-link>
          </li>
        </ul>
      </transition>
    </nav>

    <router-link to="/auth">
      <svg id="profile" :class="{ 'active' : path === '/auth' }" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.9994 0C6.72876 0 0 6.72937 0 15C0 23.2706 6.72876 30 14.9994 30C23.2694 30 29.9988 23.2706 29.9988 15C29.9988 6.72937 23.2706 0 14.9994 0ZM23.6482 23.267C23.6482 22.9202 23.6482 22.6755 23.6482 22.6755C23.6482 20.6298 21.2847 19.8836 20.0195 19.3422C19.5616 19.1471 18.6982 18.7314 17.8125 18.2982C17.5134 18.152 17.2439 17.7623 17.2101 17.4294L17.1122 16.4603C17.7901 15.8289 18.4009 14.9499 18.5042 13.9699H18.6571C18.8976 13.9699 19.1241 13.7898 19.1598 13.5693L19.3996 12.0872C19.4317 11.7707 19.1326 11.5785 18.8903 11.5785C18.897 11.5471 18.9024 11.5151 18.9054 11.4885C18.9362 11.3103 18.955 11.1381 18.9671 10.9707C18.9822 10.836 18.9942 10.6964 19.0009 10.552C19.0263 9.85238 18.9078 9.24034 18.7115 8.89777C18.5121 8.41866 18.21 7.95344 17.7895 7.55468C16.618 6.4454 15.2592 6.01341 14.1004 6.90518C13.3113 6.76864 12.3736 7.12933 11.6963 7.92262C11.3266 8.35582 11.0964 8.85125 10.9979 9.33882C10.9097 9.64273 10.8511 10.0107 10.8366 10.4088C10.8209 10.8517 10.8644 11.2571 10.9459 11.5852C10.7151 11.5997 10.4844 11.7894 10.4844 12.0885L10.7236 13.5705C10.7593 13.791 10.9858 13.9711 11.2263 13.9711H11.3634C11.5809 15.0308 12.144 15.9008 12.7669 16.5074L12.6727 17.4445C12.6389 17.7768 12.3694 18.1653 12.0697 18.3133C11.213 18.7314 10.369 19.1338 9.86386 19.3422C8.67362 19.8328 6.23515 20.6298 6.23515 22.6755V23.1383C4.2486 20.9989 3.02332 18.1442 3.02332 15.0018C3.02332 8.39691 8.39691 3.02332 15.0018 3.02332C21.6073 3.02332 26.9803 8.39691 26.9803 15.0018C26.9779 18.2058 25.7061 21.1137 23.6482 23.267Z"/>
      </svg>
    </router-link>

  </header>
</template>

<script>
  export default {
    name: "PcHeader",
    data () {
      return {
        isOpen: false,
        isMobileView: false
      }
    },
    created () {
      window.addEventListener('resize', () => { this.resizeWindow() })
      this.resizeWindow()
    },
    computed: {
      path () {
        return `/${this.$route.path.split('/')[1]}`
      }
    },
    methods: {
      resizeWindow () {
        this.isMobileView = window.innerWidth < 600
      }
    }
  }
</script>

<style lang="scss">
header {
  display: flex;
  justify-content: space-between;
  height: 100px;
  background-color: #ffffff;
  align-items: flex-end;

  #logo {
    margin-bottom: 13px;
    display: flex;
  }

  #logo-mobile {
    display: none;
  }

  .menu-icon {
    margin-bottom: 19px;
    cursor: pointer;
    display: none;
    width: 28px;
  }

  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 18px;

    li {
      padding: 2px 7px;
      border-bottom: 1px solid #ffffff;

      a {
        color: #000000;
        text-decoration: none;
      }

      &.active {
        a {
          color: #85754A;
        }
      }

      &:hover {
        border-bottom: 1px solid #424242;

        a {
          color: #424242;
        }
      }
    }

    &.show {
      animation: show-menu .6s ease;
    }

    &.hide {
      animation: show-menu .6s ease reverse;
    }
  }

  #profile {
    margin-bottom: 24px;
    width: 30px;
    height: 30px;

    path {
      fill: #C4C4C4;
    }

    &.active path {
      fill: #85754A;
    }

    &:hover path {
      fill: #424242;
    }
  }
}
  
@media (max-width: 600px) {
  header {
    height: 60px;

    ul {
      display: block;
      width: 100%;
      position: absolute;
      left: 0;
      top: 60px;
      background-color: white;
      margin-bottom: 0;
      border-top: 1px solid #E5E5E5;

      li {
        height: 64px;
        padding: 0;
        border: none;

        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          justify-content: center;
        }

        &:hover {
          border: none;
        }
      }
    }

    #logo {
      display: none;
    }

    #logo-mobile {
      display: flex;
      margin: auto;
    }

    #profile {
      margin-bottom: 15px;
      display: flex;
    }

    .menu-icon {
      display: flex;
    }
  }
}

@keyframes show-menu {
  from { top: -100%; }
  to { top: 60px; }
}
</style>