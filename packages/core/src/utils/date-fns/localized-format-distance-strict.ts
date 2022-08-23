import formatDistanceStrict from 'date-fns/formatDistanceStrict'
import { getDateFNSLocale } from './get-date-fns-locale'

export type LocalizedFormatDistanceStrict = (...a: Parameters<typeof formatDistanceStrict>) => string

export const localizedFormatDistanceStrict: LocalizedFormatDistanceStrict = (date, baseDate, options): string => {
  return formatDistanceStrict(date, baseDate, {
    ...options,
    locale: getDateFNSLocale(),
  })
}
