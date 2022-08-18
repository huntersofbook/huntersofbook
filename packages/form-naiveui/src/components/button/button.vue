<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useAttrs } from 'vue'

defineProps<{
  data: any
  options: any
}>()

const attrs = useAttrs() as any
</script>

<template>
  <NButton v-bind="attrs">
    {{ data }}
    <slot />
    <template v-for="child in options" #[child.slot] :key="child.meta.id">
      {{ child.meta.value }}
      <component :is="child.meta.render" />
    </template>
  </NButton>
</template>
