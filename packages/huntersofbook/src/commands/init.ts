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

    clear()
    const spinner = ora('Loading create huntersofbook.config.ts').start()
    // Resolve rootDir
    // const rootDir = resolve(args._[0] || '.')
    const a = debounce(() => fs.writeFileSync('huntersofbook.config.ts', code), 500)
    await a()
    spinner.succeed()
  },
})

