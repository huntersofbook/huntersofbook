import { pick } from 'filter-anything'
import { isArray } from 'is-what'
import { merge as mer, mergeAndCompare } from 'merge-anything'
import { removeProp } from 'remove-anything'

import { Merger } from './types'

function concatStrings(originVal: any, newVal: any, _key: any) {
  if (isArray(originVal) && isArray(newVal)) {
    // concat & merge logic
    const overlappingPart = originVal.slice(0, newVal.length)
    const data = overlappingPart
      .map((p, i) => {
        const data = newVal[i] ? mer(p, newVal[i]) : p
        const schemaDefaultKeys = Object.keys(p)
        const dd = pick(data, schemaDefaultKeys)
        return dd
      })
      .concat(newVal.length > originVal.length ? originVal.slice(newVal.length) : newVal.slice(originVal.length))

    return data
  }
  else {
    if (originVal !== undefined)
      return newVal
  }
}

export function merge(merge: Merger) {
  const data = mergeAndCompare(concatStrings, merge.schema, merge.newData)
  const noUndefined = removeProp(data, undefined)
  return noUndefined
}

