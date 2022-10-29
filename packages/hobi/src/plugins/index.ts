import type { Argv } from 'mri'

export const _rDefault = (r: any) => r.default || r

export const commands = {
  dev: () => import('./TStoJS.plugin').then(_rDefault),
}

export type Command = keyof typeof commands

export interface HuntersofbookPluginCommandMeta {
  name: string
  usage: string
  description: string
  [key: string]: any
}

export type PluginInvokeResult = void | 'error' | 'wait'

export interface HuntersofbookPluginCommand {
  invoke(args: Argv): Promise<PluginInvokeResult> | PluginInvokeResult
  meta: HuntersofbookPluginCommandMeta
}

export function definePluginCommand(command: HuntersofbookPluginCommand): HuntersofbookPluginCommand {
  return command
}
