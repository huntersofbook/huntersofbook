// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@huntersofbook/chatwoot-nuxt', '@nuxtjs/tailwindcss'],

  huntersofbookChatwoot: {
    init: {
      websiteToken: 'b6BejyTTuxF4yPt61ZTZHjdB'
    },
    settings: {
      locale: 'en',
      position: 'left',
      launcherTitle: 'Hello Chat'
      // ... and more settings
    }
  }
})
