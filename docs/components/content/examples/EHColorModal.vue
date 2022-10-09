<script setup lang="ts">
import { HColorModal } from '@huntersofbook/ui'
const isOpen = ref(false)
</script>

<template>
  <div>
    <ClientOnly>
      <HColorModal :visible="isOpen" />
    </ClientOnly>
    <button @click="isOpen = !isOpen">
      open
    </button>
  </div>
</template>
