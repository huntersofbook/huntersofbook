import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Tabs from '../../../components/Tabs/Tabs.vue'
import Tab from '../../../components/Tabs/Tab.vue'
import GithubUrl from '../../../components/GithubUrl.vue'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('Tab', Tab)
        app.component('Tabs', Tabs)
        app.component('GithubUrl', GithubUrl)
    }
}