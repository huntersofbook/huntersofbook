import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { decodeJwt } from 'jose'
import get from 'lodash/get'
import merge from 'lodash/merge'

import { isTokenExpired } from './lib'
import { useStorage } from './storage'
import { AuthOptions, AuthStorage, AuthStorageAsync, AuthUser } from './types'

export interface ICallBack {
  onSuccess?: (response: any) => void
  onError?: (error: any) => void
  onLoading?: (response: boolean) => void
}
export interface ICallBackUser extends ICallBack {
  onUser?: (user: AuthUser) => void
}

export function AuthFunc(options: AuthOptions, axios: AxiosInstance) {
  const storage: AuthStorage | AuthStorageAsync = useStorage(
    options.storage.driver,
  )

  async function authInit() {
    const token = await getFreshToken()
    if (token) await getUser()
  }

  function setTokenExpiration(tokenData: string) {
    if (options.token.autoDecode) {
      try {
        const decoded = decodeJwt(tokenData)

        if (decoded.exp) {
          storage.set(options.expiredStorage, decoded.exp)
          return decoded
        }
        else {
          return null
        }
      }
      catch {
        return null
      }
    }
    else {
      storage.set(options.expiredStorage, generateExpDate())
      return null
    }
  }

  function setToken(tokenData: string) {
    storage.set(options.token.storageName, tokenData)

    // token = tokenData

    setTokenExpiration(tokenData)
  }

  function setUser(userData: AuthUser) {
    storage.set(options.user.storageName, userData)
  }

  function generateExpDate() {
    const currDate = new Date()
    const newDate = new Date()
    newDate.setTime(currDate.getTime() + 30 * 60 * 1000)
    return newDate.getTime()
  }

  function resetState(callback?: ICallBack) {
    callback?.onLoading?.(true)
    storage.remove(options.token.storageName)
    storage.remove(options.user.storageName)
    storage.remove(options.refreshToken.storageName)
    callback?.onLoading?.(false)
  }

  function forceLogout(callback?: ICallBack) {
    callback?.onLoading?.(true)
    storage.clear(options)
    if (options.storage.allClear)
      storage.allClear()

    resetState()
    callback?.onLoading?.(false)
    return Promise.resolve(true)
  }

  async function logout(_payload?: any, callback?: ICallBack) {
    callback?.onLoading?.(true)
    if (options.endpoints.logout) {
      try {
        const token = await getToken()
        if (token)
          setTokenHeaderAxios(token)

        else
          forceLogout()

        const { data } = await axios.request({
          ...options.endpoints.logout,
          data: options.logout.graphqlQuery,
        })

        if (data) {
          callback?.onSuccess?.(options.redirect.logout)
          callback?.onLoading?.(false)
          setTimeout(() => {
            forceLogout()
          }, 300)
        }
        return data
      }
      catch (e: any) {
        if (e.response)
          callback?.onError?.(e.response?.data?.message || e.message)
        else callback?.onError?.(e)

        callback?.onLoading?.(false)
        return e.response
      }
    }
    else {
      const data = await forceLogout()
      if (data) callback?.onSuccess?.(data)
      callback?.onLoading?.(false)
      return data
    }
  }

  async function fetchUser(callback?: ICallBack) {
    const token = await getToken()
    if (!token) {
      resetState()
      return null
    }
    try {
      let res: AxiosResponse
      setTokenHeaderAxios(token)
      switch (options.apiType) {
        case 'graphql':
          res = await axios.request(
            merge(options.endpoints.user, {
              data: options.user.graphqlQuery,
            }),
          )
          break
        default:
          res = await axios.request(merge(options.endpoints.user))
          break
      }

      const data = res.data
      const user = get(data, options.user.property)
      setUser(user)
      callback?.onSuccess?.(user)
      return data
    }
    catch (e: any) {
      callback?.onError?.(e)
      return e.response.data
    }
  }

  async function setTokenHeaderAxios(tokenData: string) {
    if (tokenData) {
      (axios.defaults.headers as any)[
        options.token.name
      ] = `${options.token.type} ${tokenData}`
    }
    else {
      const newToken = await getToken();
      (axios.defaults.headers as any)[
        options.token.name
      ] = `${options.token.type} ${newToken}`
    }
  }

  async function login<P = AxiosRequestConfig>(
    payload: P,
    callback: ICallBackUser,
  ) {
    callback?.onLoading?.(true)
    try {
      delete axios.defaults.headers.common.Authorization
      const res = await axios.request(merge(options.endpoints.login, payload))
      if (get(res.data, options.errorProperty)) {
        resetState()
        callback?.onError?.(get(res.data, options.errorProperty))
        return res.data
      }
      const tokenData = get(res.data, options.token.property)

      setToken(tokenData)

      if (options.token.refreshProperty) {
        const refreshData = get(res.data, options.token.refreshProperty)
        storage.set(options.refreshToken.storageName, refreshData)
      }

      if (options.user.autoFetch) {
        setTokenHeaderAxios(tokenData)
        await fetchUser({
          onSuccess: (res) => {
            callback.onUser?.(res)
          },
        })
        callback.onSuccess?.(options.redirect.home)
        callback.onLoading?.(false)
        return
      }
      else if (options.token.autoDecode) {
        const decoded = setTokenExpiration(tokenData)
        const user = (decoded?.user as AuthUser) || decoded
        if (user) {
          callback.onUser?.(user)
          setUser(user)
        }
        callback.onLoading?.(false)
        return callback
      }
      callback.onLoading?.(false)
      return callback
    }
    catch (e: any) {
      resetState()
      if (e.response)
        callback.onError?.(e.response?.data?.message || e.message)
      else callback.onError?.(e)
      callback.onLoading?.(false)
    }
    finally {
      callback.onLoading?.(false)
    }
  }

  async function forgotPassword<P = AxiosRequestConfig>(
    payload: P,
    callback: ICallBack,
  ) {
    callback?.onLoading?.(true)
    try {
      const res = await axios.request(
        merge(options.endpoints.forgotPassword, payload),
      )
      if (get(res.data, options.errorProperty)) {
        resetState()
        callback.onError?.(get(res.data, options.errorProperty))
      }
      callback.onSuccess?.(res.data)
      return res
    }
    catch (e: any) {
      resetState()
      if (e.response)
        callback.onError?.(e.response?.data?.message || e.message)
      else callback.onError?.(e)
      callback.onLoading?.(false)
    }
    finally {
      callback.onLoading?.(false)
    }
  }

  async function signup<P = AxiosRequestConfig>(
    payload: P,
    callback: ICallBackUser,
  ) {
    callback?.onLoading?.(true)
    try {
      const res = await axios.request(merge(options.endpoints.login, payload))
      if (get(res.data, options.errorProperty)) {
        resetState()
        callback.onError?.(get(res.data, options.errorProperty))
      }

      const tokenData = get(res.data, options.token.property)

      setToken(tokenData)

      if (options.token.refreshProperty) {
        const refreshData = get(res.data, options.token.refreshProperty)
        storage.set(options.refreshToken.storageName, refreshData)
      }

      if (options.user.autoFetch) {
        setTokenHeaderAxios(tokenData)
        await fetchUser()
        callback.onSuccess?.(options.redirect.home)
        return null
      }
      else if (options.token.autoDecode) {
        const decoded = setTokenExpiration(tokenData)

        const user = (decoded?.user as AuthUser) || decoded
        if (user) {
          setUser(user)
          callback.onUser?.(user)
        }
        return res
      }

      return res
    }
    catch (e: any) {
      resetState()
      if (e.response)
        callback.onError?.(e.response?.data?.message || e.message)
      else callback.onError?.(e)
      callback.onLoading?.(false)
    }
    finally {
      callback.onLoading?.(false)
    }
  }

  function setRefreshTokenData(data: any) {
    if (options.refreshToken.enabled) {
      const refreshToken = get(data, options.refreshToken.property)
      storage.set(options.refreshToken.storageName, refreshToken)
    }
  }

  function getLocalUser(callback?: ICallBack) {
    const user = storage.get(options.user.storageName)
    callback?.onLoading?.(true)
    if (user) callback?.onSuccess?.(user)
    callback?.onLoading?.(false)
    return user
  }

  async function getUser(callback?: ICallBack) {
    callback?.onLoading?.(true)
    const token = await getToken()
    if (token)
      setTokenHeaderAxios(token)

    else
      forceLogout()
    if (options.user.autoFetch) {
      const user = await fetchUser()
      callback?.onSuccess?.(user)
      callback?.onLoading?.(false)
      return user
    }
    else {
      const user = getLocalUser()
      callback?.onSuccess?.(user)
      callback?.onLoading?.(false)
      return user
    }
  }

  async function isExpired(callback?: ICallBack) {
    callback?.onLoading?.(true)
    const expireTime = await storage.get<number>(options.expiredStorage)
    const data = isTokenExpired(expireTime)
    callback?.onLoading?.(false)
    callback?.onSuccess?.(data)
    return data
  }

  async function getFreshToken(): Promise<string | null> {
    const token = await storage.get<string>(options.token.storageName)
    if (token)
      return token
    else
      return null
  }

  async function getToken(): Promise<string | null> {
    if (await isExpired()) {
      await refreshToken()
      return getFreshToken()
    }
    else {
      return await getFreshToken()
    }
  }

  async function setRefreshToken(token: string) {
    await storage.set(options.refreshToken.storageName, token)
  }

  async function getRefreshToken() {
    return await storage.get<string>(options.refreshToken.storageName)
  }

  async function getTokenExpirationTime() {
    return await storage.get<number>(options.expiredStorage)
  }

  async function refreshToken(callback?: ICallBack) {
    callback?.onLoading?.(true)
    const expiredAt = await getTokenExpirationTime()
    if (expiredAt && !isTokenExpired(expiredAt)) {
      callback?.onLoading?.(false)
      callback?.onError?.('Token is not expired')
      return null
    }

    try {
      const refreshToken = await getRefreshToken()
      const refreshTokenName = options.refreshToken.name
      if (!refreshToken) {
        callback?.onLoading?.(false)
        callback?.onError?.('Refresh token is not found')
        return null
      }

      let data: object
      if (options.apiType === 'graphql') {
        data = {
          query: `
            mutation RefreshToken($data: RefreshTokenInput!) {
              refreshToken(data: $data) {
                accessToken
                refreshToken
              }
            }
        `,
          variables: {
            data: {
              refreshToken,
            },
          },
        }
      }
      else {
        data = {
          [refreshTokenName]: refreshToken,
        }
      }
      const res = await axios.request({
        ...options.endpoints.refresh,
        data,
      })

      if (get(res.data, options.errorProperty)) {
        resetState()
        handleRefreshTokenFailed()
        const error = get(res.data, options.errorProperty)
        callback?.onError?.(error)
        callback?.onLoading?.(false)
        return error
      }

      const tokenData = get(res.data, options.refreshToken.accessTokenProperty)

      setToken(tokenData)

      const refreshData = get(
        res.data,
        options.refreshToken.refreshTokenProperty,
      )

      storage.set(options.refreshToken.storageName, refreshData)
      const newTokens = get(res.data, options.refreshToken.accessTokenProperty)
      callback?.onSuccess?.(newTokens)
      callback?.onLoading?.(false)
      return newTokens
    }
    catch (e: any) {
      callback?.onError?.(e)
      return handleRefreshTokenFailed(e)
    }
    finally {
      callback?.onLoading?.(false)
    }
  }

  function handleRefreshTokenFailed(e?: any, callback?: ICallBack) {
    if (options.refreshToken.autoLogout) forceLogout()
    callback?.onError?.(e?.message || 'Refresh token failed')
    callback?.onSuccess?.(options.redirect.home)
    return e
  }

  return {
    authInit,
    resetState,
    forceLogout,
    logout,
    fetchUser,
    login,
    forgotPassword,
    signup,
    setRefreshTokenData,
    getUser,
    isExpired,
    getToken,
    setRefreshToken,
    refreshToken,
  }
  //   initStore() {

  //     loggedIn() {
  //       return !!user && !!token
  //     }

  // }
}
