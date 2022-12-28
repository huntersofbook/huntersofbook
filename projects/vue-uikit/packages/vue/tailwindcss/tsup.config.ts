import type { Options } from 'tsup'

export const tsup: Options = {
  entry: [
    './tailwindcss/src/index.ts',
  ],
  outDir: 'dist/tailwindcss',
  format: ['esm', 'cjs'],
  target: 'node16',
  dts: true,
}
