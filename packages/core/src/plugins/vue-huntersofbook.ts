import type { Locale } from 'date-fns'
import { ComputedRef } from 'vue'
/**
 *  VueI18n legacy interfaces
 *
 *  @remarks
 *  This interface is compatible with interface of `VueI18n` class (offered with Vue I18n v8.x).
 *
 *  @VueI18nLegacy
 */
export interface VueIhuntersofbook {
  /**
  * @remarks
  * Instance ID.
  */
  id: number
  /**
  * @remarks
  * The current locale this VueI18n instance is using.
  *
  * If the locale contains a territory and a dialect, this locale contains an implicit fallback.
  *
  * @VueIhuntersofbookSee [Scope and Locale Changing](../guide/essentials/scope)
  */
  // locale: Locales
  dateLocale: ComputedRef<Locale>

}
