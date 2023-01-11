import type { Options } from 'tsup'

export default <Options>{
  entryPoints: ['src/*.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  clean: true,
  shims: false,
}
