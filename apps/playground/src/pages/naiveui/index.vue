<template>
  <div class="grid grid-cols-4 gap-6 max-w-7xl mx-auto">
    <button class="dark:bg-gray-800 p-4 rounded-lg" @click="$router.push('/naiveui/login')">
      Login Page
    </button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: naiveui
</route>
