import type { Options } from 'tsup'

export const tsup: Options = {
  entry: [
    'plugin/*.ts',
  ],
  outDir: 'dist/plugin',
  format: ['esm'],
  target: 'node16',
  dts: true,
  splitting: true,
  clean: true,
  shims: false,
}
