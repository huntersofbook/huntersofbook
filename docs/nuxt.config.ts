const alias = {}

export default defineNuxtConfig({
  alias,
  nitro: {
    prerender: {
      routes: ['/', '/blog/announcing-v2'],
    },
  },
  modules: [
    '@nuxtlabs/github-module',
    '@huntersofbook/plausible-nuxt',
    'nuxt-icon',
    '@huntersofbook/core-nuxt',
    '@nuxtjs/i18n',
    '@vueuse/motion/nuxt',
  ],
  extends: process.env.DOCUS_THEME_PATH || '@nuxt-themes/docus',
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
      apiHost: process.env.PLAUSIBLE,
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
