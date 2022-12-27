import { componentNames } from '@huntersofbook/vue-uikit'
import TailwindCSSKIT from '@huntersofbook/vue-uikit/tailwindPlugin'
import chalk from 'chalk'

import {
  addComponent,
  createResolver,
  defineNuxtModule,
  logger,
} from '@nuxt/kit'

import { name, version } from '../package.json'

export interface ModuleOptions {
  splash: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'huntersofbookUIKIT',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults(nuxt) {
    return {
      splash: nuxt.options.dev,
    }
  },
  async setup(config, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.hook('prepare:types', ({ tsConfig, references }) => {
      tsConfig.compilerOptions!.types.push('@huntersofbook/vue-uikit/volar')
      references.push({
        path: resolve(nuxt.options.buildDir, 'types/huntersofbook-uikit.d.ts'),
      })
    })

    // @nuxtjs/tailwindcss support
    nuxt.hook('tailwindcss:config', (tailwindConfig) => {
      tailwindConfig.plugins = tailwindConfig.plugins ?? []
      tailwindConfig.plugins.push(TailwindCSSKIT)
    })

    componentNames.forEach((name: any) => {
      addComponent({
        name,
        export: name,
        filePath: '@huntersofbook/vue-uikit',
      })
    })
    logger.log(config)
    if (config.splash) {
      let latestTag = `v${version}`
      try {
        latestTag = (await $fetch<any>('https://registry.npmjs.org/@huntersofbook/schob'))
      }
      catch (e) {
      }

      logger.log(`${chalk.green('huntersofbook UIKIT')} ${chalk.yellow(`v${version}`)} • simple and powerful ${chalk.gray(`by ${chalk.underline('@productdevbook')}`)}`)
      if (latestTag !== `v${version}`)
        logger.log(`${chalk.gray('  ├─ ')}🎉 New version available!${chalk.gray(` Run ${chalk.underline(`pnpm i @huntersofbook/nuxt-uikit@${latestTag}`)} to update.`)}`)

      logger.log(chalk.dim('  └─ 💖  Like this package? Consider sponsoring me on GitHub: https://github.com/sponsors/productdevbook'))
      logger.log('')
    }
  },
})

declare module '@nuxt/schema' {
  interface ConfigSchema {
    publicRuntimeConfig?: {
      'huntersofbookUIKIT'?: ModuleOptions
    }
  }
}

