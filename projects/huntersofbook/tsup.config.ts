// import { defineConfig } from 'tsup'
import pkg from 'tsup'

import pkga from './package.json'
const { defineConfig } = pkg
const externals = [
  ...Object.keys(pkga.dependencies || {}),
]

export default defineConfig({
  entry: ['src/index.ts', 'src/cli.ts'],
  format: ['esm', 'cjs'],
  target: 'esnext',
  splitting: false,
  minify: true,
  sourcemap: true,
  external: [
    ...externals,
    'node:url',
    'node:crypto',
    'node:module',
    'node:perf_hooks',
  ],
})
