import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'

import { basename, resolve } from 'pathe'
import consola from 'consola'

import { merge } from '@huntersofbook/schob'
import { isArray } from 'lodash'
import type { Context } from './context'

export async function writeStyleCSSFile(ctx: Context, _filepath: string) {
  const dir = `${ctx.root}/${ctx.options.dir}`
  const schemaPath = ctx.options.schema
  const languages = ctx.options.outputNames
  try {
    const schema = JSON.parse(readFileSync(schemaPath, 'utf8'))
    languages.forEach((file) => {
      const writePath = resolve(dir, `${file}.json`)

      if (schemaPath === writePath)
        return

      if (existsSync(writePath)) {
        const obj = JSON.parse(readFileSync(writePath, 'utf8'))
        const _merge = merge({ schema, newData: obj })
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
        copyFileSync(schemaPath, writePath)
        consola.success(`JSON file ${basename(writePath)} is created`)
      }
    })
  }
  catch (error) {
    consola.error('JSON file is not valid please your schema', schemaPath)
  }
}
