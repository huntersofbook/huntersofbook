import type { Argv } from 'mri'

export const _rDefault = (r: any) => r.default || r

export const commands = {
  dev: () => import('./dev').then(_rDefault),
}

export type Command = keyof typeof commands

export interface HuntersofbookCommandMeta {
  name: string
  usage: string
  description: string
  [key: string]: any
}

export type CLIInvokeResult = void | 'error' | 'wait'

export interface HuntersofbookCommand {
  invoke(args: Argv): Promise<CLIInvokeResult> | CLIInvokeResult
  meta: HuntersofbookCommandMeta
}

export function defineNuxtCommand(command: HuntersofbookCommand): HuntersofbookCommand {
  return command
}
