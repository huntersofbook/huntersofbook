import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import dtsPlugin from 'vite-plugin-dts'
import * as pkg from './package.json'

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
      formats: ['es', 'cjs'],
      name: 'huntersofbook-ui',
      fileName: format => (format === 'es' ? 'huntersofbook-ui.mjs' : 'huntersofbook-ui.cjs'),
    },
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies)],
    },
  },
})
