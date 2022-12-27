import { componentNames } from '@huntersofbook/vue-uikit'
import TailwindCSSKIT from '@huntersofbook/vue-uikit/tailwindcss'
import {
  addComponent,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit'

import { name, version } from '../package.json'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'huntersofbookUIKIT',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.hook('prepare:types', ({ tsConfig, references }) => {
      tsConfig.compilerOptions!.types.push('@huntersofbook/vue-uikit/volar')
      references.push({
        path: resolve(nuxt.options.buildDir, 'types/huntersofbook-uikit.d.ts'),
      })
    })

    // @nuxtjs/tailwindcss support
    // @ts-expect-error - Module might not exist
    nuxt.hook('tailwindcss:config', (tailwindConfig) => {
      tailwindConfig.content = tailwindConfig.content ?? []
      tailwindConfig.plugins.push(TailwindCSSKIT)
    })

    componentNames.forEach((name: any) => {
      addComponent({
        name,
        export: name,
        filePath: '@huntersofbook/vue-uikit',
      })
    })
  },
})

declare module '@nuxt/schema' {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      'huntersofbookUIKIT'?: ModuleOptions
    }
  }
}

