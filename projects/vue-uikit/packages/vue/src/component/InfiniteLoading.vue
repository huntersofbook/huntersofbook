<script setup lang="ts">
import { computed, onMounted, ref, toRefs, watch } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'
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

type InfiniteScrollStateType = 'LOADING' | 'LOADED' | 'COMPLETED' | 'ERROR'

const el = ref<HTMLElement>(null)

function executeInfiniteScroll() {
  if (typeof props.onInfinite === 'function')
    props.onInfinite()
}

onMounted(() => executeInfiniteScroll())

useInfiniteScroll(
  el,
  () => {
    executeInfiniteScroll()
  },
  {
    distance: props.distance || 20,
    direction: 'bottom',
  },
)
</script>

<template>
  <div ref="el">
    <slot />
  </div>
</template>
