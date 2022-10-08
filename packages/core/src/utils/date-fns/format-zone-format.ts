import { OptionsWithTZ } from 'date-fns-tz'
import formatInTimeZone from 'date-fns-tz/esm/formatInTimeZone'

export function localizedFormatInTimeZone(
  date: Date | string | number,
  timeZone: string,
  formatStr: string,
  options?: OptionsWithTZ,
): string {
  return formatInTimeZone(date, timeZone, formatStr, options)
}
