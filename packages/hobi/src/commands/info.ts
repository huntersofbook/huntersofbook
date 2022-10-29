import { resolve } from 'path'

import jiti from 'jiti'

import { defineNuxtCommand } from '.'

export default defineNuxtCommand({
  meta: {
    name: 'info',
    description: 'Show information about the current project',
    usage: 'info',
  },
  async invoke(args) {
    // Resolve rootDir
    const rootDir = resolve(args._[0] || '.')

    // Load nuxt.config
    const nuxtConfig = getHuntersofbookConfig(rootDir)
    console.log(nuxtConfig)
  },
})

function getHuntersofbookConfig(rootDir: string) {
  try {
    (globalThis as any).defineHuntersofbookConfig = (c: any) => c
    const result = jiti(rootDir, { interopDefault: true, esmResolve: true })('./nuxt.config')
    delete (globalThis as any).defineHuntersofbookConfig
    return result
  }
  catch (err) {
    // TODO: Show error as warning if it is not 404
    return {}
  }
}
