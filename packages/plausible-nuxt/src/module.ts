import { fileURLToPath } from 'url'

import { OptionPlugin } from '@huntersofbook/plausible-vue'
import { addImports, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'

import { name, version } from '../package.json'

export interface ModuleOptions extends OptionPlugin {
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'huntersofbookPlausible',
    compatibility: {
      nuxt: '^3'
    }
  },
  defaults: {
    init: {
      domain: 'location.hostname',
      apiHost: 'https://plausible.io',
      trackLocalhost: false
    },
    settings: {
      enableAutoOutboundTracking: false,
      enableAutoPageviews: true
    }
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.appConfig.huntersofbookPlausible = defu(options, {
      init: {
        domain: 'localhost',
        apiHost: 'https://plausible.io',
        trackLocalhost: true
      },
      settings: {
        enableAutoOutboundTracking: false,
        enableAutoPageviews: true
      }
    })

    addPlugin({ src: resolve('./runtime/plugin'), mode: 'client' })

    addImports([
      ...[
        'usePlausible'
      ].map(key => ({
        name: key,
        as: key,
        from: resolve('./runtime/composables')
      }))
    ])
  }
})
