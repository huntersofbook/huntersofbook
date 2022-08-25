export const extractFileNameFromPath = (path:any) => path.split('/').at(-1).split('.')[0]

export const extractFileNameFromGlobImport = (demos: any) => {
  const names = []
  for (const path in demos) names.push(extractFileNameFromPath(path))

  return names
}