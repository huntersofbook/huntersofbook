import { existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, rmSync, rmdirSync, writeFileSync } from 'node:fs'

import { basename, dirname, resolve } from 'pathe'
import consola from 'consola'
import Debug from 'debug'

import { merge } from '@huntersofbook/schob'
import { isArray } from 'lodash'
import { globbySync } from 'globby'
import type { Context } from './context'
import { matchGlobs } from './utils'

const debug = Debug('unplugin-i18n-watch:write')

const objectUpdate = (templateFile: string, exportFile: any) => {
  try {
    const template = JSON.parse(readFileSync(templateFile, 'utf8'))

    const writePath = resolve(exportFile)
    consola.info('writeFile', writePath)
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
      if (!existsSync(dirname(exportFile)))
        mkdirSync(resolve(dirname(exportFile)), { recursive: true })

      writeFileSync(exportFile, readFileSync(templateFile))
      consola.success(`JSON file ${basename(writePath)} is created`)
    }
  }
  catch (error) {
    consola.error('JSON file is not valid please your schema', templateFile)
  }
}

const autoClean = (ctx: Context, existDirectory: Boolean) => {
  if (existDirectory) {
    const templateFiles = globbySync(`${ctx.options.dir}/**/*`, { cwd: ctx.root }).map((file) => {
      return resolve(ctx.root, file).split(ctx.options.dir)[1]
    })

    const selectFiles: string[] = []
    ctx.options.languages.forEach((lang) => {
      templateFiles.forEach((file) => {
        selectFiles.push(`${ctx.options.export}/${lang}${file}`)
      })
    })

    const exportFiles = globbySync(`${ctx.options.export}/**/*`, { cwd: ctx.root })

    const diff = exportFiles.filter((x) => {
      return !matchGlobs(x, selectFiles)
    })

    ctx.options.languages.forEach((lang) => {
      diff.forEach((_file) => {
        try {
          const data = lstatSync(_file).isDirectory()
          if (data)
            rmSync(_file, { recursive: true })
        }
        catch (error) {

        }
        const file = _file.split(ctx.options.export)[1]
        if (file.split('/')[1] === lang)
          rmSync(_file)
      })
    })

    const emtyDirs = globbySync(`${ctx.options.export}/**/*`, { onlyDirectories: true, cwd: ctx.root })

    function emptyDir(dirPath: string) {
      const dirContents = readdirSync(dirPath) // List dir content
      if (dirContents.length === 0)
        rmdirSync(dirPath) // Delete dir
    }

    emtyDirs.forEach((dir) => {
      emptyDir(dir)
    })
  }
}

export async function writeI18nLanguageFile(ctx: Context, filepath: string) {
  const base = basename(filepath)
  debug('base', base)

  const dir = filepath.split(ctx.options.dir)[1]
  debug('dir', dir)

  const dirName = dirname(dir)
  debug('dirName', dirName)

  const languages = ctx.options.languages
  debug('languages', languages)

  // check is directory
  const directory = globbySync(`${ctx.options.dir}/**/*`, { onlyDirectories: true })
  const existDirectory = directory.length > 0

  if (existDirectory && dirName.length < 2) {
    consola.error('both file and language file cannot be used at the same time. Please use only one of them "en/test.json" or "en.json"')
  }
  else {
    /*
    * If the file is in a directory
    */
    if (dirName.length > 1) {
      debug('directory')
      languages.forEach((lang) => {
        const templateFile = resolve(filepath)

        const exportFile = resolve(ctx.root, ctx.options.export, `${lang}/${dirName}/${base}`)
        debug('Dir ExportFile', exportFile)
        // isExist directory
        if (!existsSync(dirname(exportFile)))
          mkdirSync(resolve(dirname(exportFile)), { recursive: true })

        objectUpdate(templateFile, exportFile)

        const filePattern = `${exportFile.split('/').slice(0, -1).join('/')}/*.json`
        const files = globbySync(filePattern)

        /*
        * Merge all files in a directory
        */
        try {
          const obj = {}
          files.forEach((file) => {
            const data = JSON.parse(readFileSync(file, 'utf8'))
            Object.assign(obj, data)
          })

          ctx.options.languages.forEach((lang) => {
            // isExist directory
            if (!existsSync(resolve(ctx.root, ctx.options.export, lang)))
              mkdirSync(resolve(ctx.root, ctx.options.export, lang), { recursive: true })

            const exportFile = resolve(ctx.root, ctx.options.export, `${lang}.json`)
            debug('exportFile', exportFile)
            writeFileSync(exportFile, JSON.stringify(obj, null, 2))
          })
        }
        catch (error) {
          consola.error('JSON file is not valid please your schema', templateFile)
        }
      })
    }
    else {
      const directoryExport = globbySync(`${ctx.options.export}/**/*`, { onlyDirectories: true })
      if (directoryExport.length > 0) {
        // remove directory
        directoryExport.forEach((dir) => {
          rmdirSync(dir, { recursive: true })
        })
      }
      const templateFile = resolve(filepath)
      languages.forEach((lang) => {
        const exportFile = resolve(ctx.root, ctx.options.export, `${lang}.json`)
        debug('exportFile', exportFile)
        objectUpdate(templateFile, exportFile)
      })
    }
  }

  autoClean(ctx, existDirectory)
}
