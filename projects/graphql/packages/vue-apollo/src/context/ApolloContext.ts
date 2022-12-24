import type { ApolloClient } from '@apollo/client'
import { canUseSymbol } from '@apollo/client/utilities'
import { createElementVNode, h } from 'vue'
import type { VNode } from 'vue'
import type { RenderPromises } from '../ssr'

export interface ApolloContextValue {
  client?: ApolloClient<object>
  renderPromises?: RenderPromises
}

// To make sure Apollo Client doesn't create more than one React context
// (which can lead to problems like having an Apollo Client instance added
// in one context, then attempting to retrieve it from another different
// context), a single Apollo context is created and tracked in global state.
const contextKey = canUseSymbol
  ? Symbol.for('__APOLLO_CONTEXT__')
  : '__APOLLO_CONTEXT__'

export function getApolloContext(): VNode<ApolloContextValue> {
  let context = (h as any)[contextKey] as VNode<ApolloContextValue>
  if (!context) {
    Object.defineProperty(h, contextKey, {
      value: context = h<ApolloContextValue>({}),
      enumerable: false,
      writable: false,
      configurable: true,
    })
    context.key = 'ApolloContext'
  }
  return context
}

export { getApolloContext as resetApolloContext }
