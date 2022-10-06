import type { Locale } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { defu } from 'defu'
import { get as getCookie, set as setCookie } from 'es-cookie'

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

  const importLocale = () => import('date-fns/locale')
  const locales = (await importLocale()) as Record<string, Locale>

  if (isServer() && !options.nuxt)
    return enUS

  if (options.storageKey && !options.nuxt) {
    const cookie = getCookie(options.storageKey)

    if (!cookie) {
      setCookie(options.storageKey, options.locale)
    }
    else {
      const localesToTry = [cookie, cookie.split('-')[0], 'en-US']

      for (const l of localesToTry) {
        try {
          const data = locales[l]
          return data
        }
        catch (error) {
          continue
        }
      }
    }
  }
  else {
    const localesToTry = [
      options.locale,
      options.locale.split('-')[0],
      'en-US',
    ]
    for (const l of localesToTry) {
      try {
        const data = locales[l]
        return data
      }
      catch (error) {
        continue
      }
    }
  }
  return enUS
}
