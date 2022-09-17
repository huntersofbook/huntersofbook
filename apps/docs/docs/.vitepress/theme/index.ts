import DefaultTheme from "vitepress/theme";
import type { App } from "vue";
import "./custom.css";
import { h } from "vue";

import Demo from "../../../components/Demo.vue";
import GithubUrl from "../../../components/GithubUrl.vue";
import Language from "../../../components/Language.vue";
import Tab from "../../../components/Tabs/Tab.vue";
import Tabs from "../../../components/Tabs/Tabs.vue";
import { extractFileNameFromPath } from "../../../utils";
import "uno.css";
import { setupI18n } from "../i18n";
import { setupStore } from "../stores";

async function setupApp(app: App) {
  // 挂载vuex状态管理
  setupStore(app);
  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app);
}
export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "nav-bar-content-before": () => h(Language),
    });
  },
  async enhanceApp({ app }) {
    app.component("Tab", Tab);
    app.component("Tabs", Tabs);
    app.component("GithubUrl", GithubUrl);
    app.component("Demo", Demo);

    await setupApp(app);

    // Object.values(import.meta.glob('../modules/*.ts', { eager: true })).map((i: any) =>
    //   i.install?.({ app }))
    const demos = import.meta.glob("../../demos/**/*.vue", { eager: true });

    for (const path in demos)
      app.component(extractFileNameFromPath(path), demos[path].default);
  },
};
