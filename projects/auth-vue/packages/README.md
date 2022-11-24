```ts
import { Preferences } from '@capacitor/preferences'

import type { AuthOptions, AuthStorageAsync } from '../types/index'
export class CapacitorStorage implements AuthStorageAsync {
  async set(key: string, value: any) {
    await Preferences.set({ key, value: JSON.stringify(value) })
  }

  async get(key: string, defaultValue: any) {
    try {
      const { value } = await Preferences.get({ key })
      return JSON.parse(value!)
    }
    catch {
      return defaultValue
    }
  }

  async remove(key: string) {
    await Preferences.remove({ key })
  }

  async clear(options: AuthOptions) {
    await Preferences.remove({ key: options.token.storageName })
    await Preferences.remove({ key: options.user.storageName })
    await Preferences.remove({ key: options.expiredStorage })
    await Preferences.remove({ key: options.refreshToken.storageName })
  }
}
```