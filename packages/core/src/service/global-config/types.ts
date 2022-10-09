import type { Locale } from 'date-fns'

import { ColorConfig } from '../color-config'

export interface GlobalConfig {
  colors?: ColorConfig
  /**
   * date-fns locale
   */
  dateFns: {
    locale: Locale
    dateFormat?: string
    dateTimeFormat?: string
  }
}

export interface SizeConfig {
  defaultSize?: number
  sizes?: { [sizeName: string]: number | string }
}

export type GlobalConfigUpdater = (config: GlobalConfig) => GlobalConfig
