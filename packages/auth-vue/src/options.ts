import { AuthOptions } from './types'

export const defaultOptions: AuthOptions = {
  endpoints: {
    login: {
      url: '/auth/login',
      method: 'post',
    },
    signup: {
      url: '/auth/signup',
      method: 'post',
    },
    logout: {
      url: '/auth/logout',
      method: 'delete',
    },
    user: {
      url: '/auth/me',
      method: 'get',
    },
    refresh: {
      url: '/auth/refresh',
      method: 'post',
    },
    forgotPassword: {
      url: '/auth/forgot-password',
      method: 'post',
    },
  },
  errorProperty: 'errors',
  signup: {
    accessTokenProperty: 'accessToken',
    enabled: false,
    refreshTokenProperty: 'refreshToken',
  },
  logout: {},
  token: {
    property: 'data.token',
    type: 'Bearer',
    storageName: 'auth.token',
    autoDecode: false,
    name: 'Authorization',
  },
  user: {
    autoFetch: true,
    property: 'data',
    storageName: 'auth.user',
  },
  refreshToken: {
    enabled: false,
    property: 'data',
    accessTokenProperty: 'data.token',
    refreshTokenProperty: 'data.refreshToken',
    maxAge: 60 * 60 * 24 * 30, // default 30 days
    storageName: 'auth.refresh_token',
    name: 'refresh_token',
    autoLogout: true,
  },
  moduleName: 'auth',
  expiredStorage: 'auth.expired',
  redirect: {
    home: '/',
    login: '/auth/login',
    logout: '/auth/login',
  },
  registerAxiosInterceptors: true,
  storage: {
    driver: 'secureLs',
    async: false,
  },
  restApiType: 'graphql',
  baseURL: '',
}
