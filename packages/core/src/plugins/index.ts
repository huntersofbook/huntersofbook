import { App } from 'vue'
import autoAnimatePlugin from './auto-animate'

export const createHuntersofbook = () => {
  const huntersofbook = {
    install(app: App) {
      // TODO: #16 auto-animate bug
      // app.use(autoAnimatePlugin)

    },
  }
  return huntersofbook
}

export default createHuntersofbook
