import { createChatWoot } from '@huntersofbook/chatwoot-vue'
import { createApp } from 'vue'

import './style.css'
import App from './App.vue'

const chatwoot = createChatWoot({
  init: {
    websiteToken: 'b6BejyTTuxF4yPt61ZTZHjdB',
  },
  settings: {
    locale: 'en',
    position: 'left',
    launcherTitle: 'Hello Chat',
  },
})

const app = createApp(App)
app.use(chatwoot)

app.mount('#app')
