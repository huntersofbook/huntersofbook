import { ColorConfigPlugin } from '../service/color-config/plugin'
import { setCurrentApp } from '../service/current-app'
import { GlobalConfigPlugin } from '../service/global-config/plugin'
import type { GlobalConfig } from '../service/global-config/types'
import type {
  HuntersofbookPlugin,
  HuntersofbookPluginFabric,
} from '../types'
import {
  defineHuntersofbookPlugin,
} from '../types'
import { usePlugin } from '../utils/use-plugin'

const ESSENTIAL_PLUGIN_NAMES = ['GlobalConfigPlugin', 'ColorConfigPlugin']

/**
 * Register only essential Huntersofbook Plugins.
 *
 * This plugin will register globally only provided component and plugins in options.
 * @notice this plugin will not bundle all Huntersofbook conponents and plugins
 *
 * @example
 * ```ts
 * createHuntersofbookEssential({
 *   plugins: [VaToastPlugin],  // or [VaToastPlugin({ makeLifeEasier: true })],
 *   components: { VaButton, VaInput },
 *   config: { VaButton: { color: '#f0f' } }
 * })
 * ```
 */
export const createHuntersofbookEssential = defineHuntersofbookPlugin(
  (
    options: {
      config?: GlobalConfig
      plugins?: Record<string, HuntersofbookPlugin | HuntersofbookPluginFabric>
    } = {},
  ) => ({
    install(app) {
      const { config, plugins } = options
      setCurrentApp(app)

      /** Register essential plugins before any other */
      usePlugin(app, plugins?.GlobalConfigPlugin || GlobalConfigPlugin, config)
      usePlugin(app, plugins?.ColorConfigPlugin || ColorConfigPlugin)

      if (plugins) {
        Object.entries(plugins).forEach(([name, plugin]) => {
          if (ESSENTIAL_PLUGIN_NAMES.includes(name))
            return

          usePlugin(app, plugin)
        })
      }

      //   if (components) {
      //     Object.entries(components).forEach(([name, component]) => {
      //       app.component(name, component)
      //     })
      //   }

      setCurrentApp(null)
    },
  }),
)
