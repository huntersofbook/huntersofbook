import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import huntersofbookUIKIT from '@huntersofbook/vue-uikit/plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    huntersofbookUIKIT(),
  ],
})
