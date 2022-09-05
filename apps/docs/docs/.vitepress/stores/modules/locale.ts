import { defineStore } from 'pinia'
import { LOCALE_KEY } from '../../enums/cacheEnum'
import type { LocaleType } from '../../locales/config'
import { createStorage } from '../../utils/Storage'
import { store } from '../index'

interface LocaleState {
  locale: LocaleType
}

export const useLocaleStore = defineStore({
  id: 'locale',
  state: (): LocaleState => ({
    locale: typeof window !== 'undefined' ? createStorage().get(LOCALE_KEY, 'tr') : 'tr',
  }),
  getters: {
    getLocale(): LocaleType {
      return this.locale ?? 'tr'
    },
  },
  actions: {
    setLocale(locale: LocaleType) {
      this.locale = locale
      if (typeof window !== 'undefined')
        createStorage().set(LOCALE_KEY, locale)
    },
  },
})

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
