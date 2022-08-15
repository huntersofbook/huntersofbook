<script setup lang="ts">
import { NInput } from 'naive-ui'
import type { InputProps } from 'naive-ui'
import { useField } from 'vee-validate'
import { InputHTMLAttributes, useAttrs } from 'vue'
interface IInput extends Partial<InputProps> {
  value?: string
  label: string
}
const props = withDefaults(defineProps<IInput>(), {
  value: '',
  label: '',
})

const attrs: InputHTMLAttributes = useAttrs()
const {
  value: inputValue,
  handleChange,
  handleBlur,
  errorMessage,
} = useField<string>(attrs.name as string, undefined, {
  initialValue: props.value,
  validateOnValueUpdate: false,
})
const validationListeners = {
  blur: handleBlur,
  change: handleChange,
  input: (e: boolean) => handleChange(e, !!errorMessage.value),
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <label
    v-if="label"
    :for="$attrs.id as string"
    class="block text-sm font-medium text-gray-900 dark:text-gray-200"
  >{{ label }}
  </label>
  <div class="relative mt-1 rounded-md shadow-sm">
    <NInput
      v-bind="$attrs"
      :status="errorMessage ? 'error' : 'success'"
      :value="inputValue"
      :aria-invalid="errorMessage ? true : false"
      show-password-on="click"
      size="medium"
      v-on="validationListeners"
    >
      <template #password-visible-icon>
        <div class="i-ic-round-lock-open" />
        <!-- <n-icon :size="16" :component="GlassesOutline" /> -->
      </template>
      <template #password-invisible-icon>
        <div class="i-ic-round-lock" />
        <!-- <n-icon :size="16" :component="Glasses" /> -->
      </template>
    </NInput>
  </div>
  <p v-show="errorMessage" class="mt-2 text-sm text-red-600">
    {{ errorMessage }}
  </p>
</template>
