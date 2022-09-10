<script setup lang="ts">
import { computed, unref } from 'vue'
import { ZxcvbnResult, zxcvbn } from '@zxcvbn-ts/core'

const props = defineProps({
  password: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const getPasswordStrength = computed(() => {
  const value = unref(props.password)
  const zxcvbnRef = zxcvbn(unref(props.password)) as ZxcvbnResult
  return value ? zxcvbnRef.score : -1
})
</script>

<template>
  {{ props }}
  {{getPasswordStrength}}
  <div
    class="relative h-6px mt-10px mb-6px mr-auto ml-auto password-strength-meter__bar"
  >
    <div class="password-strength-meter__bar--fill" :data-score="getPasswordStrength" />
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
      background-color: var(--border-color-light);
      border-radius: 6px;
      &::before,
      &::after {
        position: absolute;
        z-index: 10;
        display: block;
        width: 20%;
        height: inherit;
        background-color: transparent;
        border-color: var(--border-color-light);
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

