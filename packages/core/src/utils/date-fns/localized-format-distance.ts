import formatDistanceOriginal from 'date-fns/formatDistance'
import { getDateFNSLocale } from './get-date-fns-locale'

export type LocalizedFormatDistance = (...a: Parameters<typeof formatDistanceOriginal>) => string

export const localizedFormatDistance: LocalizedFormatDistance = (date, baseDate, options): string => {
  return formatDistanceOriginal(date, baseDate, {
    ...options,
    locale: getDateFNSLocale(),
  })
}

