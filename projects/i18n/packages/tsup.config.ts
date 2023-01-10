import type { Options } from 'tsup'

import pkg from './package.json'
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

export default <Options>{
  entryPoints: ['src/*.ts'],
  outDir: 'dist',
  format: ['esm'],
  target: 'node16',
  dts: true,
  splitting: true,
  clean: true,
  shims: false,
}
