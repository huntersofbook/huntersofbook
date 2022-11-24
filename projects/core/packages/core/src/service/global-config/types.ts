import type { Locale } from 'date-fns'

import type { ColorConfig } from '../color-config'

export interface GlobalConfig {
  colors?: ColorConfig
  size?: string
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
