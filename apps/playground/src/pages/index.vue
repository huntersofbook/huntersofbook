<script setup lang="ts">

</script>

<template>
  <div class="grid grid-cols-4 gap-6 max-w-7xl mx-auto">
    <button class="dark:bg-gray-800 bg-gray-300 p-4 rounded-lg" @click="$router.push('/naiveui')">
      Naive UI
    </button>
    <button class="dark:bg-gray-800 bg-gray-300 p-4 rounded-lg" @click="$router.push('/ui')">
      huntersofbook UI
    </button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
