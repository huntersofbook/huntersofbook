import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'

import { basename, dirname, resolve } from 'pathe'
import consola from 'consola'

import { merge } from '@huntersofbook/schob'
import { isArray, template } from 'lodash'
import { globbySync } from 'globby'
import type { Context } from './context'

export async function writeStyleCSSFile(ctx: Context, filepath: string) {
  const base = basename(filepath)
  consola.info('base', base)
  // /en/test.json
  const dir = filepath.split(ctx.options.dir)[1]
  consola.info('dir', dir)
  const dirName = dirname(dir)
  consola.info('dirName', dirName)
  consola.info('aa', dirName.length)
  const languages = ctx.options.outputNames

  if (dirName.length > 1) {
    const language = dirName.split('/')[1]
    consola.info('language', language)
    const lang = languages.find(lang => lang === language)
    consola.info('lang', lang)
    const templateFile = resolve(filepath)
    consola.info('templateFile', templateFile)
    const exportFile = resolve(ctx.root, ctx.options.export, language, base)
    consola.info('exportFile', exportFile)
    objectUpdate(templateFile, exportFile, resolve(ctx.root, ctx.options.export, dirName.split('/')[1]))

    const filePattern = `${exportFile.split('/').slice(0, -1).join('/')}/*.json`
    consola.info('filePattern', filePattern)
    const files = globbySync(filePattern)
    consola.info('files', files)
    // all files to one file merge
    const obj = {}
    files.forEach((file) => {
      const data = JSON.parse(readFileSync(file, 'utf8'))
      Object.assign(obj, data)
    })

    ctx.options.outputNames.forEach((lang) => {
      // isExist directory
      if (!existsSync(resolve(ctx.root, ctx.options.export, lang)))
        mkdirSync(resolve(ctx.root, ctx.options.export, lang), { recursive: true })

      const exportFile = resolve(ctx.root, ctx.options.export, lang, base)
      consola.info('exportFile', exportFile)
      writeFileSync(exportFile, JSON.stringify(obj, null, 2))
      consola.success(`JSON file ${basename(exportFile)} is updated`)
    })
  }
  else {
    const templateFile = resolve(filepath)
    consola.info('templateFile', templateFile)
    const exportFile = resolve(ctx.root, ctx.options.export, base)
    consola.info('exportFile', exportFile)
    objectUpdate(templateFile, exportFile, resolve(ctx.root, ctx.options.export))
  }
}

const objectUpdate = (templateFile: string, exportFile: any, file?: string) => {
  try {
    const template = JSON.parse(readFileSync(templateFile, 'utf8'))

    const writePath = resolve(exportFile)
    consola.info('writePath', writePath)
    if (template === writePath)
      return

    if (existsSync(writePath)) {
      const obj = JSON.parse(readFileSync(writePath, 'utf8'))
      const _merge = merge({ schema: template, newData: obj })
      try {
        /**
         * It sorts the keys of an object, and if the value of a key is an object, it recursively sorts
         * that object's keys as well
         * thank you https://stackoverflow.com/a/72998623/17764989
         */
        const sortObject = (obj: any) => {
          const sorted = Object.keys(obj)
            .sort()
            .reduce((accumulator: any, key: any) => {
              if (typeof obj[key] === 'object') {
                // recurse nested properties that are also objects
                if (obj[key] == null) {
                  accumulator[key] = null
                }
                else if (isArray(obj[key])) {
                  accumulator[key] = obj[key].map((item: any) => {
                    if (typeof item === 'object')
                      return sortObject(item)

                    else
                      return item
                  })
                }
                else {
                  accumulator[key] = sortObject(obj[key])
                }
              }
              else {
                accumulator[key] = obj[key]
              }
              return accumulator
            }, {})
          return sorted
        }

        const sortedObject = sortObject(_merge)
        writeFileSync(writePath, JSON.stringify(sortedObject, null, 2))

        consola.success(`JSON file ${basename(writePath)} is updated`)
      }
      catch (error) {
        consola.error(error)
      }
    }
    else {
      if (file && !existsSync(file)) {
        // create directory
        mkdirSync(file, { recursive: true })
      }
      writeFileSync(exportFile, readFileSync(templateFile))
      consola.success(`JSON file ${basename(writePath)} is created`)
    }
  }
  catch (error) {
    consola.error('JSON file is not valid please your schema', templateFile)
  }
}
