<script setup lang="ts">
import { NInput } from 'naive-ui'
import type { InputProps } from 'naive-ui'
import { useField } from 'vee-validate'

import { computed, defineComponent, unref, useAttrs } from 'vue'

interface Props extends InputProps {
  data?: any
  options?: any
  footer?: any
}
const props = defineProps<Props>()

const attrs = useAttrs() as any

const {
  value: inputValue,
  handleChange,
  handleBlur,
  errorMessage,
} = useField<string>(attrs.name as string, undefined, {
  initialValue: attrs.init ? attrs.init : undefined,
  validateOnValueUpdate: false,
})

const validationListeners = {
  'on-blur': handleBlur,
  'on-update:value': handleChange,
  'on-input': (e: boolean) => handleChange(e, !!errorMessage.value),
}

const getBindValue = computed(() => ({ ...unref(attrs), ...props, ...validationListeners }))
</script>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
})
</script>

<template>
  <label
    v-if="attrs.label && !attrs.hideLabel"
    :for="$attrs.id as string"
    class="block text-sm font-medium text-gray-900 dark:text-gray-200"
  >{{ attrs.label }}
  </label>
  <NInput
    v-bind="getBindValue"
    :status="errorMessage ? 'error' : 'success'"
    :value="inputValue"
    :aria-invalid="errorMessage ? true : false"
  >
    <template v-for="child in options" #[child.slot] :key="child.meta.id">
      {{ child.meta.value }}
      <component :is="child.meta.render" />
    </template>
  </NInput>

  <component :is="footer.render" v-if="footer.render" />

  <p v-if="footer.text">
    {{ footer.text }}
  </p>

  <p v-show="errorMessage" class="mt-2 text-sm text-red-600">
    {{ errorMessage }}
  </p>
</template>
