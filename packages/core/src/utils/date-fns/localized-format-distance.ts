import { formatDistance } from 'date-fns'
import { getDateFNSLocale } from './get-date-fns-locale'

export type LocalizedFormatDistance = (i18n?: string | undefined, ...a: Parameters<typeof formatDistance>) => string

export const localizedFormatDistance: LocalizedFormatDistance = (i18n, date, baseDate, options): string => {
  return formatDistance(date, baseDate, {
    ...options,
    locale: getDateFNSLocale(i18n),
  })
}

