export type HLanguage =
  | 'en-US'
  | 'en-GB'
  | 'fr-FR'
  | 'zh-CN'
  | 'zh-TW'
  | 'ja-JP'
  | 'tr-TR'

const SUPPORT_LOCALES = ['en-US', 'en-GB', 'fr-FR', 'zh-CN', 'zh-TW', 'ja-JP', 'tr-TR']

export const DEFAULT_LOCALE: HLanguage = 'en-US'

export interface TranslatedStr {
  messages?: { default: { [id: string]: string } }
  fnDate: any
}

interface LocaleDict {
  display: string
  dir: 'ltr' | 'rtl'
  getStrings: () => Promise<TranslatedStr | null>
}

const locales: Record<HLanguage, LocaleDict> = {
  'en-US': {
    display: 'English (US)',
    dir: 'ltr',
    async getStrings() {
      const lang = await import('date-fns/esm/locale/en-US/index.js')
      if (lang) {
        return {
          fnDate: lang,
        }
      }
      else {
        return { fnDate: null }
      }
    },
  },
  'tr-TR': {
    display: 'Türkçe (TR)',
    dir: 'ltr',
    async getStrings() {
      const lang = await import('date-fns/esm/locale/tr/index.js')
      if (lang) {
        return {
          fnDate: lang,
        }
      }
      else {
        return { fnDate: null }
      }
    },
  },
  'en-GB': {
    display: 'English (UK)',
    dir: 'ltr',
    async getStrings() {
      const lang = await import('date-fns/esm/locale/en-GB/index.js')
      if (lang) {
        return {
          fnDate: lang,
        }
      }
      else {
        return { fnDate: null }
      }
    },
  },
  'fr-FR': {
    display: 'Français',
    dir: 'ltr',
    async getStrings() {
      const lang = await import('date-fns/esm/locale/fr/index.js')
      if (lang) {
        return {
          fnDate: lang,
        }
      }
      else {
        return { fnDate: null }
      }
    },
  },
  'zh-CN': {
    display: '中文（简体）',
    dir: 'ltr',
    async getStrings() {
      const lang = await import('date-fns/esm/locale/zh-CN/index.js')
      if (lang) {
        return {
          fnDate: lang,
        }
      }
      else {
        return { fnDate: null }
      }
    },
  },
  'zh-TW': {
    display: '中文（繁體）',
    dir: 'ltr',
    async getStrings() {
      const lang = await import('date-fns/esm/locale/zh-TW/index.js')
      if (lang) {
        return {
          fnDate: lang,
        }
      }
      else {
        return { fnDate: null }
      }
    },
  },
  'ja-JP': {
    display: '日本語',
    dir: 'ltr',
    async getStrings() {
      const lang = await import('date-fns/esm/locale/ja/index.js')
      if (lang) {
        return {
          fnDate: lang,
        }
      }
      else {
        return { fnDate: null }
      }
    },
  },
}

export const findLocale = (locale = 'en', defaultLanguage: HLanguage = 'en-US'): HLanguage => {
  let language: HLanguage = 'en-US'

  const searchArray = SUPPORT_LOCALES.find(l => l === locale)
  if (searchArray)
    language = searchArray as HLanguage

  if (!language) {
    const seachArray = SUPPORT_LOCALES.find(l => l.split('-')[0] === locale)
    if (seachArray)
      language = seachArray as HLanguage
  }

  if (!language) {
    const searchArray = SUPPORT_LOCALES.find(
      l => l.split('-')[0] === locale.split('-')[0],
    )
    if (searchArray)
      language = searchArray as HLanguage
  }

  if (language) {
    const check = SUPPORT_LOCALES.find(l => l === language)
    if (!check)
      language = defaultLanguage
  }

  return language || defaultLanguage
}

export default locales
