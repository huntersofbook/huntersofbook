import path from 'path'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

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
      compilerOptions: {
        sourceMap: true,
        esModuleInterop: true,
      },
      insertTypesEntry: true,
      staticImport: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'form-naiveui',
      formats: ['es'],
      fileName: format => `form-naiveui.${format}.js`,
    },
    rollupOptions: {
      external: externals,
      output: {
        format: 'es',
      },
    },
  },
})
