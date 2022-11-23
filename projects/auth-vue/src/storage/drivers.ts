import type {
  AuthStorage,
  AuthStorageAsync,
} from '../types/index'

export const useStorage = (
  driver: () => AuthStorage | AuthStorageAsync,
): AuthStorage | AuthStorageAsync => {
  return driver()
}
