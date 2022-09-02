import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import { loadDateFNSLocale } from 'huntersofbook'
import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'

import './styles/main.css'
import 'uno.css'

const routes = setupLayouts(generatedRoutes)

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    loadDateFNSLocale('tr').then((locale) => {
      console.log('locale', locale)
    })
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
  },
)
