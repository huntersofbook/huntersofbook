import { App } from 'vue'

import { defineHuntersofbookPlugin } from '../../../types'
import { defineGlobalProperty } from '../../../utils/global-properties'
import {
  HUNTERSOFBOOK_GLOBAL_CONFIG,
  createGlobalConfig
} from '../global-config'
import { GlobalConfig } from '../types'

export const GlobalConfigPlugin = defineHuntersofbookPlugin(
  (config: GlobalConfig | undefined) => ({
    install(app: App) {
      const globalConfig = createGlobalConfig()

      if (config) {
        globalConfig.mergeGlobalConfig(config)
      }

      app.provide(HUNTERSOFBOOK_GLOBAL_CONFIG, globalConfig)

      defineGlobalProperty(app, '$hobConfig', globalConfig)
    }
  })
)

declare module 'vue' {
  export interface ComponentCustomProperties {
    $hobConfig: ReturnType<typeof createGlobalConfig>
  }
}
