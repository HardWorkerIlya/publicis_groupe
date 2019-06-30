<template>
  <div
    class="pc-input"
    :class="messState"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template>
      <input
        ref="input"
        :name="name"
        class="pc-input__inner"
        :class="{ 'hascontent' : !!currentValue, 'has-error' : errors.has(name) }"
        :type="type"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :value="currentValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        v-validate.continues="rules"
      >
      <label
        v-if="label"
        class="pc-input__label"
      >
        {{ label }}
      </label>
      <transition name="message">
        <div
          v-show="currentMessage || errors.first(name)"
          class="pc-input__message"
          :class="{ 'danger': errors.has(name) }"
        >
          {{ currentMessage || errors.first(name) }}
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'PcInput',
    inject: ['$validator'],
    props: {
      value: [String, Number],
      message: String,
      messageType: String,
      disabled: Boolean,
      autocomplete: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'text'
      },
      name: {
        type: String,
        required: true,
        default: 'text'
      },
      label: {
        type: String,
        default: ''
      },
      clearable: {
        type: Boolean,
        default: false
      },
      rules: [String, Object]
    },
    computed: {
      messState () {
        if (this.isStartLoading && !this.errors.first(this.name)) return ''
        else return this.currentMessage || this.errors.first(this.name) ? 'has-message' : 'no-message'
      }
    },
    watch: {
      value (val) {
        this.setCurrentValue(val);
        this.isStartLoading = false
      },
      message (val) {
        this.setCurrentMessage(val);
        this.isStartLoading = false
      }
    },
    data () {
      return {
        isStartLoading: true,
        currentValue: this.value === undefined || this.value === null
          ? ''
          : this.value,
        currentMessage: this.message === undefined || this.message === null
          ? ''
          : this.message,
        hovering: false,
        focused: false
      }
    },
    methods: {
      focus() {
        this.$refs.input.focus()
      },
      blur() {
        this.$refs.input.blur()
      },
      setCurrentValue (value) {
        this.currentValue = value
        // if (this.validateEvent) {
        //   this.dispatch('ElFormItem', 'el.form.change', [value]);
        // }
      },
      setCurrentMessage (value) {
        this.currentMessage = value
        // if (this.validateEvent) {
        //   this.dispatch('ElFormItem', 'el.form.change', [value]);
        // }
      },
      handleInput (event) {
        const value = event.target.value
        this.setCurrentValue(value)
        this.$emit('input', value);
      },
      handleFocus (event) {
        this.focused = true;
        this.$emit('focus', event);
      },
      handleBlur(event) {
        this.focused = false;
        this.$emit('blur', event);
        // if (this.validateEvent) {
        //   this.dispatch('ElFormItem', 'el.form.blur', [this.currentValue]);
        // }
      },
      handleChange(event) {
        this.$emit('change', event.target.value);
      },
      clear() {
        this.$emit('input', '');
        this.$emit('change', '');
        this.$emit('clear');
        this.setCurrentValue('');
        this.focus();
      }
    }
  }
</script>

<style lang="scss">
.pc-input {
  position: relative;
  display: block;
  max-width: 375px;
  margin: 0 auto 20px;

  .pc-input__inner {
    font: inherit;
    display: block;
    border-radius: 4px;
    height: 44px;
    box-sizing: border-box;
    border: 1px solid #C4C4C4;
    padding: 10px;
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

    &.has-error {
      border-bottom: 1px solid #ff6e74;
    }
  }

  .pc-input__label {
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

  .pc-input__message {
    position: absolute;
    top: 44px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 375px;
    height: 40px;
    text-align: center;
    margin: 4px auto;
    font-weight: 300;
    font-size: 12px;
    color: #909399;
    background-color: #f4f4f5;

    &.success {
      color: #67C23A;
      background-color: #f0f8eb;
    }

    &.warning {
      color: #E6A23C;
      background-color: #fdf6ec;
    }

    &.danger {
      color: #FF7979;
      background-color: #FDEDED;
    }
  }

  &.has-message {
    animation: increase-mb .5s forwards;
  }

  &.no-message {
    animation: decrease-mb .2s forwards;
  }

  .message-enter-active {
    animation: show-mess .5s;
  }

  .message-leave-active {
    animation: show-mess .2s reverse;
  }

  @keyframes show-mess {
    0% {
      opacity: 0;
      top: 0;
    }
    100% {
      opacity: 1;
      top: 0;
      top: 44px;
    }
  }

  @keyframes increase-mb {
    0% { margin-bottom: 20px; }
    100% { margin-bottom: 48px; }
  }

  @keyframes decrease-mb {
    0% { margin-bottom: 48px; }
    100% { margin-bottom: 20px; }
  }
}
</style>