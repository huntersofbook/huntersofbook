import camelCase from 'lodash/camelCase.js'
import kebabCase from 'lodash/kebabCase.js'

export const cssVariableName = (colorName: string) =>
  `--hob-${kebabCase(colorName)}`

export const normalizeColorName = (colorName: string) => camelCase(colorName)
