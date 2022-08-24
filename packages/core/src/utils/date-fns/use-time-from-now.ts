import { Ref, onMounted, onUnmounted, ref } from 'vue'
import formatDistance from 'date-fns/esm/formatDistance'
import { localizedFormatDistance } from './localized-format-distance'
import { localizedFormatDistanceStrict } from './localized-format-distance-strict'

export function useTimeFromNow(date: Date | number, autoUpdate = 60000, i18n: string): Ref<string> {
  const interval = ref(0)
  type I18n = Parameters<typeof formatDistance>
  const formatOptions = {
    addSuffix: true,
    includeSeconds: true,
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
