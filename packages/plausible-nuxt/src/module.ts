import { resolve } from 'path'
import { fileURLToPath } from 'url'

import { OptionPlugin } from '@huntersofbook/plausible-vue'
import { addImportsSources, addPlugin, defineNuxtModule, useLogger } from '@nuxt/kit'
import { defu } from 'defu'

import { name, version } from '../package.json'

export interface ModuleOptions extends OptionPlugin {
}

const HuntersofbookHooks = [
  'usePlausible'
]

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'huntersofbookPlausible',
    compatibility: {
      nuxt: '^3.0.0-rc.10'
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
    addImportsSources([
      {
        from: '@huntersofbook/plausible-vue',
        imports: [...HuntersofbookHooks]
      }
    ])

    if (options.init) {
      const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
      nuxt.options.build.transpile.push(runtimeDir)
      addPlugin({ src: resolve(runtimeDir, 'plugin'), mode: 'client' })
    }
  }
})
