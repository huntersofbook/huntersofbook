import { readdirSync } from 'node:fs'
import { join } from 'node:path'

export const getCSSFilesFromDir = (dir: string) =>
  readdirSync(dir)
    .filter(file => file.endsWith('css'))
    .map(file => join(dir, file))
