import { isArray, isObject } from 'is-what'
import _ from 'lodash'
import { mergeAndCompare } from 'merge-anything'
import { removeProp } from 'remove-anything'

import { Merger } from './types'

/**
 * compare values
 *
 * @param originVal - the value in the schema
 * @param newVal - the value in the new data
 * @param _key - the key of the value
 * @returns
 */
function compare(originVal: any, newVal: any, _key: any) {
  if (isArray(originVal) && isArray(newVal)) {
    // // if both arrays have no objects, we can just return the new array
    if (arrayHasNoObject(originVal) && arrayHasNoObject(newVal)) {
      const res = [...originVal, ...newVal]
      return Array.from(new Set(res)) // return only unique values in an array
    }
    else {
      // get unique non-object values
      const nonObjectArrayNewVal = originVal.filter(item => !isObject(item))
      const nonObjectArrayOriginVal = newVal.filter(item => !isObject(item))
      const nonObjectArray = Array.from(new Set([...nonObjectArrayNewVal, ...nonObjectArrayOriginVal])) // unique non-object values

      // get unique object values
      const objectArrayNewVal = originVal.filter(isObject)
      const objectArrayOriginVal = newVal.filter(isObject)
      const objectArray = _.uniq([...objectArrayNewVal, ...objectArrayOriginVal]) // unique object values

      return [...nonObjectArray, ...objectArray]
    }
  }
  else {
    // if the key from newData has no corresponding key in schema, we don't want to merge it
    if (originVal !== undefined)
      return newVal
  }
}

function arrayHasNoObject(array: Array<any>) {
  return array.every(item => !isObject(item))
}

export function merge(merge: Merger) {
  const data = mergeAndCompare(compare, merge.schema, merge.newData)
  const noUndefined = removeProp(data, undefined)
  return noUndefined
}

