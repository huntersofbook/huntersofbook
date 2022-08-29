import { format } from 'date-fns'
import { getDateFNSLocale } from './get-date-fns-locale'

export type LocalizedFormat = (i18n?: string | undefined, ...a: Parameters<typeof format>) => string

export const localizedFormat: LocalizedFormat = (i18n, date, format: any, options): string => {
  return format(date, format, {
    ...options,
    locale: getDateFNSLocale(i18n),
  })
}
