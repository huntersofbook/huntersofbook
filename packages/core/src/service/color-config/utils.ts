import { camelCase, kebabCase } from 'lodash'

export const cssVariableName = (colorName: string) =>
  `--va-${kebabCase(colorName)}`

export const normalizeColorName = (colorName: string) => camelCase(colorName)
