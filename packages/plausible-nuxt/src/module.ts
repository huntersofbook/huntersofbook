import { resolve } from 'path'
import { fileURLToPath } from 'url'

import { OptionPlugin } from '@huntersofbook/plausible-vue'
import { addImports, addPlugin, defineNuxtModule } from '@nuxt/kit'
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

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    addPlugin({ src: resolve(runtimeDir, 'plugin'), mode: 'client' })

    addImports([
      ...[
        'usePlausible'
      ].map(key => ({
        name: key,
        as: key,
        from: resolve(runtimeDir, 'composables')
      }))
    ])
  }
})
