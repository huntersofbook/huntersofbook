import { format } from 'date-fns'

export type LocalizedFormat = (...a: Parameters<typeof format>) => string

export const localizedFormat: LocalizedFormat = (date, formatDate, options): string => {
  return format(date, formatDate, {
    ...options,

  })
}
