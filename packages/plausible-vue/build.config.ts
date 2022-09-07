import { defineBuildConfig } from 'unbuild'
import pkg from './package.json'
const externals = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  clean: true,
  declaration: true,
  externals,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
})
