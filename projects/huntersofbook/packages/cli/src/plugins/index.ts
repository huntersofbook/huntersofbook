import type { Argv } from 'mri'

import type { HuntersofbookConfig, IWatch } from '../types'
import type { QuestionPlugin } from '../utils/questions'

export const _rDefault = (r: any) => r.default || r

export const plugins = {
  tsTOjs: () => import('./TStoJS.plugin').then(_rDefault),
  jsonCopy: () => import('./JsonCopy.plugin').then(_rDefault),
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
  middleware?: (configKey: string, config: HuntersofbookConfig) => Promise<Record<any, any>>
  packagesName?: string[]
}

export function definePluginCommand(command: HuntersofbookPluginCommand): HuntersofbookPluginCommand {
  return command
}
