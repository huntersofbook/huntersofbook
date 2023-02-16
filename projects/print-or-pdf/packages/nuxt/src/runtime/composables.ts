import type { ReturnUsePlasuible } from '@huntersofbook/plausible-vue'

import { useNuxtApp } from '#app'

export const usePlausible = (): ReturnUsePlasuible => {
  const plausible = useNuxtApp().$plausible
  return {
    ...plausible,
  }
}
