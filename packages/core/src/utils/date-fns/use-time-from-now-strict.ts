import { formatDistanceStrict } from 'date-fns'
import { Ref, onMounted, onUnmounted, ref } from 'vue'

import { useHuntersofbook } from '../../plugins'
import { localizedFormatDistanceStrict } from './localized-format-distance-strict'
type IFormatDistanceStrict = Parameters<typeof formatDistanceStrict>

export function useTimeFromNowStrict(
  date: Date | number,
  autoUpdate = 60000,
  options?: IFormatDistanceStrict[2],
  hook?: false
): Ref<string> {
  const { global } = useHuntersofbook()

  const interval = ref(0)

  const formatOptions = {
    addSuffix: true,
    ...options,
    locale: global.dateLocale.value
  } as IFormatDistanceStrict[2]

  const formattedDate = ref(
    localizedFormatDistanceStrict(date, new Date(), formatOptions)
  )

  if (hook) {
    onMounted(() => {
      if (autoUpdate !== 0) {
        interval.value = window.setInterval(() => {
          formattedDate.value = localizedFormatDistanceStrict(
            date,
            new Date(),
            formatOptions
          )
        }, autoUpdate)
      }
    })

    onUnmounted(() => {
      if (autoUpdate !== 0) clearInterval(interval.value)
    })
  }
  return formattedDate
}
