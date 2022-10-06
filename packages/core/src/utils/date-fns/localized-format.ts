import { format } from 'date-fns'

import { useGlobalConfigSafe } from '../../service/global-config/global-config'

export type LocalizedFormat = (...a: Parameters<typeof format>) => string

export const localizedFormat: LocalizedFormat = (
  date,
  formatDate,
  options
): string => {
  const gc = useGlobalConfigSafe()

  if (!gc) {
    throw new Error(
      'useColors must be used in setup function or huntersofbook GlobalConfigPlugin is not registered!'
    )
  }

  const { globalConfig } = gc
  return format(date, formatDate, {
    ...options,
    locale: globalConfig.value.dateLocale
  })
}
