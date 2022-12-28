import type fs from 'fs'
import { readFileSync } from 'fs'
import type { UpdatePayload, ViteDevServer } from 'vite'

import { globby } from 'globby'
import { basename } from 'pathe'
import Debug from 'debug'
import { slash, toArray } from '@antfu/utils'
import type { FileInfo, Options, ResolvedOptions } from '../type'
import { matchGlobs } from './utils'
import { writeFiles } from './write'
import { resolveOptions } from './options'

const debug = {
  files: Debug('unplugin-css-files:context:files'),
  search: Debug('unplugin-css-files:context:search'),
  hmr: Debug('unplugin-css-files:context:hmr'),
  decleration: Debug('unplugin-css-files:decleration'),
  env: Debug('unplugin-css-files:env'),
}

async function searchCSSFile(ctx: Context) {
  const files = await globby(['./src/component/**/*.css'], { absolute: true })
  const dd = files.map((file) => {
    return readFileSync(file, 'utf-8')
  })
  ctx.addFiles(dd)
}

export class Context {
  options: ResolvedOptions

  private _componentPaths = new Set<string>()
  private _componentNameMap: Record<string, FileInfo> = {}
  private _server: ViteDevServer | undefined

  constructor(
    private rawOptions: Options,
  ) {
    this.options = resolveOptions(rawOptions, this.root)
    console.log('this.options', this.options)
  }

  root = process.cwd()

  setupViteServer(server: ViteDevServer) {
    if (this._server === server)
      return

    this._server = server
    this.setupWatcher(server.watcher)
  }

  setupWatcher(watcher: fs.FSWatcher) {
    const { globs } = this.options

    watcher
      .on('unlink', (path) => {
        if (!matchGlobs(path, globs))
          return

        path = slash(path)
        this.removeFiles(path)
        this.onUpdate(path)
      })
    watcher
      .on('add', (path) => {
        if (!matchGlobs(path, globs))
          return

        path = slash(path)
        this.addFiles(path)
        this.onUpdate(path)
      })
  }

  onUpdate(path: string) {
    console.log('onUpdate', path)
    this.generateDeclaration()

    if (!this._server)
      return

    const payload: UpdatePayload = {
      type: 'update',
      updates: [],
    }
    const timestamp = +new Date()

    if (payload.updates.length)
      this._server.ws.send(payload)
  }

  removeFiles(paths: string | string[]) {
    debug.files('remove', paths)

    const size = this._componentPaths.size
    toArray(paths).forEach(p => this._componentPaths.delete(p))
    if (this._componentPaths.size !== size) {
      this.updateCSSNameMap()
      return true
    }
    return false
  }

  addFiles(components: string | string[]) {
    debug.files('adding files', components)
    const paths = Array.isArray(components) ? components : [components]
    const size = this._componentPaths.size
    for (const path of paths)
      this._componentPaths.add(path)
    if (this._componentPaths.size !== size) {
      console.log('this._componentPaths', this._componentPaths)
      this.updateCSSNameMap()

      console.log('this._componentNameMap', this._componentNameMap)
      return true
    }
    return false
  }

  private updateCSSNameMap() {
    this._componentNameMap = {}

    // css minify
    const cssMinify = (css: string) => {
      return css
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/[\r\n]/g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([:;{}])\s*/g, '$1')
        .replace(/;}/g, '}')
    }
    // const dd = cssMinify(path)

    Array
      .from(this._componentPaths)
      .forEach((path) => {
        const name = basename(path, '.css')
        if (this._componentNameMap[name]) {
          console.warn(`[unplugin-vue-components] component "${name}"(${path}) has naming conflicts with other components, ignored.`)
          return
        }

        this._componentNameMap[name] = {
          name,
          from: path,
        }
      })
  }

  async searchGlob() {
    await searchCSSFile(this)
  }

  async findComponent(name: string, type: 'component' | 'directive', excludePaths: string[] = []): Promise<FileInfo | undefined> {
    // resolve from fs
    const info = this._componentNameMap[name]
    if (info && !excludePaths.includes(info.from) && !excludePaths.includes(info.from.slice(1)))
      return info
    console.log('info', info)
    return undefined
  }

  setRoot(root: string) {
    if (this.root === root)
      return
    debug.env('root', root)
    this.root = root
    // this.options = resolveOptions(this.rawOptions, this.root)
  }

  _generateDeclaration(removeUnused = !this._server) {
    if (!this.options.dts)
      return

    debug.decleration('generating')
    return writeFiles(this, this.options.dts, removeUnused)
  }

  generateDeclaration
}
