import {
  AuthStorage,
  AuthStorageAsync,
  SupportedAuthStorage,
} from '../types/index'
import { CapacitorStorage } from './capacitor'
import { CookieStorage } from './cookie'
import { LocalStorage } from './local'
import { SecureLocalStorage } from './secure-ls'

export const drivers = {
  local: LocalStorage,
  secureLs: SecureLocalStorage,
  cookie: CookieStorage,
  capacitor: CapacitorStorage,
}

export const DEFAULT_DRIVER = 'local'

export const useStorage = (
  driver: SupportedAuthStorage,
): AuthStorage | AuthStorageAsync => new drivers[driver || DEFAULT_DRIVER]()
