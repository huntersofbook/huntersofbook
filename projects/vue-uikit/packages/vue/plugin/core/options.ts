import { join, resolve } from 'path'
import { slash, toArray } from '@antfu/utils'
import { getPackageInfoSync, isPackageExists } from 'local-pkg'
import type { Options, ResolvedOptions } from '../type'

export const defaultOptions: Omit<Required<Options>, 'include' | 'exclude' | 'globs' | 'version'> = {
  dirs: '.huntersofbook/css',
  extensions: 'css',
  importPathTransform: v => v,
  deep: true,
  cssFile: 'style.css',
}

export function resolveOptions(options: Options, root: string): ResolvedOptions {
  const resolved = Object.assign({}, defaultOptions, options) as ResolvedOptions
  resolved.extensions = toArray(resolved.extensions)

  if (resolved.globs) {
    resolved.globs = toArray(resolved.globs).map((glob: string) => slash(resolve(root, glob)))
    resolved.resolvedDirs = []
  }
  else {
    const extsGlob = resolved.extensions.length === 1
      ? resolved.extensions
      : `{${resolved.extensions.join(',')}}`

    resolved.dirs = toArray(resolved.dirs)
    resolved.resolvedDirs = resolved.dirs.map(i => slash(resolve(root, i)))

    resolved.globs = resolved.resolvedDirs.map(i => resolved.deep
      ? slash(join(i, `**/*.${extsGlob}`))
      : slash(join(i, `*.${extsGlob}`)),
    )

    if (!resolved.extensions.length)
      throw new Error('[unplugin-vue-components] `extensions` option is required to search for components')
  }

  resolved.dts = !resolved.dts
    ? false
    : resolve(
      root,
      typeof resolved.dts === 'string'
        ? resolved.dts
        : 'components.d.ts',
    )

  resolved.root = root
  resolved.version = resolved.version ?? getVueVersion(root)
  if (resolved.version < 2 || resolved.version >= 4)
    throw new Error(`[unplugin-vue-components] unsupported version: ${resolved.version}`)

  return resolved
}

function getVueVersion(root: string): 2 | 2.7 | 3 {
  const raw = getPackageInfoSync('vue', { paths: [root] })?.version || '3'
  const version = +(raw.split('.').slice(0, 2).join('.'))
  if (version === 3)
    return 3
  return 3
}
