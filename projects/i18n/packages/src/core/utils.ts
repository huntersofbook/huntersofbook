import minimatch from 'minimatch'
import { slash } from '@antfu/utils'
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
