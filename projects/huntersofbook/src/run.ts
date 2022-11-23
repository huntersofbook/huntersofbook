import mri from 'mri'

import type { Command, HuntersofbookCommand } from './commands'
import { commands } from './commands'

export async function runCommand(command: string, argv = process.argv.slice(2)) {
  console.log('runCommand', command, argv)
  const args = mri(argv)
  args.clear = false // used by dev
  const cmd = await commands[command as Command]() as HuntersofbookCommand
  if (!cmd)
    throw new Error(`Invalid command ${command}`)

  await cmd.invoke(args)
}
