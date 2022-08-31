import { format } from 'date-fns'
import { getDateFNSLocale } from './get-date-fns-locale'

export type LocalizedFormat = (i18n?: string | undefined, ...a: Parameters<typeof format>) => string

export const localizedFormat: LocalizedFormat = (i18n, date, formatDate, options): string => {
  return format(date, formatDate, {
    ...options,
    locale: getDateFNSLocale(i18n),
  })
}
