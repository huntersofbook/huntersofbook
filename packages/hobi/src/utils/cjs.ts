import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

import { normalize } from 'pathe'

const _require = createRequire(process.cwd())

export function getModulePaths(paths?: string | string[]): string[] {
  const a = Array.isArray(paths) ? paths : [paths]
  return [].concat(
    ...a,
    process.cwd(),
  ).filter(Boolean)
}

export function resolveModule(id: string, paths?: string | string[]) {
  return normalize(_require.resolve(id, { paths: getModulePaths(paths) }))
}

export function requireModule(id: string, paths?: string | string[]) {
  return _require(resolveModule(id, paths))
}

export function tryRequireModule(id: string, paths?: string | string[]) {
  try { return requireModule(id, paths) }
  catch { return null }
}

export function importModule(id: string, paths?: string | string[]) {
  const resolvedPath = resolveModule(id, paths)
  return import(pathToFileURL(resolvedPath).href)
}
