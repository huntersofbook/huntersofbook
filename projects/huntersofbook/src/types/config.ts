import { WatchOptions } from 'fs'

import { JSONCopyConfig } from '../plugins/JsonCopy.plugin'
import { CompileFileConfig } from '../plugins/TStoJS.plugin'

export interface HuntersofbookConfig {
  tsTOjs?: CompileFileConfig[]
  jsonCopy?: JSONCopyConfig
  blockedWatch?: {
    files: string[]
    options?: WatchOptions
  }
  [key: string]: any
}
