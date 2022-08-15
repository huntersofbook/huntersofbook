<script>
import { NConfigProvider, NGlobalStyle, NSpace, inputDark, lightTheme } from 'naive-ui'
</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <Footer />
    <NConfigProvider>
      <n-space vertical>
        <NGlobalStyle />
        <RouterView />
      </n-space>
    </NConfigProvider>
  </main>
</template>
