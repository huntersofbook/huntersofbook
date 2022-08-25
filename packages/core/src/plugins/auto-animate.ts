import { App } from 'vue'
import { autoAnimatePlugin as plugin } from '@formkit/auto-animate/vue'

const autoAnimatePlugin = {
  install(app: App) {
    app.use(plugin)
  },
}

export default autoAnimatePlugin
