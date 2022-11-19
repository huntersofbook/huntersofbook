export type HLanguage =
  | 'en-US'
  | 'en-GB'
  | 'fr-FR'
  | 'zh-CN'
  | 'zh-TW'
  | 'ja-JP'
  | 'tr-TR'
export const DEFAULT_LOCALE: HLanguage = 'en-US'

export interface TranslatedStr {
  messages?: { default: { [id: string]: string } }
  fnDate: Promise<any>
}

interface LocaleDict {
  display: string
  dir: 'ltr' | 'rtl'
  getStrings: () => TranslatedStr
}

const locales: Record<HLanguage, LocaleDict> = {
  'en-US': {
    display: 'English (US)',
    dir: 'ltr',
    getStrings() {
      return {
        fnDate: import('date-fns/esm/locale/en-US/index.js'),
      }
    },
  },
  'tr-TR': {
    display: 'Türkçe (TR)',
    dir: 'ltr',
    getStrings() {
      return {
        fnDate: import('date-fns/esm/locale/tr/index.js'),
      }
    },
  },
  'en-GB': {
    display: 'English (UK)',
    dir: 'ltr',
    getStrings() {
      return {
        fnDate: import('date-fns/esm/locale/en-GB/index.js'),
      }
    },
  },
  'fr-FR': {
    display: 'Français',
    dir: 'ltr',
    getStrings() {
      return {
        fnDate: import('date-fns/esm/locale/fr/index.js'),
      }
    },
  },
  'zh-CN': {
    display: '中文（简体）',
    dir: 'ltr',
    getStrings() {
      return {
        fnDate: import('date-fns/esm/locale/zh-CN/index.js'),
      }
    },
  },
  'zh-TW': {
    display: '中文（繁體）',
    dir: 'ltr',
    getStrings() {
      return {
        fnDate: import('date-fns/esm/locale/zh-TW/index.js'),
      }
    },
  },
  'ja-JP': {
    display: '日本語',
    dir: 'ltr',
    getStrings() {
      return {
        fnDate: import('date-fns/esm/locale/ja/index.js'),
      }
    },
  },
}

export default locales
