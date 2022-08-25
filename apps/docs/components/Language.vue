<script setup lang="ts">
import { loadDateFNSLocale } from 'huntersofbook'
import { useI18n } from 'vue-i18n'
const { locale, availableLocales } = useI18n()

const languages = availableLocales.map(locale => ({
  label: locale,
  value: locale,
}))
const changeLanguage = async (value: string) => {
  await loadDateFNSLocale(value).then((res) => {
    console.log(res)
  })
  locale.value = value
}
</script>

<template>
  <div class="relative box-border">
    <button class="text-sm font-medium p-3 flex items-center justify-center hover:bg-stone-700 rounded">
      <div class="i-ph-translate-bold text-lg mr-2" />
      {{ locale }}
    </button>
    <div
      class="absolute top-0 left-0 mt-12 bg-stone-500 rounded w-20"
    >
      <button
        v-for="language in languages"
        :key="language.value"
        class="p-3 flex items-center justify-center hover:bg-stone-700 rounded"
        @click="changeLanguage(language.value)"
      >
        {{ language.label }}
      </button>
    </div>
  </div>
</template>
