import { defineNuxtConfig } from 'nuxt/config'

import huntersofbookPlausible from '..'

export default defineNuxtConfig({
  modules: [huntersofbookPlausible],
  huntersofbookPlausible: {
    init: {
      domain: 'localhost',
      apiHost: 'https://site.com',
      trackLocalhost: true
    }
  }
})
