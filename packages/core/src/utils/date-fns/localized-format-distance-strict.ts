import { formatDistanceStrict } from 'date-fns'
export type LocalizedFormatDistanceStrict = (
  ...a: Parameters<typeof formatDistanceStrict>
) => string

export const localizedFormatDistanceStrict: LocalizedFormatDistanceStrict = (
  date,
  baseDate,
  options,
): string => {
  return formatDistanceStrict(date, baseDate, options)
}
