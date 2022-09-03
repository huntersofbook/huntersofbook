/**
 * Create composer interface factory
 *
 * @internal
 */

import { Ref, computed, isRef, ref, watch } from 'vue'
import { I18n } from 'vue-i18n'
import { loadDateFNSLocale } from '../utils'
import { VueIhuntersofbook } from './vue-huntersofbook'
import { IhuntersofbookPlugins } from '.'

async function loadDateFNSLocaleFactory(i18n?: I18n, locale?: string) {
  if (i18n !== undefined) {
    const locale = isRef(i18n.global.locale)
      ? (i18n.global.locale as Ref<string>).value
      : i18n.global.locale
    return await loadDateFNSLocale(locale)
  }
  else if (locale) {
    return await loadDateFNSLocale(locale)
  }
  return await loadDateFNSLocale('en')
}

export function createComposer(plugins: IhuntersofbookPlugins): VueIhuntersofbook {
  const _messages = ref()
  loadDateFNSLocaleFactory(plugins.i18n).then((messages) => {
    _messages.value = messages
  })
  const language = computed(
    () => {
      return _messages.value as any
    },
  )

  watch(plugins.i18n.global.locale as any, (value: string) => {
    _messages.value = loadDateFNSLocaleFactory(undefined, value)
  })

  const composer = {
    dateLocale: language,
    id: 0,
  } as VueIhuntersofbook
  return composer
}
