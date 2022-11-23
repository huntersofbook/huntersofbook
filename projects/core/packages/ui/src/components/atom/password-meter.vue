<script setup lang="ts">
import { ZxcvbnResult, zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import { computed, unref } from 'vue'

const props = defineProps({
  password: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  regex: {
    type: RegExp,
    default: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  },
})

const options = {
  // recommended
  useLevenshteinDistance: true,
}
zxcvbnOptions.setOptions(options)

const getPasswordStrength = computed(() => {
  const password = props.password.length > 1 ? props.password : '0'
  const value = unref(password)
  const zxcvbnRef = zxcvbn(unref(password)) as ZxcvbnResult
  return value ? zxcvbnRef.score : -1
})
</script>

<template>
  <div
    class="relative h-6 mt-10 w-full mb-6 mr-auto ml-auto password-strength-meter-bar"
  >
    <div
      class="password-strength-meter-bar--fill"
      :data-score="getPasswordStrength"
    />
  </div>
</template>

<style lang="scss">
.password-strength-meter {
  position: relative;
  width: 100%;
  &-bar {
    position: relative;
    height: 6px;
    margin: 10px auto 6px;
    border-radius: 6px;
    background-color: var(--border-color);
    &::before,
    &::after {
      position: absolute;
      z-index: 10;
      display: block;
      width: 20%;
      height: inherit;
      background-color: transparent;
      border-color: var(--border-color);
      border-style: solid;
      border-width: 0 5px;
      content: '';
      filter: brightness(1.1);
    }
    &::before {
      left: 20%;
    }
    &::after {
      right: 20%;
    }
    &--fill {
      position: absolute;
      width: 0;
      height: inherit;
      background-color: transparent;
      border-radius: inherit;
      transition: width 0.5s ease-in-out, background 0.25s;
      &[data-score='0'] {
        width: 20%;
        background-color: #dc3545;
      }
      &[data-score='1'] {
        width: 40%;
        background-color: #fd7e14;
      }
      &[data-score='2'] {
        width: 60%;
        background-color: #ffc107;
      }
      &[data-score='3'] {
        width: 80%;
        background-color: #198754;
      }
      &[data-score='4'] {
        width: 100%;
        background-color: #20c997;
      }
    }
  }
}
html[data-theme='dark'] {
  .password-strength-meter {
    &-bar {
      background-color: var(--border-color);
      &::before,
      &::after {
        border-color: var(--border-color);
        filter: brightness(0.8);
      }
    }
  }
}
</style>
