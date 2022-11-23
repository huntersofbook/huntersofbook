import { statSync } from 'fs'
import { createHash } from 'node:crypto'

import chokidar from 'chokidar'
import { red } from 'colorette'
import consola from 'consola'
import { execaCommandSync } from 'execa'
import { normalize, resolve } from 'pathe'
import { debounce } from 'perfect-debounce'
import prompts from 'prompts'
import { PackageJson } from 'type-fest'

import { loadHuntersofbookConfig } from '../loader/config'
import { HuntersofbookPluginCommand, PluginCommand, plugins } from '../plugins'
import { HuntersofbookConfig } from '../types'
import { IWatch } from '../types/watch'
import { getJson } from '../utils/hasCheckPackage'
import * as time from '../utils/time'
import { resolveChokidarOptions } from '../utils/watch'
import { defineHuntersofbookCommand } from './index'
const returnFilePath = (files: any[], cwd: string) => {
  const _files: string[] = []
  files.forEach((file) => {
    if (!file.includes('**'))
      _files.push(resolve(cwd, file))
    else
      _files.push(file)
  })
  return _files
}

export default defineHuntersofbookCommand({
  meta: {
    name: 'dev',
    usage: 'huntersofbook dev',
    description: 'Run Huntersofbook in development mode',
  },
  async invoke(args) {
    const rootDir = resolve(args._[0] || '.')
    const cwd = resolve(args.cwd || '.')

    const _package = getJson(cwd)
    const packageInstallCheck = async (file: PackageJson) => {
      const __config = await loadHuntersofbookConfig({ cwd })
      const _plugins: string[] = []

      for await (const [key] of Object.entries(plugins)) {
        for await (const [_key] of Object.entries(__config)) {
          if (key === _key) {
            const cmd = await plugins[key as PluginCommand]() as HuntersofbookPluginCommand

            cmd.packagesName?.forEach((name) => {
              if (file && file.dependencies) {
                const depen = file.dependencies[name]

                const dev = (file.devDependencies ? file.devDependencies[name] : undefined)

                if (!depen && !dev)
                  _plugins.push(name)
              }
            })
          }
        }
      }

      if (_plugins.length > 0) {
        const { install } = await prompts([{
          name: 'install',
          type: 'confirm',
          message: `These libraries need to be installed. Download ? ${red(_plugins.join(', '))}`,
        }])

        if (install) {
          const data = execaCommandSync(`npx ni ${_plugins.join(' ')}`, { cwd }).stdout.toString()
          consola.info(data)
        }
        if (!install)
          process.exit(1)
      }
    }

    if (_package)
      await packageInstallCheck(_package)

    let blockWatch: chokidar.WatchOptions = {}
    const ignored: string[] = []

    const load = async (watch?: IWatch) => {
      const __config = await loadHuntersofbookConfig({ cwd })
      const data = debounce(async () => {
        if (__config.blockedWatch?.files)
          ignored.push(...returnFilePath(__config.blockedWatch?.files, cwd) || [])

        for await (const [key] of Object.entries(plugins)) {
          for await (const [_key] of Object.entries(__config)) {
            if (key === _key) {
              const cmd = await plugins[key as PluginCommand]() as HuntersofbookPluginCommand

              if (cmd.watch && cmd.watch.ignored)
                ignored.push(...returnFilePath(cmd.watch?.ignored, cwd))

              const data = await cmd.invoke(args, __config, watch)
              if (data.ignored)
                ignored.push(...returnFilePath(data.ignored, cwd))

              switch (data.status) {
                case 'wait':
                  break
                case 'error':
                  process.exit(1)
                  break
                case 'success':
                  process.exit(1)
                  break
              }
            }
          }
        }

        blockWatch = resolveChokidarOptions({
          ...__config.blockedWatch?.options,
          ignored,
        })
      })

      await data()
    }

    const middleware = async () => {
      const __config = await loadHuntersofbookConfig({ cwd })
      for await (const [key] of Object.entries(plugins)) {
        for await (const [_key] of Object.entries(__config)) {
          if (key === _key) {
            const cmd = await plugins[key as PluginCommand]() as HuntersofbookPluginCommand
            const pluginMiddleware = async (key: string, config: HuntersofbookConfig) => {
              if (cmd.middleware) {
                const data = await cmd.middleware(key, config)
                if (data && data.ignored)
                  ignored.push(...returnFilePath(data.ignored, cwd))
              }
            }
            pluginMiddleware(key, __config)
          }
        }
      }
    }

    await load()
    console.log(rootDir)
    const watcher = chokidar.watch([rootDir], {
      ...blockWatch,
      cwd,
      depth: 3,
    })

    let modifiedTime: number
    let hexUrl: string
    watcher.on('all', async (event, _file) => {
      if (blockWatch.ignored && (typeof blockWatch.ignored === 'object' && (blockWatch.ignored as string[]).length > 0))
        watcher.unwatch(blockWatch.ignored as string[])

      await middleware()
      const stats = statSync(_file)
      const file = normalize(_file)

      const isDirChange = ['addDir', 'unlinkDir'].includes(event)
      const isFileChange = ['add', 'unlink'].includes(event)
      const settingFile = file.match(/(huntersofbook\.config\.(js|ts|mjs|cjs))$/)

      if (ignored.find(item => item === _file) && !settingFile)
        return

      const hextPath = createHash('sha256').update(_file.toString()).digest('hex')
      if (hexUrl === hextPath || settingFile) {
        hexUrl = hextPath
        // consola.info(red('File is already compiled'), modifiedTime === +stats.mtime)
        // consola.info(red('File is already compiled'), +stats.mtime - modifiedTime)
        if (modifiedTime === +stats.mtime || (+stats.mtime - modifiedTime < 1500))
          return
        else
          modifiedTime = +stats.mtime
      }
      else { hexUrl = hextPath }

      if ((blockWatch.ignored as []).length > 0) {
        if ((blockWatch.ignored as []).find(item => item === file))
          return
      }

      await time.voidTimer(async (startTime) => {
        if (settingFile || !isDirChange || !isFileChange)
          await load({ event, file: _file, startTime })
      }, true)
    })

    return 'wait' as const
  },
})
