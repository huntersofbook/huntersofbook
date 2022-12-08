export type MaybePromise<T> = Promise<T> | T

export interface DefaultConnectionArguments {
  first?: number | null | undefined
  last?: number | null | undefined
  before?: string | null | undefined
  after?: string | null | undefined
}

export interface ResolveOffsetConnectionOptions {
  args: DefaultConnectionArguments
  defaultSize?: number
  maxSize?: number
}

export interface ResolveCursorConnectionOptions<T> {
  args: DefaultConnectionArguments
  defaultSize?: number
  maxSize?: number
  toCursor: (value: T, nodes: T[]) => string
}

export interface ResolveCursorConnectionArgs {
  before?: string
  after?: string
  limit: number
  inverted: boolean
}
