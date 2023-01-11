// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    '@huntersofbook/i18n/nuxt',
  ],
  huntersofbookI18n: {
    languages: ['tr', 'en', 'cn'],
  },
})
