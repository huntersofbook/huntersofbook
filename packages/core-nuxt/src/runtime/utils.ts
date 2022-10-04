import { defineGetter, proxyHuntersofbook } from './internal'

import type { NuxtApp } from '#imports'

export function inejctNuxtHelpers(nuxt: NuxtApp, book: I18n) {
  /**
   * NOTE:
   *  we will inject `i18n.global` to **nuxt app instance only**
   *  because vue-i18n has already injected into vue,
   *  it's not necessary to do, so we borrow from nuxt inject implementation.
   */
  defineGetter(nuxt as any, '$huntersofbook', book.global)

  for (const pair of [
    ['getRouteBaseName', getRouteBaseName],
    ['localePath', localePath],
    ['localeRoute', localeRoute],
    ['switchLocalePath', switchLocalePath],
    ['localeHead', localeHead]
  ]) {
    defineGetter(
      nuxt as any,
      `$${pair[0]}`,
      proxyHuntersofbook(nuxt, pair[1] as (...args: any) => any)
    )
  }
}
