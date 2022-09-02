import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './custom.css'
import { createHuntersofbook } from 'huntersofbook'
import Tabs from '../../../components/Tabs/Tabs.vue'
import Tab from '../../../components/Tabs/Tab.vue'
import GithubUrl from '../../../components/GithubUrl.vue'
import Demo from '../../../components/Demo.vue'
import Language from '../../../components/Language.vue'
import { extractFileNameFromPath } from '../../../utils'
import 'uno.css'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-before': () => h(Language),
    })
  },
  async enhanceApp({ app }) {
    app.component('Tab', Tab)
    app.component('Tabs', Tabs)
    app.component('GithubUrl', GithubUrl)
    app.component('Demo', Demo)

    Object.values(import.meta.glob('../modules/*.ts', { eager: true })).map((i: any) =>
      i.install?.({ app }))
    const demos = import.meta.glob('../../demos/**/*.vue', { eager: true })

    for (const path in demos)
      app.component(extractFileNameFromPath(path), demos[path].default)
  },
}
