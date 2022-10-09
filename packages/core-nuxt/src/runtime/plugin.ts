import {
  createHuntersofbookEssential,
  loadDateFNSLocale,
} from '@huntersofbook/core'
import { useI18n } from 'vue-i18n'

import { defineNuxtPlugin, useCookie, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig().public.huntersofbook

  const { value } = useCookie(config.storageKey || 'locale')

  if (!value)
    useCookie(config.storageKey || 'locale').value = config.defaultLocale

  const $i18n = useI18n({ useScope: 'global' })
  const dateFnsData = await loadDateFNSLocale({ locale: value, nuxt: true })
  const hob = createHuntersofbookEssential({
    config: { dateFns: { locale: dateFnsData, dateFormat: $i18n.t('date-fns_date'), dateTimeFormat: $i18n.t('date-fns_time') } },
  })

  nuxtApp.vueApp.use(hob)
})
