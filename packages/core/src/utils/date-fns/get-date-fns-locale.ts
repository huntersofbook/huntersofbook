import { useI18n } from 'vue-i18n'
import { Locale } from 'date-fns'

const locales: { lang: string; locale: Locale }[] = []

export function getDateFNSLocale(i18n?: string | undefined): Locale | undefined {
  if (i18n !== undefined) {
    return locales.find(({ lang }) => i18n === lang)?.locale
  }
  else {
    const { locale } = useI18n()
    const currentLang = locale.value
    return locales.find(({ lang }) => currentLang === lang)?.locale
  }
}

export async function loadDateFNSLocale(lang: string) {
  const localesToTry = [lang, lang.split('-')[0], 'en-US']

  let locale

  for (const l of localesToTry) {
    try {
      const mod = await importDateLocale(l)
      locale = mod.default
      locales.push({ lang, locale })
      break
    }
    catch {
      continue
    }
  }

  return locale
}

export function importDateLocale(locale: string): Promise<any> {
  switch (locale) {
    case 'af':
      return import('date-fns/esm/locale/af/index.js')
    case 'ar-DZ':
      return import('date-fns/esm/locale/ar-DZ/index.js')
    case 'ar-MA':
      return import('date-fns/esm/locale/ar-MA/index.js')
    case 'ar-SA':
      return import('date-fns/esm/locale/ar-SA/index.js')
    case 'az':
      return import('date-fns/esm/locale/az/index.js')
    case 'be':
      return import('date-fns/esm/locale/be/index.js')
    case 'bg':
      return import('date-fns/esm/locale/bg/index.js')
    case 'bn':
      return import('date-fns/esm/locale/bn/index.js')
    case 'ca':
      return import('date-fns/esm/locale/ca/index.js')
    case 'cs':
      return import('date-fns/esm/locale/cs/index.js')
    case 'cy':
      return import('date-fns/esm/locale/cy/index.js')
    case 'da':
      return import('date-fns/esm/locale/da/index.js')
    case 'de':
      return import('date-fns/esm/locale/de/index.js')
    case 'de-AT':
      return import('date-fns/esm/locale/de-AT/index.js')
    case 'el':
      return import('date-fns/esm/locale/el/index.js')
    case 'en-AU':
      return import('date-fns/esm/locale/en-AU/index.js')
    case 'en-CA':
      return import('date-fns/esm/locale/en-CA/index.js')
    case 'en-GB':
      return import('date-fns/esm/locale/en-GB/index.js')
    case 'en-IN':
      return import('date-fns/esm/locale/en-IN/index.js')
    case 'en-NZ':
      return import('date-fns/esm/locale/en-NZ/index.js')
    case 'en-US':
      return import('date-fns/esm/locale/en-US/index.js')
    case 'en-ZA':
      return import('date-fns/esm/locale/en-ZA/index.js')
    case 'eo':
      return import('date-fns/esm/locale/eo/index.js')
    case 'es':
      return import('date-fns/esm/locale/es/index.js')
    case 'et':
      return import('date-fns/esm/locale/et/index.js')
    case 'eu':
      return import('date-fns/esm/locale/eu/index.js')
    case 'fa-IR':
      return import('date-fns/esm/locale/fa-IR/index.js')
    case 'fi':
      return import('date-fns/esm/locale/fi/index.js')
    case 'fr':
      return import('date-fns/esm/locale/fr/index.js')
    case 'fr-CA':
      return import('date-fns/esm/locale/fr-CA/index.js')
    case 'fr-CH':
      return import('date-fns/esm/locale/fr-CH/index.js')
    case 'gd':
      return import('date-fns/esm/locale/gd/index.js')
    case 'gl':
      return import('date-fns/esm/locale/gl/index.js')
    case 'gu':
      return import('date-fns/esm/locale/gu/index.js')
    case 'he':
      return import('date-fns/esm/locale/he/index.js')
    case 'hi':
      return import('date-fns/esm/locale/hi/index.js')
    case 'hr':
      return import('date-fns/esm/locale/hr/index.js')
    case 'ht':
      return import('date-fns/esm/locale/ht/index.js')
    case 'hu':
      return import('date-fns/esm/locale/hu/index.js')
    case 'hy':
      return import('date-fns/esm/locale/hy/index.js')
    case 'id':
      return import('date-fns/esm/locale/id/index.js')
    case 'is':
      return import('date-fns/esm/locale/is/index.js')
    case 'it':
      return import('date-fns/esm/locale/it/index.js')
    case 'ja':
      return import('date-fns/esm/locale/ja/index.js')
    case 'ka':
      return import('date-fns/esm/locale/ka/index.js')
    case 'kk':
      return import('date-fns/esm/locale/kk/index.js')
    case 'kn':
      return import('date-fns/esm/locale/kn/index.js')
    case 'ko':
      return import('date-fns/esm/locale/ko/index.js')
    case 'lb':
      return import('date-fns/esm/locale/lb/index.js')
    case 'lt':
      return import('date-fns/esm/locale/lt/index.js')
    case 'lv':
      return import('date-fns/esm/locale/lv/index.js')
    case 'mk':
      return import('date-fns/esm/locale/mk/index.js')
    case 'mn':
      return import('date-fns/esm/locale/mn/index.js')
    case 'ms':
      return import('date-fns/esm/locale/ms/index.js')
    case 'mt':
      return import('date-fns/esm/locale/mt/index.js')
    case 'nb':
      return import('date-fns/esm/locale/nb/index.js')
    case 'nl':
      return import('date-fns/esm/locale/nl/index.js')
    case 'nl-BE':
      return import('date-fns/esm/locale/nl-BE/index.js')
    case 'nn':
      return import('date-fns/esm/locale/nn/index.js')
    case 'pl':
      return import('date-fns/esm/locale/pl/index.js')
    case 'pt':
      return import('date-fns/esm/locale/pt/index.js')
    case 'pt-BR':
      return import('date-fns/esm/locale/pt-BR/index.js')
    case 'ro':
      return import('date-fns/esm/locale/ro/index.js')
    case 'ru':
      return import('date-fns/esm/locale/ru/index.js')
    case 'sk':
      return import('date-fns/esm/locale/sk/index.js')
    case 'sl':
      return import('date-fns/esm/locale/sl/index.js')
    case 'sq':
      return import('date-fns/esm/locale/sq/index.js')
    case 'sr':
      return import('date-fns/esm/locale/sr/index.js')
    case 'sr-Latn':
      return import('date-fns/esm/locale/sr-Latn/index.js')
    case 'sv':
      return import('date-fns/esm/locale/sv/index.js')
    case 'ta':
      return import('date-fns/esm/locale/ta/index.js')
    case 'te':
      return import('date-fns/esm/locale/te/index.js')
    case 'th':
      return import('date-fns/esm/locale/th/index.js')
    case 'tr':
      return import('date-fns/esm/locale/tr/index.js')
    case 'ug':
      return import('date-fns/esm/locale/ug/index.js')
    case 'uk':
      return import('date-fns/esm/locale/uk/index.js')
    case 'uz':
      return import('date-fns/esm/locale/uz/index.js')
    case 'vi':
      return import('date-fns/esm/locale/vi/index.js')
    case 'zh-CN':
      return import('date-fns/esm/locale/zh-CN/index.js')
    case 'zh-TW':
      return import('date-fns/esm/locale/zh-TW/index.js')
    default:
      return Promise.resolve()
  }
}
