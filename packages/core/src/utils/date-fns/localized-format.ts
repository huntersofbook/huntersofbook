import formatOriginal from 'date-fns/esm/format'
import { getDateFNSLocale } from './get-date-fns-locale'

export type LocalizedFormat = (i18n?: string | undefined, ...a: Parameters<typeof formatOriginal>) => string

export const localizedFormat: LocalizedFormat = (i18n, date, format, options): string => {
  return formatOriginal(date, format, {
    ...options,
    locale: getDateFNSLocale(i18n),
  })
}
