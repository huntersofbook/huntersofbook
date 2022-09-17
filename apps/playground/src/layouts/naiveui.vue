<script setup lang="ts">
import {
  NConfigProvider,
  NGlobalStyle,
  NSpace,
  darkTheme,
  lightTheme
} from 'naive-ui'
const { dark } = inject('isDark') as any
</script>

<template>
  <main
    class="px-4 py-10 text-center text-gray-700 dark:text-gray-200 dark:bg-stone-900"
  >
    <Footer />
    <NConfigProvider :theme="dark ? darkTheme : lightTheme">
      <NSpace vertical>
        <NGlobalStyle />
        <RouterView />
      </NSpace>
    </NConfigProvider>
  </main>
</template>
