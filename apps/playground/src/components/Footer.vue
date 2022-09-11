<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
const { changeDark } = inject('isDark') as any

const toggleDarkMode = () => {
  changeDark()
}
</script>

<template>
  <nav class="text-xl mt-6">
    <RouterLink class="icon-btn mx-2" to="/" :title="t('button.home')">
      <div class="i-carbon-campsite" />
    </RouterLink>

    <button class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleDarkMode">
      <div class="i-carbon-sun" />
    </button>

    <a class="icon-btn mx-2" :title="t('button.toggle_langs')" @click="toggleLocales()">
      <div class="i-carbon-language" />
    </a>

    <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/huntersofbook/huntersofbook" target="_blank" title="GitHub">
      <div class="i-carbon-logo-github" />
    </a>
  </nav>
</template>
