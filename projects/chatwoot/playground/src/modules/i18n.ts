import { createI18n } from 'vue-i18n'

import messages from '@intlify/vite-plugin-vue-i18n/messages'
import type { UserModule } from '~/types'

// setup i18n instance with global
export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    locale: 'en',
    messages,
    globalInjection: true,
    legacy: false,
    sync: true,
  })
  app.use(i18n)
}
