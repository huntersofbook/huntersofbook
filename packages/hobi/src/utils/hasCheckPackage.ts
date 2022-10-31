import { existsSync } from 'fs'
import { resolve } from 'path'

import consola from 'consola'
import { normalize } from 'pathe'
import { PackageJson } from 'type-fest'

export default (cwd = process.cwd()) => {
  existsSync(resolve(cwd, 'package.json'))
}

export function getJson(cwd = process.cwd()): PackageJson | undefined {
  const isFile = existsSync(resolve(cwd, 'package.json'))
  const file = normalize('package.json')
  if (!file)
    consola.error('package.json not found')

  if (isFile)
    return require(resolve(file))
}
