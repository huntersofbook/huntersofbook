import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'

import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { red } from 'colorette'
import consola from 'consola'
import { defu } from 'defu'
import delay from 'delay'
import { Listr } from 'listr2'
import type { TSConfig } from 'pkg-types'
import type { InputOptions, OutputOptions } from 'rollup'
import { rollup } from 'rollup'

import { loadHuntersofbookConfig } from '../loader/config'
import { definePluginCommand } from './index'

export interface CompileFileConfig {
  /**
   * @param {string} inputFile
   * The input file to compile
   * @example 'src/sw.ts'
  */
  inputFile: string

  /**
   * @param {string} outputFile
   * The output file to compile
   * @example 'public/sw.js'
  */
  outputFile: string

  tsOptions?: TSConfig
}

let serviceFiles: CompileFileConfig[]

const writeSWFile = async () => {
  serviceFiles.forEach(async (config) => {
    const tsSettings = defu(config.tsOptions, {
      compilerOptions: {
        lib: ['ESNext', 'WebWorker'],
        noEmit: false,
        strict: false,
        outDir: 'public',
        target: 'ESNext',
        isolatedModules: false,
      },
    } as TSConfig)
    const inputOptions: InputOptions = {
      plugins: [typescript({ ...tsSettings }), nodeResolve()],
      input: config.inputFile,
    }
    const outputOptions: OutputOptions = {
      file: config.outputFile,
      format: 'es',
    }
    try {
      const bundle = await rollup(inputOptions)
      await bundle.write(outputOptions)
      await bundle.close()
    }
    catch (error) {
      consola.error(error)
    }
  })
}

interface Ctx {

}

const tasks = new Listr<Ctx>(
  [
    {
      title: 'TS to JS Files',
      task: (ctx, task): Listr =>
        task.newListr([
          {
            title: 'Write JS file',
            task: async (): Promise<void> => {
              await writeSWFile()
              await delay(1000)
            },
            skip: (): string | boolean => {
              if (serviceFiles.length === 0)
                return 'No files to compile'
              return false
            },
          },
        ]),
    },
  ],
  { concurrent: false },
)

export default definePluginCommand({
  meta: {
    name: 'dev',
    usage: 'hobi dev',
    description: 'Run Huntersofbook in development mode',
  },
  watch: {
    ignored: ['**/node_modules/**'],
  },
  async invoke(args, config, watch) {
    const rootDir = resolve(args._[0] || '.')
    const cwd = resolve(args.cwd || '.')

    if (config.tsTOjs && config.tsTOjs.length !== 0) {
      serviceFiles = config.tsTOjs
      config.tsTOjs.forEach(async (file) => {
        const fileDir = resolve(file.inputFile)
        const hasFiles = existsSync(fileDir) ? readFileSync(fileDir).length > 0 : false
        if (!hasFiles)
          consola.error(red('Dont input files create'))

        if ((watch && watch.file.includes(file.inputFile) && hasFiles) || (config && hasFiles))
          tasks.run()
      })
    }

    const ignored = config.tsTOjs && config.tsTOjs.map(file => file.outputFile)

    return {
      status: 'wait',
      ignored,
    }
  },
})
