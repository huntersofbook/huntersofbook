import messages from '@intlify/vite-plugin-vue-i18n/messages'
import { createHuntersofbook, loadDateFNSLocale } from 'huntersofbook'
import { createI18n } from 'vue-i18n'
import { useLocaleStoreWithOut } from '../stores/modules/locale'
import { localeMap } from './config'
import type { App } from 'vue'

async function createI18nOptions() {
  const localeStore = useLocaleStoreWithOut()
  const locale = localeStore.getLocale

  return {
    locale,
    // legacy: false,
    fallbackLocale: localeMap.tr, // set fallback locale
    messages,
    globalInjection: true,
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  }
}

const options = await createI18nOptions()
const defaultLocal = await loadDateFNSLocale(options.locale)

export const i18n = createI18n(options)
const huntersofbook = createHuntersofbook({ i18n, dateFnsLanguage: defaultLocal })

// setup i18n instance with global
export async function setupI18n(app: App) {
  app.use(i18n)
  app.use(huntersofbook)
}
