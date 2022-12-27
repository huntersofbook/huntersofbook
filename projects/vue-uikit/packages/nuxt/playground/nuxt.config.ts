import { defineNuxtConfig } from 'nuxt/config'

import huntersofbookUIKIT from '..'

export default defineNuxtConfig({
  modules: [
    huntersofbookUIKIT,
    '@nuxtjs/tailwindcss',
  ],
  tailwindcss: {
    configPath: './tailwind.config.js',
    viewer: false,
  },
})
