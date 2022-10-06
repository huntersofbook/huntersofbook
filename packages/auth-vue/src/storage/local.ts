import { AuthStorage } from '../types/index'

export class LocalStorage implements AuthStorage {
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get(key: string, defaultValue: string) {
    try {
      const value = localStorage.getItem(key)
      return JSON.parse(value!)
    }
    catch {
      return defaultValue
    }
  }

  remove(key: string) {
    localStorage.remove(key)
  }

  clear() {
    localStorage.clear()
  }
}
