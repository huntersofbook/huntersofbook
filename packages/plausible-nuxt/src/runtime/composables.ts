import type { ReturnUsePlasuible } from '@huntersofbook/plausible-vue'

export const usePlausible = (): ReturnUsePlasuible => {
  const plausible = useNuxtApp().$plausible
  return {
    ...plausible
  }
}
