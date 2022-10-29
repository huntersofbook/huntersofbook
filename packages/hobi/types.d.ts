
declare global {
    const defineHuntersofbookConfig: typeof import('hobi/config')['defineHuntersofbookConfig']
}

import { HuntersofbookConfig as Config } from './src/types/config'

declare module 'hobi' {
    interface HuntersofbookConfig extends Config {
    }
}