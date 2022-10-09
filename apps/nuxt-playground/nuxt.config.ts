import presetIcons from '@unocss/preset-icons'
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  srcDir: 'src',
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    // pinia plugin - https://pinia.esm.dev
    '@pinia/nuxt',
    // unocss plugin - https://github.com/unocss/unocss
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    // https://github.com/huntersofbook/huntersofbook/tree/main/packages/naive-ui-nuxt
    '@huntersofbook/naive-ui-nuxt',
    '@huntersofbook/core-nuxt',
    '@vueuse/motion/nuxt',
  ],
  build: {
    transpile: ['@headlessui/vue'],
  },
  unocss: {
    uno: false,
    preflight: false,
    icons: true,
    presets: [
      presetIcons({
        scale: 1.2,
        extraProperties: {
          display: 'inline-block',
        },
      }),
    ],
    safelist: ['i-twemoji-flag-us-outlying-islands', 'i-twemoji-flag-turkey'],
  },
  // localization - i18n config
  i18n: {
    locales: [
      {
        code: 'en-US',
        file: 'en-US.json',
      },
      { code: 'tr-TR', file: 'tr-TR.json' },
    ],
    defaultLocale: 'tr-TR',
    lazy: true,
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'locale',
      redirectOn: 'root', // recommended
    },
    vueI18n: {
      legacy: false,
      locale: 'tr-TR',
      globalInjection: true,
      fallbackLocale: 'tr-TR',
      availableLocales: ['en-US', 'tr-TR'],
    },
  },

  huntersofbook: {
    storageKey: 'locale',
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: true,
        types: ['@pinia/nuxt', '@intlify/nuxt3', './type.d.ts'],
      },
    },
  },
  colorMode: {
    classSuffix: '',
    fallback: 'light',
    storageKey: 'color-mode',
  },
  vite: {
    logLevel: 'info',
  },
})
