import { join, resolve } from 'path'
import { slash, toArray } from '@antfu/utils'
import type { Options, ResolvedOptions } from '../type'

export const defaultOptions: Omit<Required<Options>, 'version' | 'globs'> = {
  templateDir: '.i18n',
  exportDir: 'language',
  deep: true,
  extensions: ['json'],
  languages: ['en', 'tr'],
  schema: 'schemaEn.json',
  directoryAsNamespace: false,
}

export function resolveOptions(options: Options, root: string): ResolvedOptions {
  const resolved = Object.assign({}, defaultOptions, options) as ResolvedOptions

  if (resolved.globs) {
    resolved.globs = toArray(resolved.globs).map((glob: string) => slash(resolve(root, glob)))
    resolved.resolvedDir = ''
  }
  else {
    const extsGlob = resolved.extensions.length === 1
      ? resolved.extensions
      : `{${resolved.extensions.join(',')}}`

    resolved.resolvedDir = slash(resolve(root, resolved.templateDir))
    console.log('resolved.resolvedDir', resolved.resolvedDir)
    resolved.globs = toArray(resolved.resolvedDir).map(i => resolved.deep
      ? slash(join(i, `**/*.${extsGlob}`))
      : slash(join(i, `*.${extsGlob}`)),
    )

    if (!resolved.extensions.length)
      throw new Error('[unplugin-vue-components] `extensions` option is required to search for components')

    resolved.exportDir = resolve(
      root,
      typeof resolved.exportDir === 'string'
        ? resolved.exportDir
        : 'language',
    )

    resolved.root = root
  }

  return resolved
}
