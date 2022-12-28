import { fileURLToPath } from 'url'

import { dirname, resolve } from 'path'
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

const __dirname = dirname(fileURLToPath(import.meta.url))
export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue', '@vueuse/core'],
    }),
    Vue(),
    vueSetupExtend(),
    dtsPlugin({
      outputDir: 'dist/lib/types',
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
      entry: [resolve(__dirname, 'src/index.ts')],
      formats: ['es'],
    },
    minify: true,
    rollupOptions: {
      external: externals,
      output: {
        format: 'es',
        manualChunks(id) {
          if (id.includes('src/component/'))
            return `lib/${id.toString().split('src/component/')[1].split('.')[0].toString()}`
          if (id.includes('tailwindPlugin'))
            return 'tailwindPlugin'
        },
        chunkFileNames: '[name].js',
        minifyInternalExports: true,

      },
    },
  },
})
