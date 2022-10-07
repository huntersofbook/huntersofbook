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
} let dateLocale: Locale = enUS

export async function loadDateFNSLocale(lang: DateFNSLocale): Promise<Locale> {
  const options = defu(lang, {
    locale: 'en-US',
    storageKey: 'locale',
    nuxt: false,
  } as DateFNSLocale)
  if (isServer() && !options.nuxt)
    return enUS

  if (options.storageKey && !options.nuxt) {
    const cookie = getCookie(options.storageKey)

    if (!cookie) {
      setCookie(options.storageKey, options.locale)
    }
    else {
      await Promise.all([
        setDateLocale(cookie as any),
      ])
      return dateLocale
    }
  }
  else {
    await Promise.all([
      setDateLocale(options.locale as any),
    ])
    return dateLocale
  }
  return enUS
}

async function setDateLocale(locale: HLanguage) {
  try {
    const data = LocaleData[locale]
    if (data)
      dateLocale = (await data.getStrings()).fnDate.default as Locale
  }
  catch (error) {
    return enUS
  }
}
