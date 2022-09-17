<script setup lang="ts">
import { NButton } from 'naive-ui'
import type { ButtonProps } from 'naive-ui'
import { computed, defineComponent, unref, useAttrs } from 'vue'

interface Props extends ButtonProps {
  data?: any
  options?: any
}
const props = defineProps<Props>()

const attrs = useAttrs() as any

const getBindValue = computed(() => ({ ...unref(attrs), ...props }))
</script>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false
})
</script>

<template>
  <NButton v-bind="getBindValue">
    {{ data }}
    <slot />
    <template v-for="child in options" #[child.slot] :key="child.meta.id">
      {{ child.meta.value }}
      <component :is="child.meta.render" />
    </template>
  </NButton>
</template>
