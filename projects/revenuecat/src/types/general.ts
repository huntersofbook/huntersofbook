export type StoreType = 'app_store' | 'play_store' | 'mac_app_store' | 'stripe' | 'amazon'
export type XPlatform = 'ios' | 'android' | 'amazon' | 'macos' | 'uikitformac'

export interface Subscribers {
  /**
    * The ISO 8601 datetime of the request.
  */
  request_date: string
  /**
    * The Unix timestamp of the request.
  */
  request_date_ms: number
  /**
    * A Subscriber object
  */
  subscriber: Subscriber
}

export interface Subscriber {
  /**
    * A mapping of Entitlement objects keyed by entitlement ID.
  */
  entitlements: Entitlements
  /**
    * The ISO 8601 datetime string corresponding to when this user
    * was first seen in RevenueCat .
  */
  first_seen: string
  /**
    * URL to manage the active subscription of the user.
    * If the user has an active iOS subscription,
    * this will point to the App Store, if the user has an active
    * Play Store subscription it will point there.
    *
    * If there are no active subscriptions it will be null.
    *
    * If the user has multiple active subscriptions for different platforms,
    * this will take the value of the OS in the X-Platform header into consideration:
    *
    * - If the request was made on an OS for which there are active subscriptions,
    * this will return the URL for the store that matches the header.
    *
    * - If the request was made on a different OS or the OS was not included in the X-Platform header,
    * this will return the URL for the store of the subscription with the farthest future expiration date.
    */
  management_url: string
  /**
    * A mapping of {@link NonSubscriptions | Non-Subscription} object arrays keyed by product ID.
    * {@link https://www.revenuecat.com/docs/non-subscriptions| Non-Subscription}
    * Purchases include consumables,
    *
    * non-consumables, and non-renewing subscriptions.
  */
  non_subscriptions: NonSubscriptions
  /**
   * The first app user ID that was registered for this user.
  */
  original_app_user_id: string
  /**
   * Only available on iOS.
   * This will be null until an iOS receipt is sent for the user.
   * After a receipt has been sent, it will indicate the first
   * App Store version of your app that user installed.
  */
  original_application_version?: string
  /**
   * Only available on iOS.
   * The date that the app was first purchased/downloaded by the user.
   * Will be null if no receipt is recorded for the user. Useful for.
  */
  original_purchase_date?: string
  /**
   * @deprecated use the new {@link Subscriber.original_purchase_date} instead.
   */
  other_purchases: OtherPurchases
  /**
    * A mapping of Subscription objects keyed by product ID.
  */
  subscriptions: Subscriptions
}

export interface Entitlements {
  /**
   * An Entitlement object
   * {@link https://www.revenuecat.com/docs/entitlements | Entitlements}
  */
  [key: string]: Entitlement
}

export interface Entitlement {
  /**
   * The ISO 8601 datetime this entitlement is set to expire (may be in the past).
  */
  expires_date?: null
  /**
   * The ISO 8601 datetime when the grace period for
   * the subscription would expire (may be in the past).
   * Will be null if user has never been in a grace period.
  */
  grace_period_expires_date?: null
  /**
   * The ISO 8601 datetime of the latest purchase or renewal.
  */
  product_identifier: string
  /**
   * The product identifier that unlocked this entitlement.
  */
  purchase_date: string
}

export interface NonSubscriptions {
  [key: string]: (OnetimeEntity)[] | null
}

export interface OnetimeEntity {
  /**
   * A unique identifier for the transaction.
   * You can use this to ensure you track consumption of all consumable products.
  */
  id: string
  /**
   * Boolean indicating whether the subscription was purchased in sandbox or production environment
  */
  is_sandbox: boolean
  /**
   * The ISO 8601 datetime that the purchase happened.
  */
  purchase_date: string
  /**
   * Possible values for store:
   * - app_store: The product was purchased through Apple App Store.
   * - mac_app_store: The product was purchased through the Mac App Store.
   * - play_store: The product was purchased through the Google Play Store.
   * - amazon: The product was purchased through the Amazon Appstore.
   * - stripe: The product was purchased through Stripe.
  */
  store: StoreType
}

/**
 * @deprecated use the new {@link Subscriber.original_purchase_date} instead.
*/
export interface OtherPurchases {
}

export interface Subscriptions {
  [key: string]: Subscription
}

export interface Subscription {
  /**
   * The ISO 8601 datetime when the subscription will resume after being paused.
  */
  auto_resume_date?: null
  /**
   *  The ISO 8601 datetime that an unsubscribe was detected.
   * Will be null if previously unsubscribed user has resubscribed.
   * Note the subscription may still be active,
   * check the expires_date attribute.
   */
  billing_issues_detected_at?: null
  /**
   * The ISO 8601 datetime of the latest known expiration date.
   */
  expires_date: string
  /**
   * The ISO 8601 datetime when the grace period for the subscription would expire (may be in the past).
   * Will be null if user has never been in a grace period.
  */
  grace_period_expires_date?: null
  /**
    * Boolean indicating whether the subscription was purchased in sandbox or production environment.
  */
  is_sandbox: boolean
  /**
   * The ISO 8601 datetime of the first recorded purchase of this product.
  */
  original_purchase_date: string
  /**
   * Possible values:
   * - PURCHASED: The user purchased the product.
   * - FAMILY_SHARED: The user has access to the product via their family.
  */
  ownership_type: 'PURCHASED' | 'FAMILY_SHARED'
  /**
   * Possible values for period_type:
   * - normal: The product is in it's normal period (default)
   * - trial: The product is in a free trial period
   * - intro: The product is in an introductory pricing period
  */
  period_type: 'normal' | 'intro' | 'trial'
  /**
   * The ISO 8601 datetime of the latest purchase or renewal.
  */
  purchase_date: string
  /**
   * The ISO 8601 datetime when the subscription was refunded.
  */
  refunded_at?: null
  /**
    * Possible values for store:
    * - app_store: The product was purchased through Apple App Store.
    * - mac_app_store: The product was purchased through the Mac App Store.
    * - play_store: The product was purchased through the Google Play Store.
    * - amazon: The product was purchased through the Amazon Appstore.
    * - {@link https://www.revenuecat.com/docs/customers#section-granting-promotional-subscriptions promotional: The product was}.
  */
  store: StoreType | 'promotional'
  /**
   * The ISO 8601 datetime that an unsubscribe was detected.
   * Will be null if previously unsubscribed user has resubscribed.
   * Note the subscription may still be active, check the expires_date attribute.
  */
  unsubscribe_detected_at: string
}

export interface Offerings {
  /**
   * The current offering for this user.
   * Offering overrides and Experiments affect this key depending on the app user ID.
  */
  current_offering_id: string
  /**
   * A list of Offering objects.
  */
  offerings?: (OfferingsEntity)[] | null
}

export interface OfferingsEntity {
  /**
   * The offering's description.
  */
  description: string
  /**
   * The offering's identifier.
  */
  identifier: string
  /**
   * A list of Package objects.
  */
  packages?: (PackagesEntity)[] | null
}

export interface PackagesEntity {
  /**
   * The package's identifier. If you used one of RevenueCat's default identifiers,
   * it will be prefixed by rc_.
  */
  identifier: string
  /**
   * The identifier of the product in the stores.
   * This should be used to fetch the product from
   * Apple, Google, Amazon, or Stripe depending on the platform.
  */
  platform_product_identifier: string
}

/**
 * @example
 * ```typescript
 * attributes: {
 *  key_name: {
 *  value: 'age', updated_at_ms: '24',
 *  value: 'custom_group_id', updated_at_ms: 'abc123'
 *  }
 * }
 * ```
*/
export interface Attribute {
  attributes: Attributes
}

/**
 * @see {@link https://www.revenuecat.com/docs/subscriber-attributes | Subscriber Attributes}
 * @example
 * ```typescript
 * attributes: {
        $email: {
          value: 'asasd@gmail.com',
        },
      },
  * ```
*/
export interface Attributes {
  // General

  /**
   * Email address for the user
  */
  '$email'?: KeyName

  /**
   * Name that should be used to reference the user
  */
  '$displayName'?: KeyName

  /**
   * Phone number for the user
  */
  '$phoneNumber'?: KeyName

  /**
   * Apple push notification tokens for the user
  */
  '$apnsTokens'?: KeyName

  /**
   * Google push notification tokens for the user
  */
  '$fcmTokens'?: KeyName

  // Device Identifiers

  /**
   * Apple advertising identifier
  */
  '$idfa'?: KeyName

  /**
   * Apple vendor identifier
  */
  '$idfv'?: KeyName

  /**
   * Google advertising identifier
  */
  '$gpsAdId'?: KeyName

  /**
   * Android device identifier
  */
  '$androidId'?: KeyName

  /**
   * {@link https://www.adjust.com Adjust} user identifier
  */
  '$adjustId'?: KeyName

  /**
   * {@link https://amplitude.com Amplitude} device identifier
  */
  '$amplitudeDeviceId'?: KeyName

  /**
   * {@link https://amplitude.com Amplitude} user identifier
  */
  '$amplitudeUserId'?: KeyName

  /**
   * {@link https://appsflyer.com AppsFlyer} device identifier
  */
  '$appsflyerId'?: KeyName

  /**
   * {@link https://developers.facebook.com/docs/apis-and-sdks/ Facebook SDK} anonymous identifier
  */
  '$fbAnonId'?: KeyName

  /**
   * {@link https://iterable.com/ Iterable} user identifier
  */
  '$iterableUserId'?: KeyName

  /**
   * {@link https://mixpanel.com Mixpanel} user identifier
  */
  '$mixpanelDistinctId'?: KeyName

  /**
   * {@link https://www.mparticle.com/ mParticle} user identifier
  */
  '$mparticleId'?: KeyName

  /**
   * {@link https://www.onesignal.com/ OneSignal} user identifier
  */
  '$onesignalId'?: KeyName

  /**
   * Braze 'alias_name' in {@link https://www.braze.com/docs/api/objects_filters/user_alias_object User Alias Object}
  */
  '$brazeAliasName'?: KeyName

  /**
   * Braze 'alias_label' in {@link https://www.braze.com/docs/api/objects_filters/user_alias_object User Alias Object}
  */

  /**
   * Iterable Data
  */
  '$brazeAliasLabel'?: KeyName
  /**
   * Iterable Data
  */
  '$iterableCampaignId'?: KeyName
  /**
   * Iterable Data
  */
  '$iterableTemplateId'?: KeyName

  /**
   * Attribution Data
  */
  '$campaign'?: KeyName

  /**
   * Attribution Data
  */
  '$adGroup'?: KeyName

  /**
   * Attribution Data
  */
  '$ad'?: KeyName

  /**
   * Attribution Data
  */
  '$keyword'?: KeyName

  /**
   * Attribution Data
  */
  '$creative'?: KeyName

  /**
   * Mapping of key names to subscriber attribute objects.
  */
  [key: string]: KeyName | undefined
}
export interface KeyName {
  /**
   * The value of the attribute.
   * If the value is null or an empty string, the attribute will be deleted.
  */
  value: string
  /**
   * UNIX epoch in milliseconds of when the attribute was updated.
   * This value is used to resolve conflicts, an attribute will
   * only be updated if the new updated_at_ms value is newer than
   * the value for the stored attribute.
  */
  updated_at_ms?: string
}
