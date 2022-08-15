<script setup lang="ts">
import { NSelect } from 'naive-ui'
import type { SelectProps } from 'naive-ui'
import { useField } from 'vee-validate'
import { InputHTMLAttributes, useAttrs } from 'vue'
interface IInput extends Partial<SelectProps> {
  id: string
  value?: string
  label: string
  options: any[]
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
    <NSelect v-bind="$attrs" v-model:value="inputValue" size="medium" :status="errorMessage ? 'error' : 'success'" :options="options[0].meta.options" v-on="validationListeners" />
  </div>
  <p v-show="errorMessage" class="mt-2 text-sm text-red-600">
    {{ errorMessage }}
  </p>
</template>
