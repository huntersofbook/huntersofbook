/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  addComponent,
  addImportsSources,
  addPlugin,
  createResolver,
  defineNuxtModule
} from '@nuxt/kit'

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
    addPlugin({ src: resolve('./runtime/plugin'), mode: 'server' })

    // Add auto-imported components
    NaiveComponentNames.map((name) =>
      addComponent({
        name,
        export: name,
        filePath: 'naive-ui'
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

const NaiveComponentNames = [
  'NA',
  'NAffix',
  'NAlert',
  'NAnchor',
  'NAnchorLink',
  'NAutoComplete',
  'NAvatar',
  'NAvatarGroup',
  'NBackTop',
  'NBadge',
  'NBlockquote',
  'NBreadcrumb',
  'NBreadcrumbItem',
  'NButton',
  'NButtonGroup',
  'NCalendar',
  'NCard',
  'NCarousel',
  'NCarouselItem',
  'NCascader',
  'NCheckbox',
  'NCheckboxGroup',
  'NCode',
  'NCol',
  'NCollapse',
  'NCollapseItem',
  'NCollapseTransition',
  'NColorPicker',
  'NConfigProvider',
  'NCountdown',
  'NDataTable',
  'NDatePicker',
  'NDescriptions',
  'NDescriptionsItem',
  'NDialog',
  'NDialogProvider',
  'NDivider',
  'NDrawer',
  'NDrawerContent',
  'NDropdown',
  'NDynamicInput',
  'NDynamicTags',
  'NEl',
  'NElement',
  'NEllipsis',
  'NEmpty',
  'NForm',
  'NFormItem',
  'NFormItemCol',
  'NFormItemGi',
  'NFormItemGridItem',
  'NFormItemRow',
  'NGi',
  'NGlobalStyle',
  'NGradientText',
  'NGrid',
  'NGridItem',
  'NH1',
  'NH2',
  'NH3',
  'NH4',
  'NH5',
  'NH6',
  'NHr',
  'NIcon',
  'NIconWrapper',
  'NImage',
  'NImageGroup',
  'NInput',
  'NInputGroup',
  'NInputGroupLabel',
  'NInputNumber',
  'NLayout',
  'NLayoutContent',
  'NLayoutFooter',
  'NLayoutHeader',
  'NLayoutSider',
  'NLegacyTransfer',
  'NLi',
  'NList',
  'NListItem',
  'NLoadingBarProvider',
  'NLog',
  'NMention',
  'NMenu',
  'NMessageProvider',
  'NModal',
  'NNotificationProvider',
  'NNumberAnimation',
  'NOl',
  'NP',
  'NPageHeader',
  'NPagination',
  'NPopconfirm',
  'NPopover',
  'NPopselect',
  'NProgress',
  'NRadio',
  'NRadioButton',
  'NRadioGroup',
  'NRate',
  'NResult',
  'NRow',
  'NScrollbar',
  'NSelect',
  'NSkeleton',
  'NSlider',
  'NSpace',
  'NSpin',
  'NStatistic',
  'NStep',
  'NSteps',
  'NSwitch',
  'NTab',
  'NTabPane',
  'NTable',
  'NTabs',
  'NTag',
  'NTbody',
  'NTd',
  'NText',
  'NTh',
  'NThead',
  'NThing',
  'NTime',
  'NTimePicker',
  'NTimeline',
  'NTimelineItem',
  'NTooltip',
  'NTr',
  'NTransfer',
  'NTree',
  'NTreeSelect',
  'NUl',
  'NUpload',
  'NUploadDragger',
  'NUploadFileList',
  'NUploadTrigger',
  'NWatermark'
]
