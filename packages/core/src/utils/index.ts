export * from './section'
export * from './date-fns'

const hasSymbol
  = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol'

export const makeSymbol = (name: string): symbol | string => hasSymbol ? Symbol(name) : name
