export interface PublicPluginAPI {
  /**
     * Resolves a component using the configured resolvers.
     */
  findComponent: (name: string, filename?: string) => Promise<FileInfo | undefined>
  /**
     * Obtain an import statement for a resolved component.
     */
  stringifyImport: (info: FileInfo) => string
}

/**
 * Plugin options.
 */
export interface Options {

  /**
  * Export files
  * @default language
  */
  exportDir?: string

  /**
   * Search for subdirectories
   * @default true
   */
  deep?: boolean

  /**
     * Relative paths to the directory to search for components.
     * @default '.i18n'
   */
  templateDir?: string

  /**
    * Valid file extensions for components.
    * @default ['json'] now only support json
    */
  extensions?: string | string[]

  /**
  * Glob patterns to match file names to be detected as components.
  *
  * When specified, the `dir` and `extensions` options will be ignored.
  */
  globs?: string | string[]

  /**
   * @param {string} inputFile
   * The input file to compile
   * @example 'en.json'
  */
  schema?: string

  /**
   * @param {string} inputFile
   * The input file to compile
   * @example ['tr', 'fr']
  */
  languages?: string[]

}

export interface FileResolverObject {
  type: 'file' | 'directive'
}

export interface ImportInfo {
  name: string
  from: string
}

export interface FileInfo extends ImportInfo {

}

export type ResolvedOptions = Omit<
    Required<Options>,
  | 'templateDir' | 'extensions'
> & {
  templateDir: string
  root: string
  resolvedDir: string
  extensions: string[]
  globs: string[]
  schema: string
}
