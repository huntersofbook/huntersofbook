/**
 * Multi-language related operations
 */
import { computed } from 'vue'

import { useLocaleStoreWithOut } from '../stores/modules/locale'
import { i18n } from './'
import type { LocaleType } from './config'
import { loadLocalePool, setHtmlPageLang } from './helper'

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithOut()

  if (i18n.mode === 'legacy') i18n.global.locale = locale
  else (i18n.global.locale as any).value = locale
  localeStore.setLocale(locale)
  setHtmlPageLang(locale)
}

export function useLocale() {
  const localeStore = useLocaleStoreWithOut()
  const getLocale = computed(() => localeStore.getLocale)

  // Switching the language will change the locale of useI18n
  // And submit to configuration modification
  async function changeLocale(locale: LocaleType) {
    // const globalI18n = i18n.global;
    // const currentLocale = unref(globalI18n.locale);
    // console.log(currentLocale, "currentLocale", locale, "locale");
    // if (currentLocale === locale)
    //   return locale

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale)
      return locale
    }

    loadLocalePool.push(locale)

    setI18nLanguage(locale)
    return locale
  }

  return {
    getLocale,
    changeLocale
  }
}
