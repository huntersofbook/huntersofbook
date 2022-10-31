
declare global {
    const defineHuntersofbookConfig: typeof import('huntersofbook/config')['defineHuntersofbookConfig']
}

import { HuntersofbookConfig as Config } from './src/types/config'

declare module 'huntersofbook' {
    interface HuntersofbookConfig extends Config {
    }
}