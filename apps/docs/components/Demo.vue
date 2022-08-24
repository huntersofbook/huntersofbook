<script setup>
import { ref } from 'vue'
const showCode = ref(false)
</script>

<template>
  <slot />

  <div class="vp-raw">
    <slot name="demo" />
  </div>

 <div>
   <button
     @click="showCode = !showCode"
    class="flex p-2 rounded-lg items-center justify-end mt-6 font-medium hover:shadow transition-shadow-md bg-gray-100 text-gray-900 dark:text-gray-600"
    :class="{ '!text-green-500': showCode }"
  >
  <div class="i-ph-code-bold mr-2"/>
    show code
  </button>
 </div>

  <div
    v-show="showCode"
    class="mt-2"
  >
    <slot name="code" />
  </div>
</template>