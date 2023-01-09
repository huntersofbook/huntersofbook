import { createUnplugin } from 'unplugin'
import chokidar from 'chokidar'
import type { ResolvedConfig, ViteDevServer } from 'vite'
import type { Options } from '../type'
import { Context } from './context'

export default createUnplugin<Options>((options = {}) => {
  const ctx: Context = new Context(options)

  return {
    name: 'unplugin-i18n-watch',
    enforce: 'post',
    vite: {
      configResolved(config: ResolvedConfig) {
        ctx.setRoot(config.root)
        // ctx.sourcemap = true
        if (ctx.options.dir)
          ctx.searchGlob()

        if (config.build.watch && config.command === 'build')
          ctx.setupWatcher(chokidar.watch(ctx.options.globs))
      },
      configureServer(server: ViteDevServer) {
        ctx.setupViteServer(server)
      },
    },
  }
})
