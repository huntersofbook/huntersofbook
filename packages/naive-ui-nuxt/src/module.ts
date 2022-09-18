import {
  addImportsSources,
  addPlugin,
  addVitePlugin,
  createResolver,
  defineNuxtModule
} from '@nuxt/kit'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

import { name, version } from '../package.json'

const NaiveUIHooks = [
  'darkTheme',
  'lightTheme',
  'useOsTheme',
  'NMessageProvider',
  'NConfigProvider',
  'NLoadingBarProvider',
  'NDialogProvider',
  'NNotificationProvider',
  'useDialog',
  'useMessage',
  'useNotification',
  'useLoadingBar',
  'createTheme',
  'inputDark',
  'datePickerDark',
  'GlobalThemeOverrides'
]

export default defineNuxtModule({
  meta: {
    name,
    version,
    configKey: 'huntersofbookNaiveUI',
    compatibility: {
      nuxt: '^3.0.0-rc.10'
    }
  },
  setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    if (nuxt.options.dev) {
      nuxt.options.build.transpile.push('@juggle/resize-observer')
      nuxt.options.vite.optimizeDeps?.include?.push(
        'naive-ui',
        'vueuc',
        'date-fns-tz/esm/formatInTimeZone'
      )
    } else {
      nuxt.options.build.transpile.push(
        'naive-ui',
        'vueuc',
        '@css-render/vue3-ssr',
        '@juggle/resize-observer'
      )
    }

    nuxt.hook('prepare:types', ({ tsConfig, references }) => {
      tsConfig.compilerOptions!.types.push('naive-ui/volar')
      references.push({
        path: resolve(nuxt.options.buildDir, 'types/naive-ui.d.ts')
      })
    })

    nuxt.options.head.meta.push({ name: 'naive-ui-style' })

    addVitePlugin(
      Components({
        dts: resolve(nuxt.options.buildDir, 'types/naive-ui.d.ts'),
        resolvers: [NaiveUiResolver()]
      })
    )

    addPlugin({ src: resolve('./runtime/plugin'), mode: 'all' })

    addImportsSources([
      {
        from: 'naive-ui',
        imports: [...NaiveUIHooks]
      }
    ])
  }
})
