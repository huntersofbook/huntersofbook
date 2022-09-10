import { createHuntersofbook, loadDateFNSLocale } from 'huntersofbook'
import { createI18n } from 'vue-i18n'
import type { UserModule } from '~/types'

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>('../../locales/*.y(a)?ml', { eager: true }))
    .map(([key, value]) => {
      const yaml = key.endsWith('.yaml')
      return [key.slice(14, yaml ? -5 : -4), value.default]
    }),
)
const defaultLocal = await loadDateFNSLocale('tr')

// setup i18n instance with global
export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    locale: 'tr',
    messages,
  })
  const huntersofbook = createHuntersofbook({ i18n, dateFnsLanguage: defaultLocal })
  app.use(i18n)
  app.use(huntersofbook)
}
