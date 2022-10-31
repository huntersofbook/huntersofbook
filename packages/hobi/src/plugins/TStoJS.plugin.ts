import { existsSync, readFileSync } from 'fs'

import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { red } from 'colorette'
import consola from 'consola'
import { defu } from 'defu'
import { basename, resolve } from 'pathe'
import type { TSConfig } from 'pkg-types'
import type { InputOptions, OutputOptions } from 'rollup'
import { rollup } from 'rollup'
import cleanup from 'rollup-plugin-cleanup'
import { minify } from 'rollup-plugin-esbuild'

import { asyncForEach } from '../utils/asyncForEach'
import { finishTime, voidTimer } from '../utils/time'
import { PluginInvokeResult, definePluginCommand } from './index'
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
  await asyncForEach(serviceFiles, async (config: CompileFileConfig) => {
    const tsSettings = defu(config.tsOptions, {
      compilerOptions: {
        lib: ['ESNext', 'WebWorker'],
        noEmit: false,
        strict: false,
        outDir: 'public',
        target: 'ESNext',
        isolatedModules: false,
        removeComments: true,
      },
    } as TSConfig)
    const inputOptions: InputOptions = {
      plugins: [minify(), nodeResolve({}), typescript({ ...tsSettings }), cleanup({ comments: 'none', sourcemap: true })],
      input: config.inputFile,
    }
    const outputOptions: OutputOptions = {
      file: config.outputFile,
      format: 'es',
      generatedCode: { constBindings: true },
      externalLiveBindings: false,
      freeze: false,
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
    const status: PluginInvokeResult['status'] = 'wait'
    // const rootDir = resolve(args._[0] || '.')
    const cwd = resolve(args.cwd || '.')
    if (config.tsTOjs && config.tsTOjs.length !== 0) {
      serviceFiles = config.tsTOjs

      const data = config.tsTOjs.filter((config: CompileFileConfig) => {
        if (!existsSync(config.inputFile)) {
          consola.error(red(`The file ${config.inputFile} does not exist`))
          process.exit(1)
        }
        if (watch?.file && (resolve(cwd, config.inputFile) === watch.file))
          return config
      })

      await asyncForEach(data.length ? data : config.tsTOjs, async (file: CompileFileConfig) => {
        await voidTimer(async (timer) => {
          consola.start(`${basename(file.outputFile || watch?.file || '')}`)
          const fileDir = resolve(file.inputFile)
          const hasFiles = existsSync(fileDir) ? readFileSync(fileDir).length > 0 : false

          if (!hasFiles)
            consola.error(red('Dont input files create'))

          if ((watch && watch.file.includes(file.inputFile) && hasFiles) || (config && hasFiles)) {
            await writeSWFile().then(() => {
              consola.success(`${basename(file.outputFile || watch?.file || '')} file updated ${finishTime(timer)}`)
            })
          }
        })
      })
    }

    const ignored = config.tsTOjs && config.tsTOjs.map(file => file.outputFile)
    return {
      status,
      ignored,
      message: 'TS to JS Files',
    }
  },
})
