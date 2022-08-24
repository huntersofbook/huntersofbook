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
  <div class="i-ph-computer-tower-duotone text-lg text-blue-600 w-5 h-5"></div>
   <button
    class="flex p-2 rounded-lg items-center justify-end mt-6 font-medium hover:shadow transition-shadow-md bg-gray-100 text-gray-900 dark:text-gray-600"
    :class="{ '!text-green-500': showCode }"
  >
    <div
      class="i-ph-code-bold cursor-pointer"
      @click="showCode = !showCode"
    >show code</div>
  </button>
 </div>

  <div
    v-show="showCode"
    class="mt-2"
  >
    <slot name="code" />
  </div>
</template>