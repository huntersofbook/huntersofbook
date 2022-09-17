import { autoAnimatePlugin as plugin } from '@formkit/auto-animate/vue'
import { App } from 'vue'

const autoAnimatePlugin = {
  install(app: App) {
    app.use(plugin)
  },
}

export default autoAnimatePlugin
