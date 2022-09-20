const alias = {}

export default defineNuxtConfig({
  alias,
  // app: {
  //   head: {
  //     script: [
  //       {
  //         defer: true,
  //         'data-domain': 'content.nuxtjs.org',
  //         src: 'https://plausible.io/js/script.js'
  //       }
  //     ]
  //   }
  // },
  nitro: {
    prerender: {
      routes: ['/', '/blog/announcing-v2']
    }
  },
  modules: ['@nuxtlabs/github-module'],
  extends: process.env.DOCUS_THEME_PATH || '@nuxt-themes/docus',
  github: {
    owner: 'huntersofbook',
    repo: 'huntersofbook',
    branch: 'main'
  },
  colorMode: {
    preference: 'dark'
  },
  build: {
    transpile: ['/-edge/']
  }
})
