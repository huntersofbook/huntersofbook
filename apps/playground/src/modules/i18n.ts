import { createHuntersofbook, loadDateFNSLocale } from 'huntersofbook'
import { createI18n } from 'vue-i18n'

import type { UserModule } from '~/types'

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>('../../locales/*.y(a)?ml', {
      eager: true
    })
  ).map(([key, value]) => {
    const yaml = key.endsWith('.yaml')
    return [key.slice(14, yaml ? -5 : -4), value.default]
  })
)

const getLang = () => {
  if (localStorage.getItem('lang')) {
    return localStorage.getItem('lang')
  } else {
    switch (navigator.language) {
      case 'tr-TR':
        localStorage.setItem('lang', 'tr')
        return 'tr'
      case 'en-US':
        localStorage.setItem('lang', 'en')
        return 'en'
    }
  }
}

async function useI18n() {
  const i18n = createI18n({
    locale: getLang() || 'en',
    messages,
    globalInjection: true,
    legacy: false
  })

  // Load date-fns locale
  const locale = await loadDateFNSLocale(i18n.global.locale.value)
  return { i18n, locale }
}

// setup i18n instance with global
export const install: UserModule = async ({ app }) => {
  const { i18n, locale } = await useI18n()
  const huntersofbook = createHuntersofbook({
    dateFnsLanguage: locale
  })
  app.use(i18n)
  app.use(huntersofbook)
}
