<script>
import { NConfigProvider, NDatePicker, NInput, NSpace, createTheme, datePickerDark, inputDark } from 'naive-ui'
</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <Footer />
    <n-config-provider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN">
      <n-space vertical>
        <RouterView />
      </n-space>
    </n-config-provider>
  </main>
</template>
