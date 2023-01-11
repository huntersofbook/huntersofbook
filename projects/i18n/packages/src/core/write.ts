import { copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, rmSync, rmdirSync, writeFileSync } from 'node:fs'

import { basename, dirname, resolve } from 'pathe'
import consola from 'consola'
import Debug from 'debug'

import { merge } from '@huntersofbook/schob'
import { isArray } from 'lodash'
import { globbySync } from 'globby'
import type { Context } from './context'
import { matchGlobs } from './utils'

const debug = Debug('unplugin-i18n-watch:write')

const objectUpdate = (exportFile: any, templateFile?: string | undefined, templateString?: string) => {
  let template: any = {}
  if (templateFile)
    template = JSON.parse(readFileSync(templateFile, 'utf8'))
  else if (templateString)
    template = JSON.parse(templateString)

  try {
    const _exportFile = resolve(exportFile)
    if (template === _exportFile)
      return
    const obj = readFileSync(_exportFile, 'utf8')

    if (existsSync(_exportFile) && obj.length > 10) {
      const newData = JSON.parse(obj)
      const _merge = merge({ schema: template, newData })

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
        writeFileSync(_exportFile, JSON.stringify(sortedObject, null, 2))
      }
      catch (error) {
        consola.error(error)
      }
    }
    else {
      if (!existsSync(dirname(exportFile)))
        mkdirSync(resolve(dirname(exportFile)), { recursive: true })

      if (templateString) {
        const obj = JSON.parse(templateString)
        const _merge = merge({ schema: template, newData: obj })
        writeFileSync(exportFile, JSON.stringify(_merge, null, 2))
        consola.success(`JSON file ${basename(_exportFile)} is created`)
      }
      else {
        writeFileSync(exportFile, template)
        consola.success(`JSON file ${basename(_exportFile)} is created`)
      }
    }
  }
  catch (error) {
    consola.error('JSON file is not valid please your schema', templateFile)
  }
}

const autoClean = (ctx: Context, existDirectory: Boolean) => {
  if (existDirectory) {
    const templateFiles = globbySync(`${ctx.options.templateDir}/**/*`, { cwd: ctx.root }).map((file) => {
      return resolve(ctx.root, file).split(ctx.options.templateDir)[1]
    })

    const selectFiles: string[] = []
    ctx.options.languages.forEach((lang) => {
      templateFiles.forEach((file) => {
        selectFiles.push(`${ctx.options.exportDir}/${lang}${file}`)
      })
    })

    const exportFiles = globbySync(`${ctx.options.exportDir}/**/*`, { cwd: ctx.root })

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
        const file = _file.split(ctx.options.exportDir)[1]
        if (file.split('/')[1] === lang)
          rmSync(_file)
      })
    })

    const emtyDirs = globbySync(`${ctx.options.exportDir}/**/*`, { onlyDirectories: true, cwd: ctx.root })

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
  const languages = ctx.options.languages
  debug('languages', languages)

  // check is directory
  let tempDirectories: string[] | undefined

  try {
    tempDirectories = globbySync(`${ctx.options.templateDir}/**/*`, { onlyDirectories: true, cwd: ctx.root })
  }
  catch (error) {

  }

  let checkFile: string[] | undefined

  try {
    checkFile = globbySync(`${ctx.options.templateDir}/*`, { onlyFiles: true, cwd: ctx.root, deep: 0 })
  }
  catch (error) {

  }

  const existDirectory = tempDirectories?.length && tempDirectories.length > 0
  const onlyFile = checkFile?.length && checkFile.length > 0

  if (existDirectory && onlyFile) {
    consola.error('both file and language file cannot be used at the same time. Please use only one of them ["xxx/xx.json", "yyy/vvv.json"] or "xxx.json"')
  }
  else {
    // Check export file and director names
    const directoryNames = globbySync(`${ctx.options.exportDir}/*`, { onlyDirectories: true, cwd: ctx.root, deep: 0 })
    const fileNames = globbySync(`${ctx.options.exportDir}/*`, { onlyFiles: true, cwd: ctx.root, deep: 0 })

    languages.forEach((lang) => {
      if (existDirectory) {
        if (!directoryNames.includes(`${ctx.options.exportDir}/${lang}`))
          mkdirSync(`${ctx.options.exportDir}/${lang}`, { recursive: true })
      }
      if (!fileNames.includes(`${ctx.options.exportDir}/${lang}.json`))
        writeFileSync(`${ctx.options.exportDir}/${lang}.json`, '{}')
    })

    if (existDirectory) {
      directoryNames.forEach((res) => {
        if (!languages.includes(basename(res)))
          rmdirSync(res)
      })
    }
    /*
    * If the file is in a directory
    */
    if (existDirectory) {
      debug('directory')
      const tempFiles = globbySync(`${ctx.options.templateDir}/**/*`, { onlyFiles: true, cwd: ctx.root })

      const tempDirs = globbySync(`${ctx.options.templateDir}/**/*`, { onlyDirectories: true, cwd: ctx.root })

      // en
      languages.forEach((lang) => {
        const _exportDirectories = globbySync(`${ctx.options.exportDir}/${lang}/**/*`, { onlyDirectories: true, cwd: ctx.root })

        tempDirs.forEach((res) => {
          const base = res.split(ctx.options.templateDir)[1]
          const changeExportBase = `${ctx.options.exportDir}/${lang}${base}`

          // create templates directories mkdir
          if (!_exportDirectories.includes(changeExportBase))
            mkdirSync(changeExportBase, { recursive: true })
        })

        // en files
        const fileNames = globbySync(`${ctx.options.exportDir}/${lang}/**/*`, { onlyFiles: true, cwd: ctx.root, ignore: languages.map(res => `**/*/${res}.json`) })

        //
        tempFiles.forEach((tt) => {
          const n = tt.split(ctx.options.templateDir)[1]
          const newa = `${ctx.options.exportDir}/${lang}${n}`
          consola.log(newa)
          if (!fileNames.includes(newa))
            writeFileSync(newa, readFileSync(tt, { encoding: 'utf-8' }))
          else
            objectUpdate(newa, tt)
        })
      })

      return

      languages.forEach((lang) => {
        const templateFile = resolve(filepath)
        // en/dirname/filename.json
        const exportFile = resolve(ctx.root, ctx.options.exportDir, `${lang}${templateFile.split(ctx.options.templateDir)[1]}`)
        debug('Dir ExportFile', exportFile)
        // isExist directory
        if (!existsSync(dirname(exportFile)))
          mkdirSync(resolve(dirname(exportFile)), { recursive: true })

        const checkLanguges = globbySync(`${ctx.options.exportDir}/*`, { cwd: ctx.root })

        if (checkLanguges.length > 0) {
          objectUpdate(exportFile, templateFile)
        }
        else {
          languages.forEach((lang) => {
            copyFileSync(templateFile, resolve(ctx.root, ctx.options.exportDir, `${lang}.json`))
          })
        }

        const filePattern = '/**/*.json'
        const files = globbySync(`${ctx.options.templateDir}${filePattern}`, { onlyFiles: true })

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
            if (!existsSync(resolve(ctx.root, ctx.options.exportDir, lang)))
              mkdirSync(resolve(ctx.root, ctx.options.exportDir, lang), { recursive: true })

            const exportFile = resolve(ctx.root, ctx.options.exportDir, `${lang}.json`)
            debug('exportFile', exportFile)
            objectUpdate(exportFile, undefined, JSON.stringify(obj, null, 2))
          })
          consola.success(`${`${`${basename(ctx.options.exportDir)}/${lang}`}.json`} updated`)
        }
        catch (error) {
          consola.error('JSON file is not valid please your schema dir', templateFile)
        }
      })
    }
    else {
      // Check old files and remove
      const directoryExport = globbySync(`${ctx.options.exportDir}/**/*`, { onlyDirectories: true })
      if (directoryExport.length > 0) {
        // remove directory
        directoryExport.forEach((dir) => {
          rmdirSync(dir, { recursive: true })
        })
      }

      const templateFile = resolve(filepath)

      const checkLanguges = globbySync(`${ctx.options.exportDir}/*`, { onlyFiles: true })

      if (checkLanguges.length > 0) {
        languages.forEach((lang) => {
          const exportFile = resolve(ctx.root, ctx.options.exportDir, `${lang}.json`)
          debug('exportFile', exportFile)
          objectUpdate(exportFile, templateFile)
        })
      }
      else {
        languages.forEach((lang) => {
          copyFileSync(templateFile, resolve(ctx.root, ctx.options.exportDir, `${lang}.json`))
        })
      }
    }
  }

  // autoClean(ctx, existDirectory)
}
