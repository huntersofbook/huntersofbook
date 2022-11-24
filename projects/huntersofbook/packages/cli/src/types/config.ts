import type { WatchOptions } from 'fs'

import type { JSONCopyConfig } from '../plugins/JsonCopy.plugin'
import type { CompileFileConfig } from '../plugins/TStoJS.plugin'

export interface HuntersofbookConfig {
  tsTOjs?: CompileFileConfig[]
  jsonCopy?: JSONCopyConfig
  blockedWatch?: {
    files: string[]
    options?: WatchOptions
  }
  [key: string]: any
}
