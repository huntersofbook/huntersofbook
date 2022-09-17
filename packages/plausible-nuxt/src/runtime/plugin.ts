import { createPlausible } from '@huntersofbook/plausible-vue'
import type { ReturnUsePlasuible } from '@huntersofbook/plausible-vue'

import { defineNuxtPlugin, useAppConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { huntersofbookPlausible } = useAppConfig() as any
  const hob = createPlausible(huntersofbookPlausible)
  nuxtApp.vueApp.use(hob)
  nuxtApp.provide('plausible', nuxtApp.vueApp.config.globalProperties.$plausible)
})

interface PluginInjection {
  $plausible: ReturnUsePlasuible
}

declare module '#app' {
  interface NuxtApp extends PluginInjection {}
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends PluginInjection { }
}
