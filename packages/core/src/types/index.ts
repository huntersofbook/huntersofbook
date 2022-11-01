import type { App, Plugin } from 'vue'

export type { FormData, IForm, IFormProps, InputSchema } from './form'

type PluginInstallFn<ARGS = []> = (app: App, ...options: ARGS[]) => void

/** Huntersofbook internal plugin */
export type HuntersofbookPlugin = {
  install: PluginInstallFn<[]>
} & Plugin

export type HuntersofbookPluginFabric<O extends any[] = []> = (
  ...args: O
) => HuntersofbookPlugin

// eslint-disable-next-line antfu/generic-spacing
export const defineHuntersofbookPlugin = <O extends any[]>(
  fabric: HuntersofbookPluginFabric<O>,
) => fabric
