<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useLocale } from '../docs/.vitepress/i18n/useLocale'
const { locale, availableLocales } = useI18n()

const isOpen = ref(false)

const languages = availableLocales.map((locale) => ({
  label: locale,
  value: locale
}))

const { changeLocale, getLocale } = useLocale()

const changeLanguage = async (value: string) => {
  locale.value = value
  isOpen.value = false
  changeLocale(value as any)
}
</script>

<template>
  <div class="relative box-border">
    <button
      class="text-sm font-medium p-3 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-stone-700 rounded"
      @click="isOpen = !isOpen"
    >
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
