<script setup lang="ts">
import { useChatWoot } from '@huntersofbook/chatwoot-vue'
const { isOpen, toggle, toggleBubbleVisibility, popoutChatWindow } =
  useChatWoot()

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
const dark = ref(true)
function changeDark() {
  dark.value = !dark.value
  localStorage.setItem('isDark', JSON.stringify(dark.value))
}
onMounted(() => {
  const isDark = localStorage.getItem('isDark')
  if (isDark) dark.value = JSON.parse(isDark)
})
provide('isDark', {
  changeDark,
  dark
})
useHead({
  title: 'Vitesse',
  meta: [
    { name: 'description', content: 'huntersofbook open-source' },
    {
      name: 'theme-color',
      content: computed(() => (isDark.value ? '#00aba9' : '#ffffff'))
    }
  ],
  htmlAttrs: {
    lang: 'en',
    class: computed(() => (dark.value ? 'dark' : 'light'))
  },
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() =>
        preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'
      )
    }
  ]
})
</script>

<template>
  <div class="flex space-x-3">
    <div>{{ isOpen }}</div>
    <button @click="toggle('open')">open</button>
    <button @click="toggle('close')">close</button>
    <div class="flex space-x-3">
      <button @click="toggleBubbleVisibility('hide')">hide</button>
      <button @click="toggleBubbleVisibility('show')">show</button>
      <button @click="popoutChatWindow">open popup</button>
    </div>
  </div>
  <RouterView />
</template>
