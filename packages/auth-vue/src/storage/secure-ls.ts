import CryptoJS from 'crypto-js'

import { AuthOptions, AuthStorage } from '../types/index'

export class SecureLocalStorage implements AuthStorage {
  set(key: string, value: string) {
    CryptoJS.AES.encrypt(value, key)
  }

  get(key: string, defaultValue: string) {
    try {
      const bytes = CryptoJS.AES.decrypt(defaultValue, key) as any
      return bytes.toString(CryptoJS.enc.Utf8) || defaultValue
    }
    catch {
      return defaultValue
    }
  }

  clear(_options?: AuthOptions): void {}

  remove(_key: string): void {}
}
