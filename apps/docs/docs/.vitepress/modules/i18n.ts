import messages from '@intlify/vite-plugin-vue-i18n/messages'
import { createHuntersofbook } from 'huntersofbook'
import { createI18n } from 'vue-i18n'
import type { AppModule } from '../../../types/index'

export const install: AppModule = ({ app }) => {
  const i18n = createI18n({
    locale: 'tr',
    fallbackLocale: 'tr',
    messages,
    availableLocales: ['en', 'tr'],
  })

  app.use(i18n)
  app.use(createHuntersofbook(i18n))
}
