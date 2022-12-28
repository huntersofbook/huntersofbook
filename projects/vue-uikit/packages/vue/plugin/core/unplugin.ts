import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import chokidar from 'chokidar'
import type { ResolvedConfig, ViteDevServer } from 'vite'
import type { Options, PublicPluginAPI } from '../type'
import { Context } from './context'
import { shouldTransform, stringifyComponentImport } from './utils'

export default createUnplugin<Options>((options = {}) => {
  const filter = createFilter(
    options.include || [/\.vue$/, /\.vue\?vue/, /\.vue\?v=/],
    options.exclude || [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
  )
  const ctx: Context = new Context(options)

  const api: PublicPluginAPI = {
    async findComponent(name, filename) {
      return await ctx.findComponent(name, 'component', filename ? [filename] : [])
    },
    stringifyImport(info) {
      return stringifyComponentImport(info, ctx)
    },
  }

  return {
    name: 'unplugin-vue-huntersofbook-uikit',
    enforce: 'post',
    api,
    transformInclude(id) {
      return filter(id)
    },
    vite: {
      configResolved(config: ResolvedConfig) {
        console.log('configResolved', config)
        ctx.setRoot(config.root)
        // ctx.sourcemap = true

        if (ctx.options.cssFile)
          ctx.searchGlob()
          // if (!existsSync(ctx.options.dts))
          //   ctx.generateDeclaration()

        if (config.build.watch && config.command === 'build')
          ctx.setupWatcher(chokidar.watch(ctx.options.globs))
      },
      configureServer(server: ViteDevServer) {
        ctx.setupViteServer(server)
      },
    },
  }
})
