import type { Locale } from 'date-fns'
import enUS from 'date-fns/esm/locale/en-US/index.js'
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
          const data = await loadLocale(l)
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
      options.locale.split('_')[0],
      'en-US',
    ]
    for (const l of localesToTry) {
      try {
        const data = await loadLocale(l)
        return data
      }
      catch (error) {
        continue
      }
    }
  }
  return enUS
}

async function loadLocale(locale: string): Promise<Locale> {
  const langFile = await importDateLocale(locale)

  const data
    = 'default' in langFile
      ? langFile.default
      : (await importDateLocale(locale)).default
  return data
}

async function importDateLocale(locale: string): Promise<any> {
  switch (locale) {
    case 'af':
      return await import('date-fns/esm/locale/af/index.js')
    case 'ar-DZ':
      return await import('date-fns/esm/locale/ar-DZ/index.js')
    case 'ar-MA':
      return await import('date-fns/esm/locale/ar-MA/index.js')
    case 'ar-SA':
      return await import('date-fns/esm/locale/ar-SA/index.js')
    case 'az':
      return await import('date-fns/esm/locale/az/index.js')
    case 'be':
      return await import('date-fns/esm/locale/be/index.js')
    case 'bg':
      return await import('date-fns/esm/locale/bg/index.js')
    case 'bn':
      return await import('date-fns/esm/locale/bn/index.js')
    case 'ca':
      return await import('date-fns/esm/locale/ca/index.js')
    case 'cs':
      return await import('date-fns/esm/locale/cs/index.js')
    case 'cy':
      return await import('date-fns/esm/locale/cy/index.js')
    case 'da':
      return await import('date-fns/esm/locale/da/index.js')
    case 'de':
      return await import('date-fns/esm/locale/de/index.js')
    case 'de-AT':
      return await import('date-fns/esm/locale/de-AT/index.js')
    case 'el':
      return await import('date-fns/esm/locale/el/index.js')
    case 'en-AU':
      return await import('date-fns/esm/locale/en-AU/index.js')
    case 'en-CA':
      return await import('date-fns/esm/locale/en-CA/index.js')
    case 'en-GB':
      return await import('date-fns/esm/locale/en-GB/index.js')
    case 'en-IN':
      return await import('date-fns/esm/locale/en-IN/index.js')
    case 'en-NZ':
      return await import('date-fns/esm/locale/en-NZ/index.js')
    case 'en-US':
      return await import('date-fns/esm/locale/en-US/index.js')
    case 'en-ZA':
      return await import('date-fns/esm/locale/en-ZA/index.js')
    case 'eo':
      return await import('date-fns/esm/locale/eo/index.js')
    case 'es':
      return await import('date-fns/esm/locale/es/index.js')
    case 'et':
      return await import('date-fns/esm/locale/et/index.js')
    case 'eu':
      return await import('date-fns/esm/locale/eu/index.js')
    case 'fa-IR':
      return await import('date-fns/esm/locale/fa-IR/index.js')
    case 'fi':
      return await import('date-fns/esm/locale/fi/index.js')
    case 'fr':
      return await import('date-fns/esm/locale/fr/index.js')
    case 'fr-CA':
      return await import('date-fns/esm/locale/fr-CA/index.js')
    case 'fr-CH':
      return await import('date-fns/esm/locale/fr-CH/index.js')
    case 'gd':
      return await import('date-fns/esm/locale/gd/index.js')
    case 'gl':
      return await import('date-fns/esm/locale/gl/index.js')
    case 'gu':
      return await import('date-fns/esm/locale/gu/index.js')
    case 'he':
      return await import('date-fns/esm/locale/he/index.js')
    case 'hi':
      return await import('date-fns/esm/locale/hi/index.js')
    case 'hr':
      return await import('date-fns/esm/locale/hr/index.js')
    case 'ht':
      return await import('date-fns/esm/locale/ht/index.js')
    case 'hu':
      return await import('date-fns/esm/locale/hu/index.js')
    case 'hy':
      return await import('date-fns/esm/locale/hy/index.js')
    case 'id':
      return await import('date-fns/esm/locale/id/index.js')
    case 'is':
      return await import('date-fns/esm/locale/is/index.js')
    case 'it':
      return await import('date-fns/esm/locale/it/index.js')
    case 'ja':
      return await import('date-fns/esm/locale/ja/index.js')
    case 'ka':
      return await import('date-fns/esm/locale/ka/index.js')
    case 'kk':
      return await import('date-fns/esm/locale/kk/index.js')
    case 'kn':
      return await import('date-fns/esm/locale/kn/index.js')
    case 'ko':
      return await import('date-fns/esm/locale/ko/index.js')
    case 'lb':
      return await import('date-fns/esm/locale/lb/index.js')
    case 'lt':
      return await import('date-fns/esm/locale/lt/index.js')
    case 'lv':
      return await import('date-fns/esm/locale/lv/index.js')
    case 'mk':
      return await import('date-fns/esm/locale/mk/index.js')
    case 'mn':
      return await import('date-fns/esm/locale/mn/index.js')
    case 'ms':
      return await import('date-fns/esm/locale/ms/index.js')
    case 'mt':
      return await import('date-fns/esm/locale/mt/index.js')
    case 'nb':
      return await import('date-fns/esm/locale/nb/index.js')
    case 'nl':
      return await import('date-fns/esm/locale/nl/index.js')
    case 'nl-BE':
      return await import('date-fns/esm/locale/nl-BE/index.js')
    case 'nn':
      return await import('date-fns/esm/locale/nn/index.js')
    case 'pl':
      return await import('date-fns/esm/locale/pl/index.js')
    case 'pt':
      return await import('date-fns/esm/locale/pt/index.js')
    case 'pt-BR':
      return await import('date-fns/esm/locale/pt-BR/index.js')
    case 'ro':
      return await import('date-fns/esm/locale/ro/index.js')
    case 'ru':
      return await import('date-fns/esm/locale/ru/index.js')
    case 'sk':
      return await import('date-fns/esm/locale/sk/index.js')
    case 'sl':
      return await import('date-fns/esm/locale/sl/index.js')
    case 'sq':
      return await import('date-fns/esm/locale/sq/index.js')
    case 'sr':
      return await import('date-fns/esm/locale/sr/index.js')
    case 'sr-Latn':
      return await import('date-fns/esm/locale/sr-Latn/index.js')
    case 'sv':
      return await import('date-fns/esm/locale/sv/index.js')
    case 'ta':
      return await import('date-fns/esm/locale/ta/index.js')
    case 'te':
      return await import('date-fns/esm/locale/te/index.js')
    case 'th':
      return await import('date-fns/esm/locale/th/index.js')
    case 'tr':
      return await import('date-fns/esm/locale/tr/index.js')
    case 'ug':
      return await import('date-fns/esm/locale/ug/index.js')
    case 'uk':
      return await import('date-fns/esm/locale/uk/index.js')
    case 'uz':
      return await import('date-fns/esm/locale/uz/index.js')
    case 'vi':
      return await import('date-fns/esm/locale/vi/index.js')
    case 'zh-CN':
      return await import('date-fns/esm/locale/zh-CN/index.js')
    case 'zh-TW':
      return await import('date-fns/esm/locale/zh-TW/index.js')
    default:
      return Promise.resolve()
  }
}
