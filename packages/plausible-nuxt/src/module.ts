import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin } from '@nuxt/kit'
import { createPlausible } from '@huntersofbook/plausible-vue'

export interface ModuleOptions extends OptionPlugin {
  addPlugin: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'my-module',
    configKey: 'myModule',
    compatibility: {
      nuxt: '^3.0.0-rc.7'
    }
  },
  defaults: {
    addPlugin: true,
    init: {
      domain: 'localhost',
      apiHost: '',
      trackLocalhost: true
    },
    settings: {
      enableAutoOutboundTracking: false,
      enableAutoPageviews: true
    }
  },
  setup (options, nuxt) {
    if (options.addPlugin) {
      const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
      nuxt.options.build.transpile.push(runtimeDir)
      addPlugin(resolve(runtimeDir, 'plugin'))
    }
  }
})
