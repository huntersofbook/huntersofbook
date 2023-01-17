import { copyFileSync, existsSync, lstatSync, mkdir, mkdirSync, readFileSync, readdirSync, rmSync, rmdirSync, writeFileSync } from 'node:fs'

import { basename, dirname, resolve } from 'pathe'
import consola from 'consola'
import Debug from 'debug'

import { merge } from '@huntersofbook/schob'
import { isArray } from 'lodash'
import { globbySync } from 'globby'
import type { Context } from './context'
import { matchGlobs } from './utils'

const debug = Debug('unplugin-i18n-watch:write')

const objectUpdate = async (exportFile: any, templateFile?: string | undefined, templateString?: string) => {
  let template: any = {}
  existsSync(exportFile)

  if (templateFile) {
    try {
      const data = readFileSync(templateFile, 'utf8')
      template = JSON.parse(data)
    }
    catch (error) {
      consola.error('this file is not valid please your schema', templateFile)
      return
    }
  }

  else if (templateString) {
    template = JSON.parse(templateString)
  }

  debug('template', template)

  let exportFileString: string | undefined

  try {
    exportFileString = readFileSync(exportFile, 'utf8')
  }
  catch (error) {
    writeFileSync(exportFile, template)
  }
  debug('exportFile', exportFileString)

  if (!existsSync(exportFile) || Object.keys(template).length === 0 || !exportFileString) {
    consola.info('exportFileString', exportFileString)
    writeFileSync(exportFile, JSON.stringify(template, null, 2), { mode: 0o777 })
    return
  }

  const _exportFile = JSON.parse(exportFileString)

  if (template === _exportFile)
    return

  if (Object.keys(_exportFile).length > 0) {
    const _merge = merge({ schema: template, newData: _exportFile })

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
      try {
        writeFileSync(exportFile, JSON.stringify(sortedObject, null, 2))
      }
      catch (error) {
        consola.error(error)
      }
    }
    catch (error) {
      consola.error(error)
    }
  }
  else {
    if (!existsSync(dirname(exportFile))) {
      mkdir(exportFile, { recursive: true }, (err) => {
        if (err)
          consola.error(err)
      })
    }

    if (templateString) {
      const obj = JSON.parse(templateString)
      const _merge = merge({ schema: template, newData: obj })
      try {
        writeFileSync(exportFile, JSON.stringify(_merge, null, 2))
        consola.success(`JSON file ${basename(_exportFile)} is created`)
      }
      catch (error) {
        consola.error(error, 'aa')
      }
    }
    else {
      try {
        writeFileSync(exportFile, JSON.stringify(template, null, 2))
        consola.success(`JSON file ${basename(_exportFile)} is created`)
      }
      catch (error) {
        consola.error(error, exportFile)
      }
    }
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

export async function writeI18nLanguageFile(ctx: Context, filepath?: string) {
  // check is directory
  if (!existsSync(ctx.options.templateDir))
    mkdirSync(ctx.options.templateDir)

  if (!existsSync(ctx.options.exportDir))
    mkdirSync(ctx.options.exportDir)

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
    if (checkFile && checkFile?.length > 1) {
      consola.error('only one file used. `xxx.json` example')
      return
    }

    // Check export file and director names
    const exportDirectoryNames = globbySync(`${ctx.options.exportDir}/*`, { onlyDirectories: true, cwd: ctx.root, deep: 0 })
    const exportFileNames = globbySync(`${ctx.options.exportDir}/*.json`, { onlyFiles: true, cwd: ctx.root, deep: 0 })

    languages.forEach((lang) => {
      if (existDirectory) {
        if (!exportDirectoryNames.includes(`${ctx.options.exportDir}/${lang}`))
          mkdirSync(`${ctx.options.exportDir}/${lang}`, { recursive: true })
      }

      if (!exportFileNames.includes(`${ctx.options.exportDir}/${lang}.json`))
        writeFileSync(`${ctx.options.exportDir}/${lang}.json`, '{}')
    })

    if (existDirectory) {
      exportDirectoryNames.forEach((res) => {
        if (!languages.includes(basename(res)))
          rmdirSync(res)
      })
    }

    /*
    * If the file is in a directory
    */
    if (existDirectory) {
      debug('directory')
      /**
       * templateFiles example export
       * @example [ '.i18n/xx/xxx.json', '.i18n/xx/yyy.json', '.i18n/xx/zzz.json' ]
       */
      const templateFiles = globbySync(`${ctx.options.templateDir}/**/*`, { onlyFiles: true, cwd: ctx.root })

      /**
     * templateFiles example export
     * @example [ '.i18n/xx', '.i18n/yy', '.i18n/zz' ]
     */
      const templateDirs = globbySync(`${ctx.options.templateDir}/**/*`, { onlyDirectories: true, cwd: ctx.root })

      consola.info('templateDirs', templateDirs)

      // template folder in files and directories in export folder check and remove
      function clean() {
        // Check export file and director names
        const _exportDirectoryNames = globbySync(`${ctx.options.exportDir}/**/*`, { onlyDirectories: true, cwd: ctx.root, ignore: languages.map(res => `**/*/${res}`) })
        const _exportFileNames = globbySync(`${ctx.options.exportDir}/**/*.json`, { onlyFiles: true, cwd: ctx.root, ignore: languages.map(res => `**/*/${res}.json`) })

        languages.forEach((lang) => {
          _exportFileNames.forEach((res) => {
            const base = res.split(`${ctx.options.exportDir}/${lang}`)[1]
            if (base) {
              const changeExportBase = `${ctx.options.templateDir}${base}`
              if (!templateFiles.includes(changeExportBase))
                rmSync(res)
            }
          })

          _exportDirectoryNames.forEach((res) => {
            const base = res.split(`${ctx.options.exportDir}/${lang}`)[1]
            if (base) {
              const changeExportBase = `${ctx.options.templateDir}${base}`
              if (!templateDirs.includes(changeExportBase))
                rmdirSync(res)
            }
          })
        })
      }
      clean()

      // etc: en, tr, de
      languages.forEach((lang) => {
        const _exportDirectories = globbySync(`${ctx.options.exportDir}/${lang}/**/*`, { onlyDirectories: true, cwd: ctx.root })

        templateDirs.forEach((res) => {
          const base = res.split(ctx.options.templateDir)[1]
          const changeExportBase = `${ctx.options.exportDir}/${lang}${base}`

          // create templates directories mkdir
          if (!_exportDirectories.includes(changeExportBase))
            mkdirSync(changeExportBase, { recursive: true })
        })

        // etc: en/buttons/filename.json
        const fileNames = globbySync(`${ctx.options.exportDir}/${lang}/**/*`, { onlyFiles: true, cwd: ctx.root, ignore: languages.map(res => `**/*/${res}.json`) })

        // etc: ["/buttons/filename.json", "/buttons/filename.json"]
        templateFiles.forEach((tt) => {
          // etc: /buttons/filename.json
          const tempDir = tt.split(ctx.options.templateDir)[1]
          // etc: en/buttons/filename.json
          const exportWithTemplate = `${ctx.options.exportDir}/${lang}${tempDir}`
          if (!fileNames.includes(exportWithTemplate))
            writeFileSync(exportWithTemplate, readFileSync(tt, { encoding: 'utf-8' }))
          else
            objectUpdate(exportWithTemplate, tt)
        })
      })

      languages.forEach((lang) => {
        const files = globbySync(`${ctx.options.exportDir}/${lang}/**/*.json`, { onlyFiles: true, cwd: ctx.root })

        /*
        * Merge all files in a directory and save language/en.json, language/tr.json ...
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
          consola.error('JSON file is not valid please your schema dir')
        }
      })
    }
    /*
    * If the only schema.json file in the template directory
    */
    else {
      /*
      * One file `schema.json` in template directory
      */
      // Check old files and remove
      const directoryExport = globbySync(`${ctx.options.exportDir}/**/*`, { onlyDirectories: true })
      if (directoryExport.length > 0) {
        // remove directory
        directoryExport.forEach((dir) => {
          rmdirSync(dir, { recursive: true })
        })
      }

      if (filepath) {
        const templateFile = resolve(filepath)

        if (!templateFile.includes('schema.json')) {
          consola.error('schema.json file not found')
          return
        }

        const checkLanguges = globbySync(`${ctx.options.exportDir}/*.json`, { onlyFiles: true })

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
      else {
        const files = globbySync(`${ctx.options.templateDir}/*.json`, { onlyFiles: true, cwd: ctx.root, deep: 0 })

        if (files.length > 0) {
          let find: string | undefined

          files.forEach((file) => {
            const isSchema = file.includes('schema.json')
            if (isSchema)
              find = file
            else
              consola.error('schema.json file not found')
          })

          if (find) {
            languages.forEach((lang) => {
              const exportFile = resolve(ctx.root, ctx.options.exportDir, `${lang}.json`)
              debug('exportFile', exportFile)
              objectUpdate(exportFile, find)
            })
          }
        }
      }
    }
  }

  // autoClean(ctx, existDirectory)
}
