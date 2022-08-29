import { Ref, onMounted, onUnmounted, ref } from 'vue'
import { formatDistance } from 'date-fns'
import { localizedFormatDistance } from './localized-format-distance'
type I18n = Parameters<typeof formatDistance>
export function useTimeFromNow(date: Date | number, autoUpdate = 60000, i18n: string, options?: I18n[2]): Ref<string> {
  const interval = ref(0)

  const formatOptions = {
    addSuffix: true,
    ...options,
  } as I18n[2]

  const formattedDate = ref(localizedFormatDistance(i18n, date, new Date(), formatOptions))

  onMounted(() => {
    if (autoUpdate !== 0) {
      interval.value = window.setInterval(() => {
        formattedDate.value = localizedFormatDistance(i18n, date, new Date(), formatOptions)
      }, autoUpdate)
    }
  })

  onUnmounted(() => {
    if (autoUpdate !== 0)
      clearInterval(interval.value)
  })

  return formattedDate
}
