import { existsSync, readFileSync, writeFileSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import { globby } from 'globby'
import type { Context } from './context'

export async function writeFiles(ctx: Context, filepath: string, removeUnused = false) {
  const originalContent = existsSync(filepath) ? await readFile(filepath, 'utf-8') : ''

  writeOneCSSFile(ctx, ctx.options.cssFile, removeUnused)
  //   const originalImports = removeUnused ? undefined : parseDeclaration(originalContent)

  //   const code = getDeclaration(ctx, filepath, originalImports)
  //   if (!code)
  //     return

  //   if (code !== originalContent)
  // await writeFile(filepath, code, 'utf-8')
}

async function writeOneCSSFile(ctx: Context, fileName: string, removeUnused = false) {
  console.log('ctx.root', ctx.root)
  const files = await globby(['./src/component/**/*.css'], { absolute: true, cwd: ctx.root })
  const dd = files.map((file) => {
    return readFileSync(file, 'utf-8')
  })
  writeFileSync(`.huntersofbook/${fileName}/style.css`, dd.join('\n'))
}
