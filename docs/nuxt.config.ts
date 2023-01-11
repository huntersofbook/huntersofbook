export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  modules: [
    '@nuxtlabs/github-module',
    '@huntersofbook/plausible-nuxt',
    'nuxt-icon',
    '@huntersofbook/core-nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt',
  ],
  github: {
    owner: 'huntersofbook',
    repo: 'huntersofbook',
    branch: 'main',
  },
  colorMode: {
    preference: 'dark',
  },
  plausible: {
    init: {
      apiHost: 'https://rapor.vucod.com',
      domain: 'opensource.huntersofbook.com',
    },
  },
  huntersofbook: {
    storageKey: 'locale',
  },
  // localization - i18n config
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.json',
        name: 'English',
      },
      { code: 'tr', file: 'tr-TR.json', name: 'Türkçe' },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'locale',
      redirectOn: 'root', // recommended
    },
    vueI18n: {
      legacy: false,
      locale: 'en',
      fallbackLocale: 'en',
      availableLocales: ['en', 'tr'],
    },
  },

})
