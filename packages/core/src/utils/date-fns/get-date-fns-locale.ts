import type { Locale } from 'date-fns'
import enUS from 'date-fns/locale/en-US/index.js'
import { defu } from 'defu'
import { get as getCookie, set as setCookie } from 'es-cookie'

import LocaleData, { HLanguage } from '../locales'
import { isServer } from '../ssr-utils'

interface DateFNSLocale {
  /**
   * @default 'locale'
   */
  storageKey?: string
  /**
   * @default 'en-US'
   */
  locale: string
  nuxt?: boolean
}

export async function loadDateFNSLocale(lang: DateFNSLocale): Promise<Locale> {
  const options = defu(lang, {
    locale: 'en-US',
    storageKey: 'locale',
    nuxt: false,
  } as DateFNSLocale)

  if (isServer() && !options.nuxt) return enUS

  if (options.storageKey && !options.nuxt) {
    const cookie = getCookie(options.storageKey)

    if (!cookie) {
      setCookie(options.storageKey, options.locale)
      return enUS
    }
    else {
      const data = await setDateLocale(cookie as any)
      return data || enUS
    }
  }
  else {
    const data = await setDateLocale(options.locale as any)
    return data || enUS
  }
}

async function setDateLocale(locale: HLanguage) {
  const data = LocaleData[locale]
  if (data) {
    const getd = data.getStrings()
    const mod = await getd.fnDate
    if (mod) {
      const dateLocale = mod.default
      return dateLocale
    }
    else {
      return enUS
    }
  }
  else {
    return enUS
  }
}
