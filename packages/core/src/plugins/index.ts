import { InjectionKey, Ref, getCurrentInstance, inject, isRef } from 'vue'
import type { App, ComponentInternalInstance } from 'vue'
import { I18n } from 'vue-i18n'
import type { Locale } from 'date-fns'
import { loadDateFNSLocale, makeSymbol } from '../utils'
import autoAnimatePlugin from './auto-animate'
import { VueIhuntersofbook } from './vue-huntersofbook'

declare module 'vue' {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface App<HostElement = any> {
    __VUE_HUNTERSOFBOOK_SYMBOL__?: InjectionKey<Ihuntersofbook> | string
  }
}

/**
 * Injection key for {@link useI18n}
 *
 * @remarks
 * The global injection key for I18n instances with `useI18n`. this injection key is used in Web Components.
 * Specify the i18n instance created by {@link createI18n} together with `provide` function.
 *
 * @VueI18nGeneral
 */
export const I18nInjectionKey: InjectionKey<Ihuntersofbook> | string
/* #__PURE__ */ = makeSymbol('global-vue-huntersofbook')

/**
  * I18n instance
  *
  * @remarks
  * The instance required for installation as the Vue plugin
  *
  * @VueI18nGeneral
  */
export interface Ihuntersofbook {

  readonly global: VueIhuntersofbook

  /**
    * Install entry point
    *
    * @param app - A target Vue app instance
    * @param options - An install options
    */
  install(app: App, ...options: unknown[]): void
  /**
    * Release global scope resource
    */
  dispose(): void

}

export const createHuntersofbook = (i18n: I18n): Ihuntersofbook => {
  const key = Symbol('huntersofbook') as InjectionKey<string>
  const __global: VueIhuntersofbook = {} as any
  const huntersofbook = {
    async install(app: App) {
      const locale = isRef(i18n.global.locale)
        ? (i18n.global.locale as Ref<string>).value
        : i18n.global.locale

      app.use(autoAnimatePlugin)
      const localData = await loadDateFNSLocale(locale)

      app.__VUE_HUNTERSOFBOOK_SYMBOL__ = key
      app.provide(app.__VUE_HUNTERSOFBOOK_SYMBOL__, { global: { dateLocale: localData } } as Ihuntersofbook)

      const unmountApp = app.unmount
      app.unmount = () => {
        huntersofbook.dispose()
        unmountApp()
      }
    },
    get global() {
      return __global
    },
    dispose(): void {

    },
  }
  return huntersofbook
}

export function useHuntersofbook() {
  const instance = getCurrentInstance()
  if (instance == null)
    throw new Error('useHuntersofbook must be called in a Vue component')
  if (!instance.isCE
      && instance.appContext.app != null
      && !instance.appContext.app.__VUE_HUNTERSOFBOOK_SYMBOL__
  )
    throw new Error('useHuntersofbook not installed')

  const i18n = getHuntersofbookInstance(instance)
  return i18n
}

function getHuntersofbookInstance(instance: ComponentInternalInstance): Ihuntersofbook {
  const huntersofbook = inject(
    !instance.isCE
      ? instance.appContext.app.__VUE_HUNTERSOFBOOK_SYMBOL__!
      : I18nInjectionKey,
  )

  if (!huntersofbook)
    throw new Error('useHuntersofbook not installed')

  return huntersofbook
}

export default createHuntersofbook
