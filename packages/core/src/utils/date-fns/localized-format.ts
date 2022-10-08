import { format as FormatData } from 'date-fns'

export type LocalizedFormat = (...a: Parameters<typeof FormatData>) => string

export const localizedFormat: LocalizedFormat = (
  date,
  format,
  options,
): string => {
  return FormatData(date, format, options)
}
