import { readFileSync } from 'node:fs'
import postcss from 'postcss'
import postcssJs from 'postcss-js'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
// @ts-expect-error
import nesting from 'tailwindcss/nesting'

export const parseCSSFiles = (files: string[]) => {
  return files.map((file) => {
    const contents = readFileSync(file, { encoding: 'utf8' })
    console.log(contents)
    const root = postcss.parse(contents)

    const cssInJS = postcssJs.sync([
      nesting,
      tailwind({ content: [{ raw: '' }] }),
      autoprefixer,
    ])(root)

    return cssInJS
  })
}

