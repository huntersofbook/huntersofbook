import fs from 'node:fs'

import consola from 'consola'
import { execaCommandSync } from 'execa'
import mri from 'mri'
import { resolve } from 'pathe'

const file = [
  {
    path: '../projects',
    dir: true,
  }
]

const _argv = process.argv.slice(2)
const args = mri(_argv)
const code = args._.join(' ')

const isDev = args.D || false

console.log(code, 'command', isDev, 'isDev')

const installPackage = async (isDev: false, packagesName: string) => {
  const projects: string[] = []
  
  const allProjects = file.forEach((f) => {
    const dir = resolve(f.path)

    if (f.dir) {
      fs.readdirSync(f.path).forEach((file) => {
        const pathFile = `${dir}/${file}`

        if (fs.lstatSync(pathFile).isDirectory())
          projects.push(pathFile)
      })
    }
    else {
      projects.push(dir)
    }
  })

  if (projects.length > 0) {
    projects.forEach((project: string) => {
      const data = execaCommandSync(`pnpm ${code}`, { cwd: project }).stdout.toString()
      consola.info(project, data)
    })
  }
}

installPackage(isDev, code)
