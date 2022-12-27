import path, { resolve } from 'path'

import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import DefineOptions from 'unplugin-vue-define-options/vite'
import AutoImport from 'unplugin-auto-import/vite'
import * as pkg from './package.json'

const externals = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]
export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue', '@vueuse/core'],
    }),
    Vue(),
    vueSetupExtend(),
    dtsPlugin({
      outputDir: 'dist/types',
      include: 'src',
    }),
    DefineOptions(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      name: 'huntersofbook-uikit',
      fileName: _format => 'huntersofbook-uikit.js',
    },
    minify: true,
    rollupOptions: {
      external: externals,
      output: {
        format: 'es',
      },
    },
  },
})
