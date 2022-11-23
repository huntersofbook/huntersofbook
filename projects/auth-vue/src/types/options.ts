import { AxiosRequestConfig } from 'axios'
import { CookieAttributes } from 'js-cookie'

import { AuthStorage, AuthStorageAsync } from './storage'

export interface AuthOptions {
  apiType: 'rest' | 'graphql'
  endpoints: {
    login: AxiosRequestConfig
    signup: AxiosRequestConfig
    forgotPassword: AxiosRequestConfig
    logout: AxiosRequestConfig
    user: AxiosRequestConfig
    refresh?: AxiosRequestConfig
  }
  errorProperty: string
  signup: {
    enabled: boolean
    accessTokenProperty: string
    refreshTokenProperty: string
  }
  token: {
    property: string
    refreshProperty?: string
    type: 'Bearer' | string
    storageName: string
    autoDecode: boolean
    name: string
  }
  user: {
    autoFetch: boolean
    property: string
    storageName: string
    graphqlQuery?: object
  }
  logout: {
    graphqlQuery?: object
  }
  refreshToken: {
    enabled: boolean
    property: string
    accessTokenProperty: string
    refreshTokenProperty: string
    maxAge: number
    storageName: string
    name: string
    autoLogout: boolean
    graphqlQuery?: object
  }
  moduleName: string
  expiredStorage: string
  redirect: {
    home: string
    login: string
    logout: string
  }
  registerAxiosInterceptors: boolean
  storage: {
    driver: () => AuthStorage | AuthStorageAsync
    allClear: boolean
    async: boolean
  }
  cookie?: CookieAttributes
  baseURL?: string
}
