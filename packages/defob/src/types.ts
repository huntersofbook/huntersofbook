export type Input = Record<string | number | symbol, any>

export interface Merger {
  schema: Input
  newData: Input
}
