<script setup lang="ts">
import { HInfiniteLoading } from '@huntersofbook/vue-uikit'
import { ref } from 'vue'
const data = ref([1, 2, 3, 4, 5, 6])

function onLoadMore() {
  const length = data.value.length + 1
  data.value.push(...Array.from({ length: 5 }, (_, i) => length + i))
}
</script>

<template>
  <div>
    asd
    <HInfiniteLoading :distance="20" @infinite="onLoadMore">
      <div v-for="item in data" :key="item" class="h-30 bg-gray-500/5 rounded p-3">
        {{ item }}
      </div>
    </HInfiniteLoading>
  </div>
</template>

