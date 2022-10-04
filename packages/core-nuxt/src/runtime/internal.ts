
import type { NuxtApp } from '#imports'

export function proxyHuntersofbook<T extends (...args: any) => any>(
  nuxt: NuxtApp,
  target: T
) {
  return function () {
    return Reflect.apply(
      target,
      {
        i18n: nuxt.$i18n,
        getRouteBaseName: nuxt.$getRouteBaseName,
        localePath: nuxt.$localePath,
        localeRoute: nuxt.$localeRoute,
        switchLocalePath: nuxt.$switchLocalePath,
        localeHead: nuxt.$localeHead,
        route: (nuxt as any).$router.currentRoute.value,
        router: (nuxt as any).$router,
        store: undefined
      },
      // eslint-disable-next-line prefer-rest-params
      arguments
    ) as (this: NuxtApp, ...args: Parameters<T>) => ReturnType<T>
  }
}

export function defineGetter<K extends string | number | symbol, V>(
  obj: Record<K, V>,
  key: K,
  val: V
) {
  Object.defineProperty(obj, key, { get: () => val })
}
