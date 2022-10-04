import type { Ihuntersofbook } from '@huntersofbook/core'

import { useNuxtApp } from '#app'

export const useHuntersofbook = (): Ihuntersofbook => {
  const huntersofbook = useNuxtApp().$huntersofbook
  return {
    ...huntersofbook
  }
}
