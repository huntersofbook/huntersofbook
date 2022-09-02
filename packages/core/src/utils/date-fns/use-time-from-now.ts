import { ComputedRef, Ref, onMounted, onUnmounted, ref, watch } from 'vue'
import { formatDistance } from 'date-fns'
import { localizedFormatDistance } from './localized-format-distance'
type I18n = Parameters<typeof formatDistance>
export function useTimeFromNow(date: Date | number, autoUpdate = 60000, options?: I18n[2], hook?: false): Ref<string> {
  const interval = ref(0)

  const formatOptions = {
    addSuffix: true,
    ...options,
  } as I18n[2]

  const formattedDate = ref(localizedFormatDistance(date, new Date(), formatOptions))

  // watch<string>(i18n, (data) => {
  //   formattedDate.value = localizedFormatDistance(data, date, new Date(), formatOptions)
  // })

  if (hook) {
    onMounted(() => {
      if (autoUpdate !== 0) {
        interval.value = window.setInterval(() => {
          formattedDate.value = localizedFormatDistance(date, new Date(), formatOptions)
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
