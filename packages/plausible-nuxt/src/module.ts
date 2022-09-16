import { resolve } from 'path'
import { fileURLToPath } from 'url'

import { OptionPlugin } from '@huntersofbook/plausible-vue'
import { addImports, addImportsSources, addPlugin, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit'
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
    const logger = useLogger()
    const resolver = createResolver(import.meta.url)

    if (!options.init) {
      logger.warn(' in `.env`')
    }

    if (!options.settings) {
      logger.warn('Nuxt config')
    }

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

    const composables = resolver.resolve('./runtime/composables')

    if (options.init) {
      const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
      nuxt.options.build.transpile.push(runtimeDir)
      addPlugin({ src: resolve(runtimeDir, 'plugin'), mode: 'client' })
    }

    addImports([
      ...[
        'usePlausible'
      ].map(key => ({
        name: key,
        as: key,
        from: composables
      }))
    ])
  }
})
