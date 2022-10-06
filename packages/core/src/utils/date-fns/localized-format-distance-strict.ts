import formatDistanceStrict from 'date-fns/esm/formatDistanceStrict/index.js'
export type LocalizedFormatDistanceStrict = (
  ...a: Parameters<typeof formatDistanceStrict>
) => string

export const localizedFormatDistanceStrict: LocalizedFormatDistanceStrict = (
  date,
  baseDate,
  options,
): string => {
  return formatDistanceStrict(date, baseDate, {
    ...options,
  })
}
