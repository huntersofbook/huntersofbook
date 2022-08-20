<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, NSpace } from 'naive-ui'
</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <Footer />
    <NConfigProvider>
      <NSpace vertical>
        <NGlobalStyle />
        <RouterView />
      </NSpace>
    </NConfigProvider>
  </main>
</template>
