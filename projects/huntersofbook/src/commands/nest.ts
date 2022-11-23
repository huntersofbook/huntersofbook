import fs from 'node:fs'

import clear from 'clear'
import ora from 'ora'
import { debounce } from 'perfect-debounce'

import { defineHuntersofbookCommand } from '.'

export default defineHuntersofbookCommand({
  meta: {
    name: 'init',
    description: 'Init settings',
    usage: 'init',
  },
  async invoke(_args) {
    const code = `
import { defineHuntersofbookConfig } from 'huntersofbook/config'

export default defineHuntersofbookConfig({

})
`

    clear()
    const spinner = ora('Loading create huntersofbook.config.ts').start()
    // Resolve rootDir
    // const rootDir = resolve(args._[0] || '.')
    const a = debounce(() => fs.writeFileSync('huntersofbook.config.ts', code), 500)
    await a()
    spinner.succeed()
  },
})

