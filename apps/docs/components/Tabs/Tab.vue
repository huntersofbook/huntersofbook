<script setup lang="ts">
import { inject } from 'vue'

const props = defineProps({
  name: String,
  text: String,
  maxHeight: Number
})
const activeTab = inject<string>('activeTab')
</script>

<template>
  <div
    v-show="activeTab === name"
    class="tab__content"
    :style="{ maxHeight: `${maxHeight}px` }"
  >
    <slot />
  </div>
</template>

<style>
.vp-doc .tab__content [class*='language-'] {
  margin-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin-left: 0;
}
.tab__content {
  overflow-y: auto;
  overflow-x: visible;
}
</style>
