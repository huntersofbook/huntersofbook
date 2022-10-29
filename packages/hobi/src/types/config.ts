import { WatchOptions } from 'fs'

import { CompileFileConfig } from '../plugins/TStoJS.plugin'
export interface HuntersofbookConfig {
  deneme?: string
  tsTOjs?: CompileFileConfig[]
  blockedWatch: {
    files: string[]
    options?: WatchOptions
  }
  [key: string]: any
}
