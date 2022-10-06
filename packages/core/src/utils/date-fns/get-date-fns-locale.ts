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
      return await import('date-fns/locale/af/index.js')
    case 'ar-DZ':
      return await import('date-fns/locale/ar-DZ/index.js')
    case 'ar-MA':
      return await import('date-fns/locale/ar-MA/index.js')
    case 'ar-SA':
      return await import('date-fns/locale/ar-SA/index.js')
    case 'az':
      return await import('date-fns/locale/az/index.js')
    case 'be':
      return await import('date-fns/locale/be/index.js')
    case 'bg':
      return await import('date-fns/locale/bg/index.js')
    case 'bn':
      return await import('date-fns/locale/bn/index.js')
    case 'ca':
      return await import('date-fns/locale/ca/index.js')
    case 'cs':
      return await import('date-fns/locale/cs/index.js')
    case 'cy':
      return await import('date-fns/locale/cy/index.js')
    case 'da':
      return await import('date-fns/locale/da/index.js')
    case 'de':
      return await import('date-fns/locale/de/index.js')
    case 'de-AT':
      return await import('date-fns/locale/de-AT/index.js')
    case 'el':
      return await import('date-fns/locale/el/index.js')
    case 'en-AU':
      return await import('date-fns/locale/en-AU/index.js')
    case 'en-CA':
      return await import('date-fns/locale/en-CA/index.js')
    case 'en-GB':
      return await import('date-fns/locale/en-GB/index.js')
    case 'en-IN':
      return await import('date-fns/locale/en-IN/index.js')
    case 'en-NZ':
      return await import('date-fns/locale/en-NZ/index.js')
    case 'en-US':
      return await import('date-fns/locale/en-US/index.js')
    case 'en-ZA':
      return await import('date-fns/locale/en-ZA/index.js')
    case 'eo':
      return await import('date-fns/locale/eo/index.js')
    case 'es':
      return await import('date-fns/locale/es/index.js')
    case 'et':
      return await import('date-fns/locale/et/index.js')
    case 'eu':
      return await import('date-fns/locale/eu/index.js')
    case 'fa-IR':
      return await import('date-fns/locale/fa-IR/index.js')
    case 'fi':
      return await import('date-fns/locale/fi/index.js')
    case 'fr':
      return await import('date-fns/locale/fr/index.js')
    case 'fr-CA':
      return await import('date-fns/locale/fr-CA/index.js')
    case 'fr-CH':
      return await import('date-fns/locale/fr-CH/index.js')
    case 'gd':
      return await import('date-fns/locale/gd/index.js')
    case 'gl':
      return await import('date-fns/locale/gl/index.js')
    case 'gu':
      return await import('date-fns/locale/gu/index.js')
    case 'he':
      return await import('date-fns/locale/he/index.js')
    case 'hi':
      return await import('date-fns/locale/hi/index.js')
    case 'hr':
      return await import('date-fns/locale/hr/index.js')
    case 'ht':
      return await import('date-fns/locale/ht/index.js')
    case 'hu':
      return await import('date-fns/locale/hu/index.js')
    case 'hy':
      return await import('date-fns/locale/hy/index.js')
    case 'id':
      return await import('date-fns/locale/id/index.js')
    case 'is':
      return await import('date-fns/locale/is/index.js')
    case 'it':
      return await import('date-fns/locale/it/index.js')
    case 'ja':
      return await import('date-fns/locale/ja/index.js')
    case 'ka':
      return await import('date-fns/locale/ka/index.js')
    case 'kk':
      return await import('date-fns/locale/kk/index.js')
    case 'kn':
      return await import('date-fns/locale/kn/index.js')
    case 'ko':
      return await import('date-fns/locale/ko/index.js')
    case 'lb':
      return await import('date-fns/locale/lb/index.js')
    case 'lt':
      return await import('date-fns/locale/lt/index.js')
    case 'lv':
      return await import('date-fns/locale/lv/index.js')
    case 'mk':
      return await import('date-fns/locale/mk/index.js')
    case 'mn':
      return await import('date-fns/locale/mn/index.js')
    case 'ms':
      return await import('date-fns/locale/ms/index.js')
    case 'mt':
      return await import('date-fns/locale/mt/index.js')
    case 'nb':
      return await import('date-fns/locale/nb/index.js')
    case 'nl':
      return await import('date-fns/locale/nl/index.js')
    case 'nl-BE':
      return await import('date-fns/locale/nl-BE/index.js')
    case 'nn':
      return await import('date-fns/locale/nn/index.js')
    case 'pl':
      return await import('date-fns/locale/pl/index.js')
    case 'pt':
      return await import('date-fns/locale/pt/index.js')
    case 'pt-BR':
      return await import('date-fns/locale/pt-BR/index.js')
    case 'ro':
      return await import('date-fns/locale/ro/index.js')
    case 'ru':
      return await import('date-fns/locale/ru/index.js')
    case 'sk':
      return await import('date-fns/locale/sk/index.js')
    case 'sl':
      return await import('date-fns/locale/sl/index.js')
    case 'sq':
      return await import('date-fns/locale/sq/index.js')
    case 'sr':
      return await import('date-fns/locale/sr/index.js')
    case 'sr-Latn':
      return await import('date-fns/locale/sr-Latn/index.js')
    case 'sv':
      return await import('date-fns/locale/sv/index.js')
    case 'ta':
      return await import('date-fns/locale/ta/index.js')
    case 'te':
      return await import('date-fns/locale/te/index.js')
    case 'th':
      return await import('date-fns/locale/th/index.js')
    case 'tr':
      return await import('date-fns/locale/tr/index.js')
    case 'ug':
      return await import('date-fns/locale/ug/index.js')
    case 'uk':
      return await import('date-fns/locale/uk/index.js')
    case 'uz':
      return await import('date-fns/locale/uz/index.js')
    case 'vi':
      return await import('date-fns/locale/vi/index.js')
    case 'zh-CN':
      return await import('date-fns/locale/zh-CN/index.js')
    case 'zh-TW':
      return await import('date-fns/locale/zh-TW/index.js')
    default:
      return Promise.resolve()
  }
}
