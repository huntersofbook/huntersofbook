import { performance } from 'node:perf_hooks'

import consola from 'consola'
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

export async function voidTimer(body: (startTime: number) => Promise<void>, finish = false): Promise<void> {
  const startTime = current()
  const data = await body(startTime)
  if (finish) {
    const elapsed = current() - startTime
    consola.success(`Finish ~ ${` ${elapsed.toFixed(3)} s`}`)
  }
  return data
}

export const finishTime = (startTime: number, fixed = true) => {
  const elapsed = current() - startTime
  if (fixed)
    return elapsed.toFixed(3)
  else
    return elapsed
}
