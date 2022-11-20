import camelCase from 'lodash-es/camelCase'
import kebabCase from 'lodash-es/kebabCase'

export const cssVariableName = (colorName: string) =>
  `--hob-${kebabCase(colorName)}`

export const normalizeColorName = (colorName: string) => camelCase(colorName)
