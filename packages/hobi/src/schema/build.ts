import defu from 'defu'
import { join } from 'pathe'
import { isCI, isTest } from 'std-env'
import { normalizeURL, withTrailingSlash } from 'ufo'

export default {
  /**
     * The builder to use for bundling the Vue part of your application.
     *
     * @type {'vite' | 'webpack' | { bundle: (nuxt: typeof import('../src/types/nuxt').Nuxt) => Promise<void> }}
     */
  builder: 'vite',

}
