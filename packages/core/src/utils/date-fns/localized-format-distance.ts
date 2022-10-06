import formatDistance from 'date-fns/esm/formatDistance/index.js'

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
