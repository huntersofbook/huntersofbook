import { renderToString } from 'vue/server-renderer'
import type { VNode } from 'vue'
import { getMarkupFromTree } from './getDataFromTree'

export function renderToStringWithData(
  component: VNode<any>,
): Promise<string> {
  return getMarkupFromTree({
    tree: component,
    renderFunction: renderToString,
  })
}
