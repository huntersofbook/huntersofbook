import messages from '@intlify/vite-plugin-vue-i18n/messages'
import { createHuntersofbook } from 'huntersofbook'
import { createI18n } from 'vue-i18n'
import type { AppModule } from '../../../types/index'

export function getLanguage() {
  if (typeof window !== 'undefined') {
    const chooseLanguage = localStorage.getItem('chooseLanguage')
    if (chooseLanguage)
      return chooseLanguage
    else localStorage.setItem('chooseLanguage', 'en')

    // if has not choose language
    const language = (navigator.language).toLowerCase()
    const locales = Object.keys(messages)
    for (const locale of locales) {
      if (language.includes(locale))
        return locale.split('-')[0]
    }
  }
  return 'en'
}

export const install: AppModule = ({ app }) => {
  const i18n = createI18n({
    locale: getLanguage(),
    fallbackLocale: 'tr',
    messages,
    availableLocales: ['en', 'tr'],
  })
  app.use(i18n)
  app.use(createHuntersofbook({ i18n }))
}
