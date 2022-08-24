import formatDistanceStrict from 'date-fns/formatDistanceStrict'
import { getDateFNSLocale } from './get-date-fns-locale'

export type LocalizedFormatDistanceStrict = (i18n?: string | undefined, ...a: Parameters<typeof formatDistanceStrict>) => string

export const localizedFormatDistanceStrict: LocalizedFormatDistanceStrict = (i18n, date, baseDate, options): string => {
  return formatDistanceStrict(date, baseDate, {
    ...options,
    locale: getDateFNSLocale(i18n),
  })
}
