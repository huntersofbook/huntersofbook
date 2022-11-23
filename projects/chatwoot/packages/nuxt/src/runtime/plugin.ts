import type { Chatwoot } from '@huntersofbook/chatwoot-vue'
import { createChatWoot } from '@huntersofbook/chatwoot-vue'

import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  if (config.public.chatwoot.init) {
    const chatwoot = createChatWoot(config.public.chatwoot)
    nuxtApp.vueApp.use(chatwoot)
    nuxtApp.provide('chatwoot', config.public.chatwoot)
  }
})

interface PluginInjection {
  $chatwoot: Chatwoot
}

declare module '#app' {
  interface NuxtApp extends PluginInjection {}
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends PluginInjection {}
}
