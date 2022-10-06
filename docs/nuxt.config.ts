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
})
