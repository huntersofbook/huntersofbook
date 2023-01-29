import minimatch from 'minimatch'
import { slash } from '@antfu/utils'
import { isArray } from 'lodash'
import { DISABLE_COMMENT } from './constants'

export function matchGlobs(filepath: string, globs: string[]) {
  for (const glob of globs) {
    if (minimatch(slash(filepath), glob))
      return true
  }
  return false
}

export function shouldTransform(code: string) {
  if (code.includes(DISABLE_COMMENT))
    return false
  return true
}

/**
       * It sorts the keys of an object, and if the value of a key is an object, it recursively sorts
       * that object's keys as well
       * thank you https://stackoverflow.com/a/72998623/17764989
       */
export const sortObject = (obj: any) => {
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
