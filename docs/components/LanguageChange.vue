<script setup>
const { locale, locales, setLocale } = useI18n()
const availableLocales = computed(() => {
  return (locales.value)
})
const loading = ref(false)
function changeLocale(data) {
  loading.value = true
  setLocale(data)
  setTimeout(() => {
    if (window) {
      window.location.reload()
      loading.value = false
    }
  }, 300)
}
</script>

<template>
  <div class="flex">
    <button v-for="item in availableLocales" :key="item.code" :class="locale === item.code ? 'bg-blue-400' : 'bg-gray-200'" class="flex items-center justify-center relative rounded-lg p-2" @click.prevent.stop="changeLocale(item.code)">
      <div v-if="loading" class="absolute w-full h-full flex items-center justify-center bg-black opacity-50">
        <Icon name="ph:circle-notch-bold" size="24" class="animate-spin " />
      </div>
      <span class="px-2">{{
        item.name
      }}</span>
    </button>
  </div>
</template>
