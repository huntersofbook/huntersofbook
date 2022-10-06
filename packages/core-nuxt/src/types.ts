import type { GlobalConfig } from '@huntersofbook/core'

export interface HuntersofbookOptions {
  /**
   * Huntersofbook Global Config
   *
   */
  global?: Omit<GlobalConfig, 'dateLocale'>
  /**
   * The cookie key to store the locale
   * @default 'locale'
   */
  storageKey?: string
  /**
   * @default 'en'
   */
  defaultLocale?: string
}

/** Declare Huntersofbook module options in NuxtConfig */
declare module '@nuxt/schema' {
  interface NuxtConfig {
    huntersofbook?: Partial<HuntersofbookOptions>
  }
}
