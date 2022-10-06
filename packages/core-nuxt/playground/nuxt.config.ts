import { defineNuxtConfig } from 'nuxt/config'

import huntersofbook from '..'

export default defineNuxtConfig({
  modules: [huntersofbook],
  huntersofbook: {
    defaultLocale: 'tr'
  }
})
