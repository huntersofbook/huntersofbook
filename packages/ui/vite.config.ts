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
      formats: ['es'],
      name: 'huntersofbook-ui',
      fileName: format => `huntersofbook-ui.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies)],
      output: {
        format: 'es',
        globals: {
          vue: 'Vue',
        },
        chunkFileNames: chunkInfo => `${chunkInfo.name}.js`,
      },
      // manualChunks(id) {
      //   if (id.includes('node_modules'))
      //     return 'vendor'
      //   if (id.includes('atom'))
      //     return 'atom'
      //   if (id.includes('form'))
      //     return 'form'
      // },
    },
  },
})
