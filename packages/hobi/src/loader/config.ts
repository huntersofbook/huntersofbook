import { LoadConfigOptions, loadConfig } from 'c12'
import { resolve } from 'pathe'
import { applyDefaults } from 'untyped'

import { HuntersofbookConfig, HuntersofbookConfigSchema } from '../types'

export interface LoadHuntersofbookConfigOptions extends LoadConfigOptions<HuntersofbookConfig> { }

export async function loadHuntersofbookConfig(opts: LoadHuntersofbookConfigOptions): Promise<HuntersofbookConfig> {
  const result = await loadConfig<HuntersofbookConfig>({
    name: 'huntersofbook',
    configFile: 'huntersofbook.config',
    rcFile: '.huntersofbookrc',
    dotenv: true,
    globalRc: true,
    ...opts,
  })
  const { configFile, layers = [], cwd } = result
  const huntersofbookConfig = result.config!

  // Fill config
  huntersofbookConfig.rootDir = huntersofbookConfig.rootDir || cwd
  huntersofbookConfig._huntersofbookConfigFile = configFile
  huntersofbookConfig._huntersofbookConfigFiles = [configFile]

  // Resolve `rootDir` & `srcDir` of layers
  for (const layer of layers) {
    layer.config = layer.config || {
      blockedWatch: {
        files: [],
      },
    }
    layer.config.rootDir = layer.config.rootDir ?? layer.cwd
    layer.config.srcDir = resolve(layer.config.rootDir!, layer.config.srcDir!)
  }

  // Filter layers
  huntersofbookConfig._layers = layers.filter(layer => layer.configFile && !layer.configFile.endsWith('.huntersofbookrc'))

  // Ensure at least one layer remains (without nuxt.config)
  if (!huntersofbookConfig._layers.length) {
    huntersofbookConfig._layers.push({
      cwd,
      config: {
        rootDir: cwd,
        srcDir: cwd,
      },
    })
  }

  // Resolve and apply defaults
  return await applyDefaults(HuntersofbookConfigSchema, huntersofbookConfig) as HuntersofbookConfig
}
