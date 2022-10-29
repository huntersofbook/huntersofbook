import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import consola from 'consola'
import { defu } from 'defu'
import delay from 'delay'
import { Listr } from 'listr2'
import type { TSConfig } from 'pkg-types'
import type { InputOptions, OutputOptions } from 'rollup'
import { rollup } from 'rollup'

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
}

let serviceFiles: CompileFileConfig[]

const writeSWFile = async (tsOptions?: TSConfig) => {
  const tsSettings = defu(tsOptions, {
    compilerOptions: {
      lib: ['ESNext', 'WebWorker'],
      noEmit: false,
      strict: false,
      outDir: 'public',
      target: 'ESNext',
      isolatedModules: false,
    },
  } as TSConfig)
  serviceFiles.forEach(async (config) => {
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
  TSOptions: TSConfig
  /* some variables for internal use */
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
              await writeSWFile(ctx.TSOptions)
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

export async function CompileTSServiceWorker(
  config: CompileFileConfig[],
  TSOptions: TSConfig = {},
) {
  serviceFiles = config
  tasks.run({ TSOptions })
}

