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
      name: 'ui',
      formats: ['es'],
      fileName: format => `ui.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'tailwindcss'],
      output: {
        format: 'es',
        globals: {
          vue: 'Vue',
          tailwindcss: 'tailwindcss',
        },
        chunkFileNames: chunkInfo => `${chunkInfo.name}.mjs`,
      },
      manualChunks(id) {
        if (id.includes('node_modules'))
          return 'vendor'
        if (id.includes('form'))
          return 'form'
        if (id.includes('atom'))
          return 'atom'
      },
    },
  },
})
