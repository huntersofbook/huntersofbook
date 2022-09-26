import { defineNuxtConfig } from 'nuxt/config'

import chatwoot from '..'

export default defineNuxtConfig({
  modules: [chatwoot],
  chatwoot: {
    init: {
      websiteToken: 'b6BejyTTuxF4yPt61ZTZHjdB'
    },
    settings: {
      locale: 'en',
      position: 'left',
      launcherTitle: 'Hello Chat'
    }
  }
})
