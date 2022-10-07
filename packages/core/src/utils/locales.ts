export type HLanguage = 'en-US' | 'en-GB' | 'fr-FR' | 'zh-CN' | 'zh-TW' | 'ja-JP' | 'tr'
export const DEFAULT_LOCALE: HLanguage = 'en-US'

export interface TranslatedStr {
  messages?: { default: { [id: string]: string } }
  fnDate: { default: object }
}

interface LocaleDict {
  display: string
  dir: 'ltr' | 'rtl'
  getStrings: () => Promise<TranslatedStr>
}

const locales: Record<HLanguage, LocaleDict> = {
  'en-US': {
    display: 'English (US)',
    dir: 'ltr',
    async getStrings() {
      return {
        fnDate: await import('date-fns/locale/en-US/index.js'),
      }
    },
  },
  'tr': {
    display: 'English (US)',
    dir: 'ltr',
    async getStrings() {
      return {
        fnDate: await import('date-fns/locale/tr/index.js'),
      }
    },
  },
  'en-GB': {
    display: 'English (UK)',
    dir: 'ltr',
    async getStrings() {
      return {
        fnDate: await import('date-fns/locale/en-GB/index.js'),
      }
    },
  },
  'fr-FR': {
    display: 'Français',
    dir: 'ltr',
    async getStrings() {
      return {
        fnDate: await import('date-fns/locale/fr/index.js'),
      }
    },
  },
  'zh-CN': {
    display: '中文（简体）',
    dir: 'ltr',
    async getStrings() {
      return {
        fnDate: await import('date-fns/locale/zh-CN'),
      }
    },
  },
  'zh-TW': {
    display: '中文（繁體）',
    dir: 'ltr',
    async getStrings() {
      return {
        fnDate: await import('date-fns/locale/zh-TW'),
      }
    },
  },
  'ja-JP': {
    display: '日本語',
    dir: 'ltr',
    async getStrings() {
      return {
        fnDate: await import('date-fns/locale/ja'),
      }
    },
  },
}

export default locales
