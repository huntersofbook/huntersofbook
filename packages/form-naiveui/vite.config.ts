import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import dtsPlugin from 'vite-plugin-dts'

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
      external: ['vue', 'tailwindcss', 'vee-validate', 'naive-ui'],
      output: {
        format: 'es',
        globals: {
          vue: 'Vue',
        },
        chunkFileNames: chunkInfo => `${chunkInfo.name}.es.js`,
      },
      manualChunks(id) {
        if (id.includes('node_modules'))
          return 'vendor'
        if (id.includes('inputs'))
          return 'inputs'
        if (id.includes('selects'))
          return 'selects'
      },
    },
  },
})
