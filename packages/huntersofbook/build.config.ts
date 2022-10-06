import { defineBuildConfig } from 'unbuild'

import pkg from './package.json'
const externals = [...Object.keys(pkg.dependencies || {})]

export default defineBuildConfig({
  entries: ['src/index', 'src/ui'],
  clean: true,
  declaration: true,
  externals,
  rollup: {
    emitCJS: true,
  },
})
