import { AxiosInstance } from 'axios'

import { AuthOptions } from './options'

export type { AuthOptions, SupportedAuthStorage } from './options'
export type { AuthStorage, AuthStorageAsync } from './storage'
export type { AuthError, AuthUser } from './plugin'

export type AuthRouterMeta = 'user' | 'public' | 'guest'

export interface AppContext {
  axios: AxiosInstance
  options?: AuthOptions
}
