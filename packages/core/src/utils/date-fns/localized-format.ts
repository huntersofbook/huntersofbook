import formatOriginal from 'date-fns/esm/format'
import { getDateFNSLocale } from './get-date-fns-locale'

export type LocalizedFormat = (...a: Parameters<typeof formatOriginal>) => string

export const localizedFormat: LocalizedFormat = (date, format, options): string => {
  return formatOriginal(date, format, {
    ...options,
    locale: getDateFNSLocale(),
  })
}
