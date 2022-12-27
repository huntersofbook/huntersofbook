import path from 'path'

import { fileURLToPath } from 'url'

import { readFileSync, writeFileSync } from 'fs'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import DefineOptions from 'unplugin-vue-define-options/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import css from 'rollup-plugin-css-only'
import { globby } from 'globby'
import { basename, dirname, isAbsolute, join, normalize, resolve } from 'pathe'
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
      outputDir: 'dist/types',
      include: 'src',
    }),
    // all css files in src/component will be copied to dist/css
    {
      name: 'copy-css',
      apply: 'build',
      async writeBundle() {
        const files = await globby(['./src/component/**/*.css'], { absolute: true })
        const dd = files.map((file) => {
          return readFileSync(file, 'utf-8')
        })
        writeFileSync('./dist/style.css', dd.join('\n'))
      },

    },

    DefineOptions(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, './src/component/**/*.css'),
          dest: path.resolve(__dirname, './dist/css'),
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: [resolve(__dirname, 'src/index.ts'), './tailwindPlugin.ts'],
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
        chunkFileNames: '[name].js',
        minifyInternalExports: true,
      },
    },
  },
})
