import { addVitePlugin, defineNuxtModule } from '@nuxt/kit'
// Workaround for:
// src/nuxt.ts(5,1): error TS2742: The inferred type of 'default' cannot be named without a reference to '.pnpm/@nuxt+schema@3.0.0_rollup@2.79.0/node_modules/@nuxt/schema'. This is likely not portable. A type annotation is necessary.
import type { } from '@nuxt/schema'
import { name, version } from '../package.json'
import type { Options } from './type'
import unplugin from '.'

export default defineNuxtModule({
  meta: {
    name,
    version,
    configKey: 'huntersofbookI18n',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  setup(options: Options) {
    // TODO: Webpack plugin
    // addWebpackPlugin(unplugin.webpack(options))
    addVitePlugin(unplugin.vite(options))
  },
})
