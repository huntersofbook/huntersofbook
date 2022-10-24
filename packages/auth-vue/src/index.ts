import { merge } from 'lodash'

import { AuthFunc } from './auth'
import { defaultOptions } from './options'
import { CookieStorage, LocalStorage, SecureLocalStorage } from './storage'
import { AppContext, AuthOptions, AuthStorageAsync } from './types'
export type { AppContext, AuthOptions, AuthStorageAsync }

export { defaultOptions, CookieStorage, LocalStorage, SecureLocalStorage }

export function AuthClient(ctx: AppContext) {
  const options = merge(defaultOptions, ctx.options)
  if (options.baseURL) ctx.axios.defaults.baseURL = options.baseURL
  const authPlugin = AuthFunc(options, ctx.axios)
  return authPlugin
}
