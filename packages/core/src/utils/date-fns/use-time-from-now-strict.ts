import type { formatDistanceStrict } from 'date-fns'
import { Ref, onMounted, onUnmounted, ref } from 'vue'

import { useGlobalConfigSafe } from '../../service/global-config/global-config'
import { isServer } from '../ssr-utils'
import { localizedFormatDistanceStrict } from './localized-format-distance-strict'
type IFormatDistanceStrict = Parameters<typeof formatDistanceStrict>

export function useTimeFromNowStrict(
  date: Date | number,
  autoUpdate = 60000,
  hook = false,
  mounted = false,
  options?: IFormatDistanceStrict[2],
): Ref<string> {
  const gc = useGlobalConfigSafe()

  if (!gc) {
    throw new Error(
      'useColors must be used in setup function or huntersofbook GlobalConfigPlugin is not registered!',
    )
  }
  const { globalConfig } = gc

  const interval = ref(0)

  const formatOptions = {
    addSuffix: true,
    ...options,
    locale: globalConfig.value.dateLocale,
  } as IFormatDistanceStrict[2]

  const formattedDate = ref(
    localizedFormatDistanceStrict(date, new Date(), formatOptions),
  )

  if (hook && !isServer()) {
    if (autoUpdate !== 0) {
      interval.value = window.setInterval(() => {
        formattedDate.value = localizedFormatDistanceStrict(
          date,
          new Date(),
          formatOptions,
        )
      }, autoUpdate)
    }
  }

  if (mounted) {
    onMounted(() => {
      if (autoUpdate !== 0) {
        interval.value = window.setInterval(() => {
          formattedDate.value = localizedFormatDistanceStrict(
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
