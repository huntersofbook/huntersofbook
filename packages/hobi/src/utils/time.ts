import { performance } from 'node:perf_hooks'

/**
 * Return the current timestamp in seconds, with sub-millisecond precision.
 */
export const current = (): number => {
  return performance.now() / 1000
}

export function measure(body: () => void): number {
  const start = current()
  body()
  return current() - start
}
