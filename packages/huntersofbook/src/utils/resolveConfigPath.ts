import fs from 'fs'
import path from 'path'

// function isObject(value: string) {
//   return typeof value === 'object' && value !== null
// }

// function isEmpty(obj: {}) {
//   return Object.keys(obj).length === 0
// }

function isString(value: any) {
  return typeof value === 'string' || value instanceof String
}

export default function resolveConfigPath(pathOrConfig: string) {
  if (isString(pathOrConfig))
    return path.resolve(pathOrConfig)

  for (const configFile of ['./huntersofbook.config.ts', './huntersofbook.config.cjs']) {
    try {
      const configPath = path.resolve(configFile)
      fs.accessSync(configPath)
      return configPath
    }
    catch (err) { }
  }

  return null
}
