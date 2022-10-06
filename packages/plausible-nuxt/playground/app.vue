<script setup lang="ts">
const { trackEvent } = usePlausible()
</script>

<template>
  <div>
    Nuxt module playground!
    <button @click="trackEvent('nuxt')">
      click me
    </button>
  </div>
</template>
