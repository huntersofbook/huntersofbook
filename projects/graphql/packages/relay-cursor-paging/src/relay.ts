import { cursorToOffset } from 'graphql-relay'
import type { ResolveOffsetConnectionOptions } from './types.js'

const DEFAULT_MAX_SIZE = 100
const DEFAULT_SIZE = 20

export interface OffsetForArgsResult {
  /**
   * The offset to use for the query
  */
  offset: number
  /**
   * The limit to use for the query
  */
  limit: number
  /**
   * Whether there is a previous page
  */
  hasPreviousPage: boolean
  /**
   * The expected size of the result
   * This is the size of the result without the extra item
   * that is used to determine if there is a next page
  */
  expectedSize: number
  /**
   * Whether there is a next page
    * @param resultSize The size of the result
    * @returns Whether there is a next page
  */
  hasNextPage: (resultSize: number) => boolean
}

export function offsetForArgs(options: ResolveOffsetConnectionOptions): OffsetForArgsResult {
  const { before, after, first, last } = options.args

  const defaultSize = options.defaultSize ?? DEFAULT_SIZE
  const maxSize = options.maxSize ?? DEFAULT_MAX_SIZE
  const beforeOffset = before ? cursorToOffset(before) : Number.POSITIVE_INFINITY
  const afterOffset = after ? cursorToOffset(after) : 0

  if (first != null && first < 0)
    throw new TypeError('Argument "first" must be a non-negative integer')

  if (last != null && last < 0)
    throw new Error('Argument "last" must be a non-negative integer')

  let startOffset = after ? afterOffset + 1 : 0
  let endOffset = before ? Math.max(beforeOffset, startOffset) : Number.POSITIVE_INFINITY

  if (first != null)
    endOffset = Math.min(endOffset, startOffset + first)

  if (last != null) {
    if (endOffset === Number.POSITIVE_INFINITY)
      throw new Error('Argument "last" can only be used in combination with "before" or "first"')

    startOffset = Math.max(startOffset, endOffset - last)
  }

  const size = first == null && last == null ? defaultSize : endOffset - startOffset

  endOffset = Math.min(endOffset, startOffset + Math.min(size, maxSize))

  const totalSize = endOffset - startOffset

  return {
    offset: startOffset,
    limit: totalSize + 1,
    hasPreviousPage: startOffset > 0,
    expectedSize: totalSize,
    hasNextPage: (resultSize: number) => resultSize > totalSize,
  }
}

// export async function resolveOffsetConnection<T, U extends Promise<T[] | null> | T[] | null>(
//   options: ResolveOffsetConnectionOptions,
//   resolve: (params: { offset: number; limit: number }) => U & (MaybePromise<T[] | null> | null),
// ) {
//   const { limit, offset, expectedSize, hasPreviousPage, hasNextPage } = offsetForArgs(options)

//   const nodes = (await resolve({ offset, limit })) as T[] | null

//   if (!nodes)
//     return nodes as never

//   const edges = nodes.map((value, index) =>
//     value == null
//       ? null
//       : {
//           cursor: offsetToCursor(offset + index),
//           node: value,
//         },
//   )

//   const trimmed = edges.slice(0, expectedSize)

//   return {
//     edges: trimmed as never,
//     pageInfo: {
//       startCursor: offsetToCursor(offset),
//       endCursor: offsetToCursor(offset + trimmed.length - 1),
//       hasPreviousPage,
//       hasNextPage: hasNextPage(nodes.length),
//     },
//   }
// }
