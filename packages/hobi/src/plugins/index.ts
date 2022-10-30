import type { Argv } from 'mri'

import { HuntersofbookConfig, IWatch } from '../types'
import { QuestionPlugin } from '../utils/questions'

export const _rDefault = (r: any) => r.default || r

export const plugins = {
  tsTOjs: (): Promise<HuntersofbookPluginCommand> => import('./TStoJS.plugin').then(_rDefault),
}

export type PluginCommand = keyof typeof plugins

export interface HuntersofbookPluginCommandMeta {
  name: string
  usage: string
  description: string
  questions?: QuestionPlugin[]
  [key: string]: any
}

export interface PluginInvokeResult {
  status: void | 'error' | 'wait'
  message: string
  data?: any
  ignored?: string[]
}

export interface HuntersofbookPluginCommand {
  meta: HuntersofbookPluginCommandMeta
  invoke(
    args: Argv,
    config: HuntersofbookConfig,
    watch?: IWatch): Promise<PluginInvokeResult> | PluginInvokeResult
  watch?: {
    ignored: string[]
  }
}

export function definePluginCommand(command: HuntersofbookPluginCommand): HuntersofbookPluginCommand {
  return command
}
