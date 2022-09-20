const alias = {}

export default defineNuxtConfig({
  alias,
  nitro: {
    prerender: {
      routes: ['/', '/blog/announcing-v2']
    }
  },
  modules: ['@nuxtlabs/github-module', '@huntersofbook/plausible-nuxt'],
  extends: process.env.DOCUS_THEME_PATH || '@nuxt-themes/docus',
  github: {
    owner: 'huntersofbook',
    repo: 'huntersofbook',
    branch: 'main'
  },
  colorMode: {
    preference: 'dark'
  },
  huntersofbookPlausible: {
    init: {
      apiHost: process.env.PLAUSIBLE,
      domain: 'opensource.huntersofbook.com'
    }
  }
})
