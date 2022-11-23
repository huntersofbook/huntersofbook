import type { App } from 'vue'

import type { HuntersofbookPlugin, HuntersofbookPluginFabric } from '../types'

const isPluginFabric = (
  plugin: HuntersofbookPlugin | HuntersofbookPluginFabric,
): plugin is HuntersofbookPluginFabric => typeof plugin === 'function'

/**
 * Allow user to use plugin as function or just pass it.
 *
 * @example
 * ```
 * createHuntersofbookEssential({
 *   plugins: [GlobalConfigPlugin]
 * })
 * ```
 *
 * or
 *
 * ```
 * createHuntersofbookEssential({
 *   plugins: [GlobalConfigPlugin({  })]
 * })
 * ```
 */

export const usePlugin = <O>(
  app: App,
  plugin: HuntersofbookPlugin | HuntersofbookPluginFabric<O[]>,
  ...options: O[]
) => {
  if (isPluginFabric(plugin))
    app.use(plugin(...(options as [])))
  else
    app.use(plugin) // Do not pass options, because it should be passed to fabric
}
