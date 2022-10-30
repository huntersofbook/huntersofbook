export interface IWatch {
  event: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir'
  file: string
}
