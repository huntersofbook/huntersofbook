import { WatchOptions } from 'chokidar'

export function resolveChokidarOptions(
  options: WatchOptions | undefined,
): WatchOptions {
  const { ignored = [], ...otherOptions } = options ?? {}

  const resolvedWatchOptions: WatchOptions = {
    ignored: [
      '**/.git/**',
      '**/node_modules/**',
      '**/test-results/**', // Playwright
      ...(Array.isArray(ignored) ? ignored : [ignored]),
    ],
    depth: 1,
    ignoreInitial: true,
    ignorePermissionErrors: true,
    ...otherOptions,
  }

  return resolvedWatchOptions
}
