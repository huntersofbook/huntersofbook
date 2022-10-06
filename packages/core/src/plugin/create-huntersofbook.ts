import { ColorConfigPlugin } from '../service/color-config/plugin'
import { GlobalConfigPlugin } from '../service/global-config/plugin'
import { GlobalConfig } from '../service/global-config/types'
import { defineHuntersofbookPlugin } from '../types'
import { usePlugin } from '../utils/use-plugin'

/**
 * Globally register all huntersofbook components and plugins
 * @notice using this method will bundle all huntersofbook components.
 * Use `createHuntersofbookEssential` if you want tree shaking to work.
 */
export const createHuntersofbook = defineHuntersofbookPlugin(
  (options: { config?: GlobalConfig } = {}) => ({
    install(app) {
      const { config } = options

      usePlugin(app, GlobalConfigPlugin(config))
      usePlugin(app, ColorConfigPlugin)
    }
  })
)
