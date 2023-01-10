import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import unpluginI18n from '@huntersofbook/i18n/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    unpluginI18n({
      languages: ['en', 'tr', 'fr'],
    }),
  ],
})
