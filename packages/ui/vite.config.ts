import path, { resolve } from 'path'

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
      include: 'src',
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
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      name: 'huntersofbook-ui',
      fileName: (format) => `huntersofbook-ui.${format}.js`,
    },
    rollupOptions: {
      external: externals,
      output: {
        format: 'es',
      },
    },
  },
})
