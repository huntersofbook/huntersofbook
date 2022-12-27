<script setup lang="ts">
import type { InfiniteScrollStateType } from '@huntersofbook/vue-uikit'
const data = ref([1, 2, 3, 4, 5, 6])

function onLoadMore() {
  const length = data.value.length + 1
  data.value.push(...Array.from({ length: 5 }, (_, i) => length + i))
}
const state = ref<InfiniteScrollStateType>()
</script>

<template>
  <div>
    huntersofbook UI Kit
    <HInfiniteLoading
      :distance="10"
      :state="state" @infinite="onLoadMore"
    >
      <div class="flex flex-col gap-2 p-4 w-300px h-300px m-auto overflow-y-scroll bg-gray-500/5 rounded">
        <div v-for="item in data" :key="item" class="h-30 bg-gray-500/5 rounded p-3">
          {{ item }}
        </div>
      </div>
    </HInfiniteLoading>
  </div>
</template>

<style lang="postcss">
.html {
  @apply bg-gray-900;
}
</style>
