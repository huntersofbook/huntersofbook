import {
  Ihuntersofbook,
  createHuntersofbook,
  loadDateFNSLocale
} from '@huntersofbook/core'

import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig().public.huntersofbook

  const dateFnsData = await loadDateFNSLocale(config.defaultLocale)
  const hob = createHuntersofbook({ dateFnsLanguage: dateFnsData })

  nuxtApp.vueApp.use(hob)
  nuxtApp.provide(
    'huntersofbook',
    nuxtApp.vueApp.config.globalProperties.$huntersofbook
  )
})

interface PluginInjection {
  $huntersofbook: Ihuntersofbook
}

declare module '#app' {
  interface NuxtApp extends PluginInjection {}
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends PluginInjection {}
}
