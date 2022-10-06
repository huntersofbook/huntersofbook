import { Plugin as VuePlugin, computed } from 'vue'

import { ModuleOptions } from '../module'

import { defineNuxtPlugin, useRuntimeConfig } from '#app'

const plugin: VuePlugin = {
  install: (app, options: ModuleOptions) => {
    app.provide('n-config-provider', {
      mergedThemeHashRef: computed(() => ''),
      mergedBreakpointsRef: computed(() => undefined),
      mergedRtlRef: computed(() => undefined),
      mergedIconsRef: computed(() => undefined),
      mergedComponentPropsRef: computed(() => undefined),
      mergedBorderedRef: computed(() => undefined),
      mergedNamespaceRef: computed(() => undefined),
      mergedClsPrefixRef: computed(() => undefined),
      mergedLocaleRef: computed(() => undefined),
      mergedDateLocaleRef: computed(() => undefined),
      mergedHljsRef: computed(() => undefined),
      mergedThemeRef: computed(() => undefined),
      mergedThemeOverridesRef: computed(() => options.themeOverrides),
      inlineThemeDisabled: false,
      preflightStyleDisabled: false,
    })
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()?.public?.naiveUI
  if (config)
    nuxtApp.vueApp.use(plugin, config)
})
