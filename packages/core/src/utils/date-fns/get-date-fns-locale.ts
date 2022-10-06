import type { Locale } from 'date-fns'
import enUS from 'date-fns/esm/locale/en-US'
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
      return await import('date-fns/esm/locale/af')
    case 'ar-DZ':
      return await import('date-fns/esm/locale/ar-DZ')
    case 'ar-MA':
      return await import('date-fns/esm/locale/ar-MA')
    case 'ar-SA':
      return await import('date-fns/esm/locale/ar-SA')
    case 'az':
      return await import('date-fns/esm/locale/az')
    case 'be':
      return await import('date-fns/esm/locale/be')
    case 'bg':
      return await import('date-fns/esm/locale/bg')
    case 'bn':
      return await import('date-fns/esm/locale/bn')
    case 'ca':
      return await import('date-fns/esm/locale/ca')
    case 'cs':
      return await import('date-fns/esm/locale/cs')
    case 'cy':
      return await import('date-fns/esm/locale/cy')
    case 'da':
      return await import('date-fns/esm/locale/da')
    case 'de':
      return await import('date-fns/esm/locale/de')
    case 'de-AT':
      return await import('date-fns/esm/locale/de-AT')
    case 'el':
      return await import('date-fns/esm/locale/el')
    case 'en-AU':
      return await import('date-fns/esm/locale/en-AU')
    case 'en-CA':
      return await import('date-fns/esm/locale/en-CA')
    case 'en-GB':
      return await import('date-fns/esm/locale/en-GB')
    case 'en-IN':
      return await import('date-fns/esm/locale/en-IN')
    case 'en-NZ':
      return await import('date-fns/esm/locale/en-NZ')
    case 'en-US':
      return await import('date-fns/esm/locale/en-US')
    case 'en-ZA':
      return await import('date-fns/esm/locale/en-ZA')
    case 'eo':
      return await import('date-fns/esm/locale/eo')
    case 'es':
      return await import('date-fns/esm/locale/es')
    case 'et':
      return await import('date-fns/esm/locale/et')
    case 'eu':
      return await import('date-fns/esm/locale/eu')
    case 'fa-IR':
      return await import('date-fns/esm/locale/fa-IR')
    case 'fi':
      return await import('date-fns/esm/locale/fi')
    case 'fr':
      return await import('date-fns/esm/locale/fr')
    case 'fr-CA':
      return await import('date-fns/esm/locale/fr-CA')
    case 'fr-CH':
      return await import('date-fns/esm/locale/fr-CH')
    case 'gd':
      return await import('date-fns/esm/locale/gd')
    case 'gl':
      return await import('date-fns/esm/locale/gl')
    case 'gu':
      return await import('date-fns/esm/locale/gu')
    case 'he':
      return await import('date-fns/esm/locale/he')
    case 'hi':
      return await import('date-fns/esm/locale/hi')
    case 'hr':
      return await import('date-fns/esm/locale/hr')
    case 'ht':
      return await import('date-fns/esm/locale/ht')
    case 'hu':
      return await import('date-fns/esm/locale/hu')
    case 'hy':
      return await import('date-fns/esm/locale/hy')
    case 'id':
      return await import('date-fns/esm/locale/id')
    case 'is':
      return await import('date-fns/esm/locale/is')
    case 'it':
      return await import('date-fns/esm/locale/it')
    case 'ja':
      return await import('date-fns/esm/locale/ja')
    case 'ka':
      return await import('date-fns/esm/locale/ka')
    case 'kk':
      return await import('date-fns/esm/locale/kk')
    case 'kn':
      return await import('date-fns/esm/locale/kn')
    case 'ko':
      return await import('date-fns/esm/locale/ko')
    case 'lb':
      return await import('date-fns/esm/locale/lb')
    case 'lt':
      return await import('date-fns/esm/locale/lt')
    case 'lv':
      return await import('date-fns/esm/locale/lv')
    case 'mk':
      return await import('date-fns/esm/locale/mk')
    case 'mn':
      return await import('date-fns/esm/locale/mn')
    case 'ms':
      return await import('date-fns/esm/locale/ms')
    case 'mt':
      return await import('date-fns/esm/locale/mt')
    case 'nb':
      return await import('date-fns/esm/locale/nb')
    case 'nl':
      return await import('date-fns/esm/locale/nl')
    case 'nl-BE':
      return await import('date-fns/esm/locale/nl-BE')
    case 'nn':
      return await import('date-fns/esm/locale/nn')
    case 'pl':
      return await import('date-fns/esm/locale/pl')
    case 'pt':
      return await import('date-fns/esm/locale/pt')
    case 'pt-BR':
      return await import('date-fns/esm/locale/pt-BR')
    case 'ro':
      return await import('date-fns/esm/locale/ro')
    case 'ru':
      return await import('date-fns/esm/locale/ru')
    case 'sk':
      return await import('date-fns/esm/locale/sk')
    case 'sl':
      return await import('date-fns/esm/locale/sl')
    case 'sq':
      return await import('date-fns/esm/locale/sq')
    case 'sr':
      return await import('date-fns/esm/locale/sr')
    case 'sr-Latn':
      return await import('date-fns/esm/locale/sr-Latn')
    case 'sv':
      return await import('date-fns/esm/locale/sv')
    case 'ta':
      return await import('date-fns/esm/locale/ta')
    case 'te':
      return await import('date-fns/esm/locale/te')
    case 'th':
      return await import('date-fns/esm/locale/th')
    case 'tr':
      return await import('date-fns/esm/locale/tr')
    case 'ug':
      return await import('date-fns/esm/locale/ug')
    case 'uk':
      return await import('date-fns/esm/locale/uk')
    case 'uz':
      return await import('date-fns/esm/locale/uz')
    case 'vi':
      return await import('date-fns/esm/locale/vi')
    case 'zh-CN':
      return await import('date-fns/esm/locale/zh-CN')
    case 'zh-TW':
      return await import('date-fns/esm/locale/zh-TW')
    default:
      return Promise.resolve()
  }
}
