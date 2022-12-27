<script setup lang="ts">
import { computed, defineComponent, ref, useAttrs, watch } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'
import { pick } from 'filter-anything'

const props = defineProps<{
  /**
 * The minimum distance between the bottom of the element and the bottom of the viewport
 *
 * @default 20
 */
  distance?: number
  state?: InfiniteScrollStateType
  onInfinite?: Function
}>()

defineOptions({
  inheritAttrs: false,
})

type InfiniteScrollStateType = 'LOADING' | 'LOADED' | 'COMPLETED' | 'ERROR'

const el = ref<HTMLElement>()

async function executeInfiniteScroll() {
  if (typeof props.onInfinite === 'function')
    await props.onInfinite()
}

useInfiniteScroll(
  el,
  async () => {
    await executeInfiniteScroll()
  },
  {
    distance: props.distance || 20,
    direction: 'bottom',
  },
)
const attrs = useAttrs()
const attrsWithoutSrc = computed(() => {
  return pick(attrs, ['class'])
})
</script>

<template>
  <div ref="el" v-bind="attrsWithoutSrc">
    <slot />
  </div>
</template>
