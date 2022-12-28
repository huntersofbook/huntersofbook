import { copyFile } from 'fs/promises'

async function run() {
  // copy file dist
  await copyFile('./tailwindPlugin.d.ts', './dist/tailwindPlugin.d.ts')
}

run()
