import type { Locale } from 'date-fns'
// import { ComputedRef } from 'vue'

import { ColorConfig } from '../color-config'

export interface GlobalConfig {
  colors?: ColorConfig
  /**
   * date-fns locale
   */
  dateLocale: Locale
}

export interface SizeConfig {
  defaultSize?: number
  sizes?: { [sizeName: string]: number | string }
}

export type GlobalConfigUpdater = (config: GlobalConfig) => GlobalConfig
