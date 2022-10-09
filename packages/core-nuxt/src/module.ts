// import { vueI18n } from '@intlify/vite-plugin-vue-i18n'
// import { VitePluginVueI18nOptions } from '@intlify/vite-plugin-vue-i18n/lib/options'
import { addPlugin, createResolver, defineNuxtModule, installModule } from '@nuxt/kit'
import { defu } from 'defu'

import { name, version } from '../package.json'
import { useHuntersofbookComposables } from './composables/use-composables'
import type { HuntersofbookOptions } from './types'

export default defineNuxtModule<HuntersofbookOptions>({
  meta: {
    name,
    version,
    configKey: 'huntersofbook',
    compatibility: {
      nuxt: '^3.0.0-rc.11',
    },
  },
  defaults: {
    defaultLocale: 'en',
    storageKey: 'locale',
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.huntersofbook = defu(options, {
      defaultLocale: 'en',
      storageKey: 'locale',
    })

    // await installModule('@nuxtjs/i18n')

    addPlugin({ src: resolver.resolve('./runtime/plugin') })

    useHuntersofbookComposables()
  },
})

declare module '@nuxt/schema' {
  interface ConfigSchema {
    runtimeConfig: {
      public?: {
        huntersofbook?: HuntersofbookOptions
      }
    }
  }
}
