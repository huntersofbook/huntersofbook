import { formatDistance } from 'date-fns'

export type LocalizedFormatDistance = (
  ...a: Parameters<typeof formatDistance>
) => string

export const localizedFormatDistance: LocalizedFormatDistance = (
  date,
  baseDate,
  options,
): string => {
  return formatDistance(date, baseDate, {
    ...options,
  })
}
