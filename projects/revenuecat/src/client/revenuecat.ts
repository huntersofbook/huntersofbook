import axios, { AxiosInstance } from 'axios'

import { Attribute, Offerings, Subscribers, XPlatform } from '../types'
export default class Revenuecat {
  private readonly secretKey: string
  private readonly iosKey: string
  private readonly androidKey: string
  private readonly url = 'https://api.revenuecat.com/v1'
  private axios: AxiosInstance

  /**
   * Construct a new Revenuecat instance
   * @param token Revenuecat API token
   */
  constructor({ secretKey, iosKey, androidKey }: { secretKey: string; iosKey: string; androidKey: string }) {
    this.secretKey = secretKey
    this.iosKey = iosKey
    this.androidKey = androidKey
    this.axios = axios.create({
      baseURL: this.url,
    })
  }

  /**
   * Creates authorization header
   * @returns Authorization header value
   */
  private createAuthorizationHeader(platform?: XPlatform): string {
    switch (platform) {
      case 'ios':
        return `Bearer ${this.iosKey}`
      case 'android':
        return `Bearer ${this.androidKey}`
      default:
        return `Bearer ${this.secretKey}`
    }
  }

  //   Customers

  /**
   * Gets the offerings for your app.
  */
  getSubscriptions = async ({ userId, platform }: { userId: string; platform?: XPlatform }): Promise<Subscribers> => {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': this.createAuthorizationHeader(platform),
    }
    if (platform)
      headers = Object.assign(headers, { 'x-platform': platform })

    const { data } = await this.axios.get(`/subscribers/${userId}`, {
      headers,
    })
    return data
  }

  postSubscriptionsAttributes = async ({ userId, data }: { userId: string; platform?: XPlatform; data: Attribute }) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': this.createAuthorizationHeader(),
      'app_user_id': userId,
    }

    const { data: res } = await this.axios.post(`/subscribers/${userId}/attributes`, data, {
      headers,
    })
    return res
  }

  getOfferings = async ({ userId, platform }: { userId: string; platform: XPlatform }): Promise<Offerings> => {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': this.createAuthorizationHeader(platform),
      'app_user_id': userId,
    }
    if (platform)
      headers = Object.assign(headers, { 'x-platform': platform })

    const { data } = await this.axios.get(`/subscribers/${userId}/offerings`, {
      headers,
    })
    return data
  }
}
