import { ComputedRef, InjectionKey, Ref, getCurrentInstance, inject, onMounted, onUnmounted, ref, watch } from 'vue'
import { formatDistanceStrict } from 'date-fns'
import { useI18n } from 'vue-i18n'
import { localizedFormatDistanceStrict } from './localized-format-distance-strict'
type I18n = Parameters<typeof formatDistanceStrict>
declare module 'vue' {
  // eslint-disable-next-line
  interface App<HostElement = any> {
    __VUE_HUNTERSOFBOOK_SYMBOL__?: InjectionKey<I18n> | string
  }
}

export function useTimeFromNowStrict(date: Date | number, autoUpdate = 60000, i18n: ComputedRef<string> | string, options?: I18n[2], hook?: false): Ref<string> {
  const { locale } = useI18n()
  const instance = getCurrentInstance()
  console.log(instance?.appContext.app.__VUE_HUNTERSOFBOOK_SYMBOL__, ' instance?.isCE')
  watch(locale, (newD) => {
    console.log(newD)
  })
  const key = Symbol('huntersofbook')

  console.log(inject(instance?.appContext.app.__VUE_HUNTERSOFBOOK_SYMBOL__ || 'huntersofbook'))

  const interval = ref(0)

  const formatOptions = {
    addSuffix: true,
    ...options,
  } as I18n[2]

  const formattedDate = ref(localizedFormatDistanceStrict(date, new Date(), formatOptions))

  if (typeof i18n === 'string') {
    // watch<string>(i18n, (data) => {
    //   formattedDate.value = localizedFormatDistanceStrict(data, date, new Date(), formatOptions)
    // })
  }
  if (hook) {
    onMounted(() => {
      if (autoUpdate !== 0) {
        interval.value = window.setInterval(() => {
          formattedDate.value = localizedFormatDistanceStrict(date, new Date(), formatOptions)
        }, autoUpdate)
      }
    })

    onUnmounted(() => {
      if (autoUpdate !== 0)
        clearInterval(interval.value)
    })
  }
  return formattedDate
}
