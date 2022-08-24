import formatDistanceOriginal from 'date-fns/esm/formatDistance'
import { getDateFNSLocale } from './get-date-fns-locale'

export type LocalizedFormatDistance = (i18n?: string | undefined, ...a: Parameters<typeof formatDistanceOriginal>) => string

export const localizedFormatDistance: LocalizedFormatDistance = (i18n, date, baseDate, options): string => {
  return formatDistanceOriginal(date, baseDate, {
    ...options,
    locale: getDateFNSLocale(i18n),
  })
}

