import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'

import { createApp, h } from 'vue'

import './styles/main.css'
import 'uno.css'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'
import generatedRoutes from '~pages'

const routes = setupLayouts(generatedRoutes)

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

// https://github.com/antfu/vite-ssg
export const app = createApp(App)
const head = createHead()

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)
app.use(head)

async function init() {
  try {
    Object.values(import.meta.glob('./modules/*.ts', { eager: true })).map((i: any) =>
      i.install?.({ app, router }),
    )
    router.isReady().then(() => {
      app.mount('#app')
    })
  }
  catch (e) {
    console.error(e)
  }
}

init()
