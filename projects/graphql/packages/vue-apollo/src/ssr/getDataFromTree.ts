import type { VNode } from 'vue'
import { h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { useApolloClient } from '../composable/useApolloClient'
import { RenderPromises } from './RenderPromises'

export function getDataFromTree(
  tree: VNode,
  context: { [key: string]: any } = {},
) {
  return getMarkupFromTree({
    tree,
    context,
    // If you need to configure this renderFunction, call getMarkupFromTree
    // directly instead of getDataFromTree.
    renderFunction: renderToString,
  })
}

export interface GetMarkupFromTreeOptions {
  tree: VNode
  context?: { [key: string]: any }
  renderFunction?: (
    tree: VNode,
  ) => string | PromiseLike<string>
}

export function getMarkupFromTree({
  tree,
  context = {},
  // The rendering function is configurable! We use renderToStaticMarkup as
  // the default, because it's a little less expensive than renderToString,
  // and legacy usage of getDataFromTree ignores the return value anyway.
  renderFunction = renderToString,
}: GetMarkupFromTreeOptions): Promise<string> {
  const renderPromises = new RenderPromises()

  async function process(): Promise<string> {
    // Always re-render from the rootElement, even though it might seem
    // better to render the children of the component responsible for the
    // promise, because it is not possible to reconstruct the full context
    // of the original rendering (including all unknown context provider
    // elements) for a subtree of the original component tree.
    const { resolveClient } = useApolloClient()
    const client = resolveClient()

    try {
      const html = await new Promise<string>((resolve) => {
        const element = h(
          client,
          { value: { ...context, renderPromises } },
          tree)
        resolve(renderFunction(element))
      })
      return renderPromises.hasPromises()
        ? renderPromises.consumeAndAwaitPromises().then(process)
        : html
    }
    finally {
      renderPromises.stop()
    }
  }

  return Promise.resolve().then(process)
}
