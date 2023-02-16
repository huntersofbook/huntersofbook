import path, { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import glob from 'fast-glob'

import * as pkg from './package.json'

const externals = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]
export default defineConfig({
  plugins: [
    vue(),
    vueSetupExtend(),
    dtsPlugin({
      outputDir: 'dist/types',
      include: 'src',
      staticImport: true,
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: await glob('src/*.ts', { deep: 0 }),
      formats: ['es'],
    },
    rollupOptions: {
      external: externals,
      output: {
        format: 'es',
      },
    },
  },
})
