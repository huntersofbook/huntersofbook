import { defineBuildConfig } from 'unbuild'

import pkg from './package.json'
const externals = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

export default defineBuildConfig({
  entries: ['src/index', 'src/cli'],
  clean: true,
  declaration: true,
  rollup: {
    inlineDependencies: true,
    resolve: {
      exportConditions: ['production', 'node'] as any,
    },
  },
  alias: {
    // we can always use non-transpiled code since we support 14.18.0+
    prompts: 'prompts/lib/index.js',
  },
  externals: [
    ...externals,
    'node:url',
    'node:buffer',
    'node:path',
    'node:child_process',
    'node:process',
    'node:path',
    'node:os',
    'fsevents',
    'node:perf_hooks',
  ],
})
