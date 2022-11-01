import consola from 'consola'
import mri from 'mri'

import { Command, HuntersofbookCommand, commands } from './commands'
import { showBanner } from './utils/banner'
import { showHelp } from './utils/help'

async function _main() {
  showBanner(true)
  const _argv = process.argv.slice(2)
  const args = mri(_argv, {
    boolean: [
      'no-clear',
    ],
  })

  const command = args._.shift() || 'usage'
  consola.info('cli', command)

  const cmd = await commands[command as Command]() as HuntersofbookCommand
  if (args.h || args.help) {
    showHelp(cmd.meta)
  }
  else {
    const result = await cmd.invoke(args)
    return result
  }
}

export function main() {
  _main()
    .then((result) => {
      if (result === 'error')
        process.exit(1)

      else if (result !== 'wait')
        process.exit(0)
    })
    .catch((error) => {
      consola.error(error)
      process.exit(1)
    })
}
