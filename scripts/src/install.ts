import fs from 'node:fs'

import consola from 'consola'
import { execaCommandSync } from 'execa'
import mri from 'mri'
import { resolve } from 'pathe'

const file = [
  {
    path: '../projects',
    dir: true,
  },
  {
    path: '../docs',
    dir: false,
  },
]

const _argv = process.argv.slice(2)
const args = mri(_argv, {
  boolean: [
    '-D',
    '-w',
  ],
  alias: {
    D: '-D',
    w: '-w',
  },
})
const packages = args._.join(' ')
const isDev = args.D || false
const isRoot = args.w || false


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

  const openFile = (file: string) => {
    fs.open(file, 'r', (err, fd) => {
      if (err) throw err
      console.log(fd)
    })
  }
  if (projects.length > 0) {
    projects.forEach((project: string) => {
      consola.log(`pnpm ${isRoot ? 'add' : 'install'} ${isDev ? '-D' : ''} ${isRoot ? '-w' : ''} ${packagesName}`)
      const data = execaCommandSync(`pnpm ${isRoot ? 'add' : 'install' } ${isDev ? '-D' : ''} ${isRoot ? '-w' : '' } ${packagesName}`, { cwd: project }).stdout.toString()
      consola.info(project, data)
    })
  }
}

installPackage(isDev, packages)
