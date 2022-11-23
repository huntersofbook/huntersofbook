import { setup } from '@css-render/vue3-ssr'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { collect } = setup(nuxtApp.vueApp)
  if (process.client) {
    nuxtApp.hook('app:rendered', ({ ssrContext }) => {
      const originalRenderMeta = ssrContext.renderMeta
      nuxtApp.ssrContext.renderMeta = () => {
        if (!originalRenderMeta) {
          return {
            headTags: collect(),
          }
        }
        const originalMeta = originalRenderMeta()
        if ('then' in originalMeta) {
          return originalMeta.then((resolvedOriginalMeta) => {
            return {
              ...resolvedOriginalMeta,
              headTags: resolvedOriginalMeta.headTags + collect(),
            }
          })
        }
        else {
          return {
            ...originalMeta,
            headTags: originalMeta.headTags + collect(),
          }
        }
      }
    })
  }
  nuxtApp.hook('app:beforeMount', () => {
    const meta = document.createElement('meta')
    meta.name = 'naive-ui-style'
    document.head.appendChild(meta)
  })
})
