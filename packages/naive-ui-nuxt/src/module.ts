import { addImportsSources, addVitePlugin, defineNuxtModule } from '@nuxt/kit'
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

    nuxt.hook('prepare:types', ({ tsConfig }) => {
      tsConfig.compilerOptions.types.push('naive-ui/volar')
    })

    nuxt.options.head.meta.push({ name: 'naive-ui-style' })

    addVitePlugin(
      Components({
        dts: '.nuxt/naive-ui.d.ts',
        dirs: [],
        resolvers: [NaiveUiResolver()]
      })
    )

    addImportsSources([
      {
        from: 'naive-ui',
        imports: [...NaiveUIHooks]
      }
    ])
  }
})
