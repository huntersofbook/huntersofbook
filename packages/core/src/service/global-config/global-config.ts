import enUS from 'date-fns/locale/en-US/index.js'
import cloneDeep from 'lodash/cloneDeep.js'
import merge from 'lodash/merge.js'
import { Ref, getCurrentInstance, inject, ref } from 'vue'

import { getGlobalProperty } from '../../utils/global-properties'
import { colorsPresets } from '../color-config/color-theme-presets'
import { GlobalConfig, GlobalConfigUpdater } from './types'

export interface ProvidedGlobalConfig {
  globalConfig: Ref<GlobalConfig>
  getGlobalConfig: () => GlobalConfig
  /**
   * Set new global config
   * @see mergeGlobalConfig if you want to update existing config
   */
  setGlobalConfig: (updater: GlobalConfig | GlobalConfigUpdater) => void
  mergeGlobalConfig: (updater: GlobalConfig | GlobalConfigUpdater) => void
}

export const HUNTERSOFBOOK_GLOBAL_CONFIG = Symbol('HUNTERSOFBOOK_GLOBAL_CONFIG')

export const createGlobalConfig = () => {
  const globalConfig = ref<GlobalConfig>({
    colors: colorsPresets.default,
    dateLocale: enUS
  })

  const getGlobalConfig = (): GlobalConfig => globalConfig.value
  const setGlobalConfig = (updater: GlobalConfig | GlobalConfigUpdater) => {
    const config =
      typeof updater === 'function' ? updater(globalConfig.value) : updater
    globalConfig.value = cloneDeep(config)
  }

  const mergeGlobalConfig = (updater: GlobalConfig | GlobalConfigUpdater) => {
    const config =
      typeof updater === 'function' ? updater(globalConfig.value) : updater
    globalConfig.value = merge(cloneDeep(globalConfig.value), config)
  }

  return {
    getGlobalConfig,
    setGlobalConfig,
    mergeGlobalConfig,
    globalConfig
  }
}

/** Use this function if you don't want to throw error if hook used outside setup function by useGlobalConfig */
export function useGlobalConfigSafe() {
  return inject<ProvidedGlobalConfig>(HUNTERSOFBOOK_GLOBAL_CONFIG)
}

export function useGlobalConfig(): ProvidedGlobalConfig {
  const injected = inject<ProvidedGlobalConfig>(HUNTERSOFBOOK_GLOBAL_CONFIG)

  if (!injected) {
    const vm = getCurrentInstance()
    if (!vm) {
      throw new Error('useGlobalConfig must be called in setup function')
    }

    const config = getGlobalProperty(vm.appContext, '$hobConfig')

    if (!config) {
      throw new Error('huntersofbook GlobalConfigPlugin is not registered')
    }

    return config
  }

  return injected
}

export * from './types'
