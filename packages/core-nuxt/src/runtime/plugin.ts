import {
  createHuntersofbookEssential,
  loadDateFNSLocale,
} from '@huntersofbook/core'

import { defineNuxtPlugin, useCookie, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig().public.huntersofbook

  const { value } = useCookie(config.storageKey || 'locale')

  if (!value)
    useCookie(config.storageKey || 'locale').value = config.defaultLocale

  const dateFnsData = await loadDateFNSLocale({ locale: value, nuxt: true })
  const hob = createHuntersofbookEssential({
    config: { dateLocale: dateFnsData },
  })

  nuxtApp.vueApp.use(hob)
})
