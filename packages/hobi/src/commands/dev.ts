import { existsSync, readFileSync, statSync } from 'fs'
import { createHash } from 'node:crypto'

import chokidar from 'chokidar'
import { blue, red } from 'colorette'
import consola from 'consola'
import { normalize, resolve } from 'pathe'
import { debounce } from 'perfect-debounce'

import { loadHuntersofbookConfig } from '../loader/config'
import { CompileTSServiceWorker } from '../plugins/TStoJS.plugin'
import { HuntersofbookConfig } from '../types'
import { questions } from '../utils/questions'
import * as time from '../utils/time'
import { resolveChokidarOptions } from '../utils/watch'
import { defineNuxtCommand } from './index'

export default defineNuxtCommand({
  meta: {
    name: 'dev',
    usage: 'hobi dev',
    description: 'Run Huntersofbook in development mode',
  },
  async invoke(args) {
    const rootDir = resolve(args._[0] || '.')
    const cwd = resolve(args.cwd || '.')
    const _config = await loadHuntersofbookConfig({ cwd })

    const blockWatch = resolveChokidarOptions(_config.blockedWatch.options)

    const watcher = chokidar.watch([rootDir], { ...blockWatch })

    const debounced = debounce(async (config: HuntersofbookConfig) => {
      if (config.tsTOjs && config.tsTOjs.length !== 0)
        await CompileTSServiceWorker(config.tsTOjs)
    })
    debounced(_config)

    let modifiedTime: number
    let hexUrl: string

    const load = async (event: 'addDir' | 'unlinkDir' | 'add' | 'unlink' | 'change', _file: string, config: HuntersofbookConfig, settingFile: string) => {
      if (config.tsTOjs && config.tsTOjs.length !== 0) {
        config.tsTOjs.forEach(async (file) => {
          const fileDir = resolve(file.inputFile)
          const hasFiles = existsSync(fileDir) ? readFileSync(fileDir).length > 0 : false
          if (!hasFiles)
            consola.error(red('Dont input files create'))

          if ((_file.includes(file.inputFile) && hasFiles) || (settingFile && hasFiles))
            await debounced(config)
        })
      }
    }

    watcher.on('all', async (event, _file) => {
      const start = time.current()
      const stats = statSync(_file)
      const file = normalize(_file)
      const config = await loadHuntersofbookConfig({ cwd })

      const isDirChange = ['addDir', 'unlinkDir'].includes(event)
      const isFileChange = ['add', 'unlink'].includes(event)
      const settingFile = file.match(/(huntersofbook\.config\.(js|ts|mjs|cjs))$/)

      if (settingFile)
        await questions()

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
      if (settingFile || !isDirChange || !isFileChange)
        await load(event, _file, config, settingFile)

      const elapsed = time.current() - start
      consola.info(blue(`🚄 ${elapsed.toFixed(3)}s`))
    })

    return 'wait' as const
  },
})
