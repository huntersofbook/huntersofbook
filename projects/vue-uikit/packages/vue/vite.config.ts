import { resolve } from 'path'

import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import DefineOptions from 'unplugin-vue-define-options/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { componentNames } from './src/components'
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
      entry: [resolve(__dirname, 'src/index.ts'), './tailwindPlugin.js'],
      formats: ['es'],
    },
    minify: true,
    rollupOptions: {
      external: externals,
      output: {
        format: 'es',
        manualChunks(id) {
          if (id.includes('src/component/'))
            return id.toString().split('src/component/')[1].split('.')[0].toString()
          if (id.includes('node_modules'))
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
        },
      },
    },
  },
})
