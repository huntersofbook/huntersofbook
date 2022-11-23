import { defineHuntersofbookPlugin } from '../../../types'
import { defineGlobalProperty } from '../../../utils/global-properties'
import { createColorConfigPlugin } from './create-color-config-plugin'

/** Creates color css variables and reactively updates on ColorConfig changes. */
export const ColorConfigPlugin = defineHuntersofbookPlugin(() => ({
  install(app) {
    defineGlobalProperty(app, '$hobColorConfig', createColorConfigPlugin(app))
  },
}))

declare module 'vue' {
  export interface ComponentCustomProperties {
    $hobColorConfig: ReturnType<typeof createColorConfigPlugin>
  }
}
