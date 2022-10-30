import { WatchOptions } from 'chokidar'
import { union } from 'lodash'
export function resolveChokidarOptions(
  options: WatchOptions | undefined,
): WatchOptions {
  const { ignored = [], ...otherOptions } = options ?? {}

  const resolvedWatchOptions: WatchOptions = {
    ignored: union([
      '**/.git/**',
      '**/node_modules/**',
    ], (Array.isArray(ignored) ? ignored : [ignored])),
    depth: 1,
    ignoreInitial: true,
    ignorePermissionErrors: true,
    ...otherOptions,
  }

  return resolvedWatchOptions
}
