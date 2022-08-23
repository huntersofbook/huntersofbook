import { createHuntersofbook } from 'huntersofbook'
import { type UserModule } from '~/types'

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = ({ isClient, initialState, app }) => {
  const huntersofbook = createHuntersofbook()
  app.use(huntersofbook)
}
