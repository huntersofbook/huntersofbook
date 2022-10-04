import type { Locale } from 'date-fns'
import { ComputedRef } from 'vue'
/**
 *  VueIhuntersofbook
 */
export interface VueIhuntersofbook {
  /**
   */
  id: number
  /**
   * date-fns locale
   */
  dateLocale: ComputedRef<Locale>
}
