import { promises as fsp } from 'fs'

import {
  addImports,
  addPlugin,
  addTemplate,
  createResolver,
  defineNuxtModule
} from '@nuxt/kit'
import { defu } from 'defu'
import { template } from 'lodash'
import { resolve } from 'pathe'

import { name, version } from '../package.json'
import { distDir } from './dirs'

export interface ModuleOptions {
  /**
   * @default 'nuxt-color-mode'
   */
  storageKey: string
  /**
   * The script that will be injected into the head of the page
   */
  script?: string

  defaultLocale: string
  fallbackLocale: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'huntersofbook',
    compatibility: {
      nuxt: '^3.0.0-rc.11'
    }
  },
  defaults: {
    storageKey: 'lang',
    defaultLocale: 'en',
    fallbackLocale: 'en'
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.huntersofbook = defu(options, {
      locale: 'en'
    })

    // Read script from disk and add to options
    const scriptPath = await resolver.resolve('./script.min.js')
    const scriptT = await fsp.readFile(scriptPath, 'utf-8')
    options.script = template(scriptT)({ options })

    // Inject options via virtual template
    nuxt.options.alias['#huntersofbook-mode-options'] = addTemplate({
      filename: 'huntersofbook-mode-options.mjs',
      getContents: () =>
        Object.entries(options)
          .map(
            ([key, value]) =>
              `export const ${key} = ${JSON.stringify(value, null, 2)}
      `
          )
          .join('\n')
    }).dst

    addPlugin({ src: resolver.resolve('./runtime/plugin'), mode: 'client' })

    addTemplate({
      filename: 'huntersofbook.internal.mjs',
      src: resolve(distDir, 'runtime/internal.mjs')
    })

    addTemplate({
      filename: 'huntersofbook.utils.mjs',
      src: resolve(distDir, 'runtime/utils.mjs')
    })

    addImports([
      ...['useHuntersofbook'].map((key) => ({
        name: key,
        as: key,
        from: resolver.resolve('./runtime/composables')
      }))
    ])

    // Nuxt 3 and Bridge - inject script
    nuxt.hook('nitro:config', (config) => {
      config.virtual = config.virtual || {}
      config.virtual[
        '#color-mode-options'
      ] = `export const script = ${JSON.stringify(options.script, null, 2)}`
    })
  }
})

declare module '@nuxt/schema' {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      huntersofbook?: ModuleOptions
    }
  }
}
