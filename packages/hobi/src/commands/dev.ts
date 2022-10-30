import { statSync } from 'fs'
import { createHash } from 'node:crypto'

import chokidar from 'chokidar'
import { blue, green, yellow } from 'colorette'
import consola from 'consola'
import { basename, normalize, resolve } from 'pathe'
import { debounce } from 'perfect-debounce'

import { loadHuntersofbookConfig } from '../loader/config'
import { plugins } from '../plugins'
import { HuntersofbookConfig } from '../types'
import { IWatch } from '../types/watch'
import { getJson } from '../utils/hasCheckPackage'
import { QuestionPlugin } from '../utils/questions'
import * as time from '../utils/time'
import { resolveChokidarOptions } from '../utils/watch'
import { defineNuxtCommand } from './index'

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

export default defineNuxtCommand({
  meta: {
    name: 'dev',
    usage: 'hobi dev',
    description: 'Run Huntersofbook in development mode',
  },
  async invoke(args) {
    const rootDir = resolve(args._[0] || '.')
    const cwd = resolve(args.cwd || '.')

    let blockWatch: chokidar.WatchOptions = {}

    const load = async (watch?: IWatch, config?: HuntersofbookConfig) => {
      const ignored: string[] = []
      const data = debounce(async () => {
        const __config = config || await loadHuntersofbookConfig({ cwd })
        ignored.push(...returnFilePath(__config.blockedWatch?.files, cwd) || [])

        const cmd = await plugins.tsTOjs()
        if (cmd.watch && cmd.watch.ignored)
          ignored.push(...returnFilePath(cmd.watch.ignored, cwd))

        const data = await cmd.invoke(args, __config, watch)

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

        if (data.ignored)
          ignored.push(...returnFilePath(data.ignored, cwd))

        blockWatch = resolveChokidarOptions({
          ...__config.blockedWatch.options,
          ignored,
        })
      })

      await data()
    }

    await load()

    const watcher = chokidar.watch([rootDir], {
      ...blockWatch,
    })

    let modifiedTime: number
    let hexUrl: string

    const _plugins: QuestionPlugin[] = []
    const packageCheck = getJson(cwd)

    if (packageCheck && packageCheck.dependencies) {
      // eslint-disable-next-line dot-notation
      const depen = packageCheck.dependencies['hobia']
      // eslint-disable-next-line dot-notation
      const dev = (packageCheck.devDependencies ? packageCheck.devDependencies['hobia'] : undefined)

      if (!depen && !dev) {
        _plugins.push(...[
          {
            display: 'ttttttttt',
            name: 'compile-plugin',
            variants: [
              {
                name: 'ts-to-js',
                customCommand: 'bbbbbbbbbbbb',
                display: 'bbb',
              },
            ],
          }])
      }
    }

    watcher.on('all', async (event, _file) => {
      const startTime = time.current()
      const stats = statSync(_file)
      const file = normalize(_file)
      const data = (yellow(`[${basename(file)}]`), blue(event))
      consola.start(data)
      const config = await loadHuntersofbookConfig({ cwd })

      const isDirChange = ['addDir', 'unlinkDir'].includes(event)
      const isFileChange = ['add', 'unlink'].includes(event)
      const settingFile = file.match(/(huntersofbook\.config\.(js|ts|mjs|cjs))$/)

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
      if (settingFile || !isDirChange || !isFileChange) load({ event, file: _file }, config)

      const elapsed = time.current() - startTime
      consola.info(data + green(` ${elapsed.toFixed(3)}s`))
    })

    return 'wait' as const
  },
})
