import { setup } from '@css-render/vue3-ssr'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const { collect } = setup(nuxtApp.vueApp)

  nuxtApp.hook('app:mounted', () => {
    const meta = document.createElement('meta')
    meta.name = 'naive-ui-style'
    document.head.appendChild(meta)
  })

  if (process.server) {
    nuxtApp.hook('app:rendered', ({ ssrContext }) => {
      if (!ssrContext)
        return
      const originalRenderMeta = ssrContext.renderMeta
      ssrContext.renderMeta = () => {
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
})
