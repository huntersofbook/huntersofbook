<script setup lang="ts">
import { loadDateFNSLocale } from 'huntersofbook'
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
const { locale, availableLocales } = useI18n()

const isOpen = ref(false)

const languages = availableLocales.map(locale => ({
  label: locale,
  value: locale,
}))

const changeLanguage = async (value: string) => {
  await loadDateFNSLocale(value).then((res) => {
    locale.value = value
    isOpen.value = false
    // window.location.reload()
    localStorage.setItem('chooseLanguage', value)
  })
}
</script>

<template>
  <div class="relative box-border">
    <button class="text-sm font-medium p-3 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-stone-700 rounded" @click="isOpen = !isOpen">
      <div class="i-ph-translate-bold text-lg mr-2" />
      {{ locale }}
    </button>
    <div
      v-if="isOpen"

      class="absolute top-0 left-0 mt-12 bg-gray-200 dark:bg-stone-500 rounded w-20 p-1"
    >
      <button
        v-for="language in languages"
        :key="language.value"
        class="px-3 py-2 flex w-full items-center hover:bg-gray-400 justify-center dark:hover:bg-stone-700 rounded"
        @click="changeLanguage(language.value)"
      >
        {{ language.label }}
      </button>
    </div>
  </div>
</template>
