import messages from '@intlify/vite-plugin-vue-i18n/messages'
import { createI18n } from 'vue-i18n'

export const install: AppModule = ({ app }) => {
  const i18n = createI18n({
    locale: 'tr',
    fallbackLocale: 'en',
    messages,
    availableLocales: ['en', 'tr'],
  })

  app.use(i18n)
}
