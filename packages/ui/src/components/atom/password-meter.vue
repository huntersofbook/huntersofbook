<script setup lang="ts">
import { computed } from 'vue'
import { zxcvbn } from '@zxcvbn-ts/core'

const props = defineProps({
  password: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
})

const passwordStrength = computed(() =>
  props.password ? zxcvbn(props.password, undefined).score : null,
)
</script>

<template>
  <div class="Password__strength-meter">
    <div
      class="Password__strength-meter--fill"
      :data-score="passwordStrength"
    />
  </div>
</template>

<style lang="css">
  .Password__strength-meter {
    @apply h-1.5 rounded-sm bg-gray-300 dark:bg-gray-900;
    position: relative;
    margin: 10px auto 20px;
  }
  .Password__strength-meter:before,
  .Password__strength-meter:after {
    @apply border-gray-100 dark:border-gray-900;
    content: '';
    height: inherit;
    background: transparent;
    display: block;
    border-style: solid;
    border-width: 0 5px 0 5px;
    position: absolute;
    width: 20%;
    z-index: 10;
  }
  .Password__strength-meter:before {
    left: 20%;
  }
  .Password__strength-meter:after {
    right: 20%;
  }
  .Password__strength-meter--fill {
    background: transparent;
    height: inherit;
    position: absolute;
    width: 0;
    border-radius: inherit;
    transition: width 0.5s ease-in-out, background 0.25s;
  }
  .Password__strength-meter--fill[data-score='0'] {
    @apply bg-red-800;
    width: 20%;
  }
  .Password__strength-meter--fill[data-score='1'] {
    @apply bg-red-500;
    width: 40%;
  }
  .Password__strength-meter--fill[data-score='2'] {
    @apply bg-yellow-400;
    width: 60%;
  }
  .Password__strength-meter--fill[data-score='3'] {
    @apply bg-yellow-600;
    width: 80%;
  }
  .Password__strength-meter--fill[data-score='4'] {
    @apply bg-green-500;
    width: 100%;
  }
  .Password__toggle {
    line-height: 1.1;
    margin-right: 13px;
  }
</style>
