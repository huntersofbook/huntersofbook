import minimatch from 'minimatch'
import { slash } from '@antfu/utils'
import type { FileInfo, ImportInfo, Options } from '../type'
import { DISABLE_COMMENT } from './constants'
import type { Context } from './context'

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

export function stringifyImport(info: ImportInfo | string) {
  if (typeof info === 'string')
    return `import '${info}'`
  else if (info.name)
    return `import { ${info.name} from '${info.from}'`
  else
    return `import from '${info.from}'`
}

export function getTransformedPath(path: string, importPathTransform?: Options['importPathTransform']): string {
  if (importPathTransform) {
    const result = importPathTransform(path)
    if (result != null)
      path = result
  }

  return path
}

export function stringifyComponentImport({ from: path, name: importName }: FileInfo, ctx: Context) {
  path = getTransformedPath(path, ctx.options.importPathTransform)

  const imports = [
    stringifyImport({ from: path, name: importName }),
  ]

  return imports.join(';')
}
