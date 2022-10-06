import { defineNuxtConfig } from 'nuxt/config'

import plausible from '..'

export default defineNuxtConfig({
  modules: [plausible],
  plausible: {
    init: {
      domain: 'localhost',
      apiHost: 'https://site.com',
      trackLocalhost: true,
    },
  },
})
