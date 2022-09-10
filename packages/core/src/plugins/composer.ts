/**
 * Create composer interface factory
 *
 * @internal
 */

import { computed, ref, watch } from 'vue'

import { loadDateFNSLocale } from '../utils'
import { VueIhuntersofbook } from './vue-huntersofbook'
import { IhuntersofbookPlugins } from '.'

export function loadDateFNSLocaleFactory(locale: string) {
  return new Promise((resolve, reject) => {
    loadDateFNSLocale(locale).then((res) => {
      return resolve(res)
    }).catch(reject)
  })
}

export function createComposer(plugins: IhuntersofbookPlugins): VueIhuntersofbook {
  console.log(plugins, 'plugins')
  const _messages = ref(plugins.dateFnsLanguage)

  const language = computed(
    () => {
      return _messages.value as any
    },
  )

  watch((plugins.i18n.global.locale as any), () => {
    window.location.reload()
  })

  const composer = {
    dateLocale: language,
    id: 0,
  } as VueIhuntersofbook
  return composer
}
