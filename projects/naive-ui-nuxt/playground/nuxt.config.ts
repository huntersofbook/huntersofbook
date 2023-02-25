import { defineNuxtConfig } from 'nuxt/config'

import naiveUI from '..'

export default defineNuxtConfig({
  modules: [naiveUI, '@nuxtjs/tailwindcss'],

  naiveUI: {
    themeOverrides: {
      common: {
        primaryColor: '#ff0000',
        primaryColorHover: '#8b0000',
      },
    },
  },
})
