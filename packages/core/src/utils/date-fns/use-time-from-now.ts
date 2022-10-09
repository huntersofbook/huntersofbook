import type { formatDistance } from 'date-fns'
import { Ref, onMounted, onUnmounted, ref } from 'vue'

import { useGlobalConfigSafe } from '../../service/global-config/global-config'
import { localizedFormatDistance } from './localized-format-distance'
type IFormatDistance = Parameters<typeof formatDistance>
export function useTimeFromNow(
  date: Date | number,
  autoUpdate = 60000,
  hook = false,
  options?: IFormatDistance[2],
): Ref<string> {
  const interval = ref(0)

  const gc = useGlobalConfigSafe()

  if (!gc) {
    throw new Error(
      'useColors must be used in setup function or huntersofbook GlobalConfigPlugin is not registered!',
    )
  }
  const { globalConfig } = gc

  const formatOptions = {
    addSuffix: true,
    ...options,
    locale: globalConfig.value.dateFns.locale,
  } as IFormatDistance[2]
  const formattedDate = ref(
    localizedFormatDistance(date, new Date(), formatOptions),
  )

  if (hook) {
    onMounted(() => {
      if (autoUpdate !== 0) {
        interval.value = window.setInterval(() => {
          formattedDate.value = localizedFormatDistance(
            date,
            new Date(),
            formatOptions,
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
