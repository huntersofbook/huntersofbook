import { Ref, onMounted, onUnmounted, ref } from 'vue'
import { formatDistanceStrict } from 'date-fns'
import { localizedFormatDistanceStrict } from './localized-format-distance-strict'
type I18n = Parameters<typeof formatDistanceStrict>
export function useTimeFromNowStrict(date: Date | number, autoUpdate = 60000, i18n: string, options?: I18n[2], hook?: false): Ref<string> {
  const interval = ref(0)

  const formatOptions = {
    addSuffix: true,
    ...options,
  } as I18n[2]

  const formattedDate = ref(localizedFormatDistanceStrict(i18n, date, new Date(), formatOptions))

  if (hook) {
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
  }
  return formattedDate
}
