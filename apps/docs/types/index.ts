import type { App } from "vue";

interface AppContext {
  app: App<Element>;
}

export type AppModule = (ctx: AppContext) => void;
