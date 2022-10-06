import { addImports } from '@nuxt/kit'
import { resolve } from 'pathe'
import type { Import } from 'unimport'

import importNames from '../config/composables'
import { distDir } from '../dirs'

/** Register huntersofbook composables globally with auto-import */
export const useHuntersofbookComposables = () => {
  const composablesFrom = resolve(distDir, './runtime/composables.mjs')
  const autoImportsList = importNames.map<Import>(item => ({
    name: item,
    as: item,
    from: composablesFrom,
  }))

  addImports(autoImportsList)
}
