import type { Options } from 'tsup'

import pkg from './package.json'
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

export default <Options>{
  entryPoints: ['src/index.ts'],
  dts: true,
  target: 'node16', // needed for working ESM
  format: ['esm'],
  clean: true,
  external,
}
