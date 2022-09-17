import { formatDistance } from 'date-fns'
import { Ref, onMounted, onUnmounted, ref } from 'vue'

import { useHuntersofbook } from '../../plugins'
import { localizedFormatDistance } from './localized-format-distance'
type IFormatDistance = Parameters<typeof formatDistance>
export function useTimeFromNow(date: Date | number, autoUpdate = 60000, options?: IFormatDistance[2], hook?: false): Ref<string> {
  const interval = ref(0)
  const { global } = useHuntersofbook()

  const formatOptions = {
    addSuffix: true,
    ...options,
    locale: global.dateLocale.value,
  } as IFormatDistance[2]

  const formattedDate = ref(localizedFormatDistance(date, new Date(), formatOptions))

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
