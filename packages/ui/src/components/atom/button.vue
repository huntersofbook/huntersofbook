<script setup lang="ts">
import { NButton } from 'naive-ui'
import type { ButtonProps } from 'naive-ui'

interface IButton extends Partial<ButtonProps> {

}
withDefaults(defineProps<IButton>(), {

})
</script>

<template>
  <NButton v-bind="$attrs">
    <slot />
  </NButton>
</template>
