import { createPlausible } from '@huntersofbook/plausible-vue'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { huntersofbookPlausible } = useAppConfig() as any
  const hob = createPlausible(huntersofbookPlausible)
  nuxtApp.hook('vue:setup', () => {
    nuxtApp.vueApp.use(hob)
  })
})
