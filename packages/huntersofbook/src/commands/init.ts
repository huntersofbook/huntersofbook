import fs from 'node:fs'
import { resolve } from 'path'

import clear from 'clear'
import consola from 'consola'

import { defineHuntersofbookCommand } from '.'

export default defineHuntersofbookCommand({
  meta: {
    name: 'init',
    description: 'Init settings',
    usage: 'init',
  },
  async invoke(args) {
    //   for (let i = 0; i < 1000; i++) {
    //     imports += `import { Comp${i} } from './components/comp${i}.jsx'\n`
    //     renderCode += `<Comp${i}/>\n`
    //     fs.writeFileSync(
    //       `src/components/comp${i}.jsx`,
    //       `export function Comp${i}() {
    //   return <div>hello ${i}</div>
    // }`,
    //     )
    //   }

    const code = `
import { defineHuntersofbookConfig } from 'huntersofbook/config'

export default defineHuntersofbookConfig({

})
`

    // Resolve rootDir
    // const rootDir = resolve(args._[0] || '.')
    clear()
    consola.info('Init Huntersofbook')
    fs.writeFileSync('huntersofbook.config.ts', code)
    consola.success('Created huntersofbook.config.ts')
  },
})

