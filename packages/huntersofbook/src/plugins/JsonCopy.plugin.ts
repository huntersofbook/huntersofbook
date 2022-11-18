import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'fs'

import { merge } from '@huntersofbook/schob'
import { red } from 'colorette'
import consola from 'consola'
import { basename, resolve } from 'pathe'

import { asyncForEach } from '../utils/asyncForEach'
import { PluginInvokeResult, definePluginCommand } from './index'

export interface JSONCopyConfig {
  /**
 * @param {string} inputFile
 * The input file to compile
 * @example 'src/language/en.json'
*/
  schema: string

  /**
   * @param {string} inputFile
   * The input file to compile
   * @example ['en', 'tr']
  */
  outputNames: string[]

  /**
   * @param {string} outputFile
   * The output file to compile
   * @example 'public/sw.js'
  */
  outputPath: string

}

let serviceFiles: JSONCopyConfig

const writeFiles = async () => {
  const schemaPath = resolve(`${serviceFiles.schema}.json`)
  const schema = JSON.parse(readFileSync(serviceFiles.schema, 'utf8'))
  await asyncForEach(serviceFiles.outputNames, async (config: JSONCopyConfig['outputNames']) => {
    const writePath = resolve(serviceFiles.outputPath, `${config}.json`)
    if (schemaPath === writePath)
      return

    if (existsSync(writePath)) {
      const obj = JSON.parse(readFileSync(writePath, 'utf8'))
      const _merge = merge({ schema, newData: obj })
      try {
        writeFileSync(writePath, JSON.stringify(_merge, null, 2))
        consola.success(`JSON file ${basename(writePath)} is updated`)
      }
      catch (error) {
        consola.error(red(`Error: ${error}`))
      }
    }
    else {
      copyFileSync(serviceFiles.schema, writePath)
      consola.success(`JSON file ${basename(writePath)} is created`)
    }
  })
}

export default definePluginCommand({
  meta: {
    name: 'jsonCopy',
    usage: 'huntersofbook dev',
    description: 'Copy JSON files but only schema new keys or delete schema keys',
  },
  watch: {
    ignored: ['**/node_modules/**'],
  },
  middleware: async (title, config) => {
    if (title === 'tsTOjs') {
      return {
        ignored: config.tsTOjs && config.tsTOjs.map(file => file.outputFile),
      }
    }
    return {}
  },
  packagesName: ['typescript'],
  async invoke(args, config, watch) {
    const ignored = config.tsTOjs && config.tsTOjs.map(file => file.outputFile)

    const status: PluginInvokeResult['status'] = 'wait'

    if (watch?.file !== config.jsonCopy?.schema)
      return { status, message: 'No need to run', ignored }

    // const rootDir = resolve(args._[0] || '.')
    // const cwd = resolve(args.cwd || '.')

    if (config.jsonCopy && config.jsonCopy.schema)
      serviceFiles = config.jsonCopy

    await writeFiles()

    return {
      status,
      ignored,
      message: 'JSON copy',
    }
  },
})
