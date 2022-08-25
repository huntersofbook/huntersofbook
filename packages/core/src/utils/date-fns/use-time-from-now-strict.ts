import { Ref, onMounted, onUnmounted, ref } from 'vue'
import formatDistance from 'date-fns/esm/formatDistance/index.js'
import { localizedFormatDistanceStrict } from './localized-format-distance-strict'
type I18n = Parameters<typeof formatDistance>
export function useTimeFromNowStrict(date: Date | number, autoUpdate = 60000, i18n: string, options?: I18n[2]): Ref<string> {
  const interval = ref(0)

  const formatOptions = {
    addSuffix: true,
    ...options,
  } as I18n[2]

  const formattedDate = ref(localizedFormatDistanceStrict(i18n, date, new Date(), formatOptions))

  onMounted(() => {
    if (autoUpdate !== 0) {
      interval.value = window.setInterval(() => {
        formattedDate.value = localizedFormatDistanceStrict(i18n, date, new Date(), formatOptions)
      }, autoUpdate)
    }
  })

  onUnmounted(() => {
    if (autoUpdate !== 0)
      clearInterval(interval.value)
  })

  return formattedDate
}
