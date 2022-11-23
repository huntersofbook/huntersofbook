import {
  createHuntersofbookEssential,
  loadDateFNSLocale,
} from '@huntersofbook/core'
// import { useI18n } from 'vue-i18n'

import { defineNuxtPlugin, useCookie, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig().public.huntersofbook

  const { value } = useCookie(config.storageKey || 'locale')

  if (!value)
    useCookie(config.storageKey || 'locale').value = config.defaultLocale

  const dateFnsData = await loadDateFNSLocale({ locale: value, nuxt: true })
  // const $i18n = useI18n({ useScope: 'global' })
  // console.log($i18n)
  const hob = createHuntersofbookEssential({
    config: { dateFns: { locale: dateFnsData } },
  })

  nuxtApp.vueApp.use(hob)
})
