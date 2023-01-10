import { mkdir, mkdirSync, writeFile, writeFileSync } from 'node:fs'
import { globbySync } from 'globby'
import Debug from 'debug'
import type { Context } from '../context'

const debug = Debug('unplugin-i18n-watch:glob')

export function searchI18nFiles(ctx: Context) {
  debug(`started with: [${ctx.options.globs.join(', ')}]`)
  const root = ctx.root

  const files = globbySync(ctx.options.globs, {
    ignore: ['node_modules'],
    onlyFiles: true,
    cwd: root,
    absolute: true,
  })

  if (!files.length) {
    // create dic
    // create file
    mkdirSync(`${root}/${ctx.options.dir}`, { recursive: true })
    const template = `{
  "huntersofbook": "read a book",
  "hello": "hello"
}
`
    writeFileSync(`${root}/${
      ctx.options.dir
    }/template.json`, template)
  }

  if (!files.length)
    console.warn('[unplugin-i18n-watc] no components found')

  debug(`${files.length} components found.`)

  ctx.addFiles(files)
}

// import { existsSync, mkdirSync, writeFileSync } from 'fs'
// import {dirname} from 'pathe'
// import type { Context } from '../context'

// export async function searchCSSFile(ctx: Context) {
//   const cwdDir = `${ctx.root}/${ctx.options.dir}`
//   const export =
//   console.log(cwdDir, 'a')
//   const schema = ctx.options.schema

//   // const isPackageCheck = existsSync(`${root}/node_modules/@huntersofbook/unplugin-i18n-watch/schemaEN.json`)
//   // if (!isPackageCheck)
//   //   throw new Error('node_modules/@huntersofbook/unplugin-i18n-watch/schemaEN.json not found')

//   const exists = existsSync(cwdDir)
//   if (!exists)
//     mkdirSync(cwdDir)

//   // Project in get all files huntersofbook
//   const isSchema = existsSync(schema)
//   if (!isSchema) {
//     const addHeader = `{
//     "hello": "world",
//     "huntersofbook": "read a book"
// }
// `
//     writeFileSync(`${schema}`, addHeader)
//     const languages = ctx.options.languages
//     languages.forEach((file) => {
//       console.log(file)
//       const writePath = `${cwdDir}/${file}.json`
//       writeFileSync(writePath, addHeader)
//     })
//   }
// }
