import { WatchOptions } from 'fs'

import { CompileFileConfig } from '../plugins/TStoJS.plugin'
export interface HuntersofbookConfig {
  tsTOjs?: CompileFileConfig[]
  blockedWatch?: {
    files: string[]
    options?: WatchOptions
  }
  [key: string]: any
}
