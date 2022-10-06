import { App, watch } from 'vue'

import { getGlobalProperty } from '../../../utils/global-properties'
import { isServer } from '../../../utils/ssr-utils'
import { GlobalConfig } from '../../global-config/global-config'
import { cssVariableName } from '../utils'

export const setCSSVariable = (
  name: string,
  value: string,
  root: HTMLElement,
) => {
  root.style.setProperty(cssVariableName(name), value)
}
export const createColorConfigPlugin = (app: App) => {
  const globalConfig = getGlobalProperty(app, '$hobConfig').globalConfig
  /** Renders CSS variables string. Use this in SSR mode */
  const renderCSSVariables = (
    colors: GlobalConfig['colors'] = globalConfig.value.colors,
  ) => {
    if (!colors)
      return

    const colorNames = Object.keys(colors)
    return colorNames
      .map(key => `${cssVariableName(key)}: ${colors[key]}`)
      .join(';')
  }

  const updateColors = (newValue: GlobalConfig['colors']) => {
    if (!newValue)
      return

    if (isServer())
      return

    const root = document.documentElement

    const colorNames = Object.keys(newValue)
    colorNames.forEach((key) => {
      setCSSVariable(key, newValue[key], root)
    })

    // colorNames.forEach((key) => {
    //   setCSSVariable(
    //     `on-${key}`,
    //     getTextColor(newValue[key], newValue.textDark, newValue.textLight),
    //     root
    //   )
    // })
  }

  updateColors(globalConfig.value.colors)

  watch(
    () => globalConfig.value.colors,
    (newValue) => {
      updateColors(newValue)
    },
    { immediate: true, deep: true },
  )

  return {
    renderCSSVariables,
    updateColors,
  }
}
