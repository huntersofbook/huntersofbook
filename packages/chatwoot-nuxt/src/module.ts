import { OptionPlugin } from '@huntersofbook/chatwoot-vue'
import {
  addImportsSources,
  addPlugin,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit'
import defu from 'defu'

import { name, version } from '../package.json'

export interface ModuleOptions extends OptionPlugin {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'chatwoot',
    compatibility: {
      nuxt: '^3.0.0-rc.11',
    },
  },
  defaults: {
    init: {
      baseUrl: process.env.CHATWOOT_URL,
      websiteToken: process.env.CHATWOOT_TOKEN || '',
    },
    partytown: false,
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.chatwoot = defu(
      nuxt.options.runtimeConfig.public.chatwoot,
      {
        init: options.init,
        settings: options.settings,
        partytown: false,
      } as ModuleOptions,
    )

    addPlugin({ src: resolve('./runtime/plugin'), mode: 'client' })

    addImportsSources([
      {
        from: '@huntersofbook/chatwoot-vue',
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        imports: [...ChatwootHooks],
      },
    ])
  },
})

const ChatwootHooks = ['useChatWoot']

declare module '@nuxt/schema' {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      chatwoot?: ModuleOptions
    }
  }
}
