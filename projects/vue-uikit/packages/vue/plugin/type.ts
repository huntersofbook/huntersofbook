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
     * RegExp or glob to match files to be transformed
     */
  include?: string

  /**
   * Valid file extensions for components.
   * @default ['vue']
   */

  extensions?: string[] | string

  /**
   * Glob patterns to match file names to be detected as components.
   *
   * When specified, the `dirs` and `extensions` options will be ignored.
   */
  globs?: string | string[]

  /**
   * Search for subdirectories
   * @default true
   */
  deep?: boolean

  /**
     * RegExp or glob to match files to NOT be transformed
     */
  exclude?: string

  /**
     * Relative paths to the directory to search for components.
     * @default 'src/components'
     */
  dirs?: string | string[]

  importPathTransform?: (path: string) => string | undefined

  /**
     * Vue version of project. It will detect automatically if not specified.
     */
  version?: 3

  /**
    * @default 'style.css'
   */
  cssFile?: string
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
    'resolvers' | 'extensions' | 'dirs' | 'globalComponentsDeclaration'
> & {
  extensions: string[]
  dirs: string[]
  resolvedDirs: string[]
  globs: string[]
  dts: string | false
  cssFile: string
  root: string
}
