<script setup lang="ts">
import { useField } from 'vee-validate'
import type { InputHTMLAttributes } from 'vue'
import { useAttrs } from 'vue'

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
})

const attrs: InputHTMLAttributes = useAttrs()
const { value: selectedValue, errorMessage } = useField<boolean>(
  attrs.name as string,
  {},
  {
    type: 'checkbox',
    initialValue: props.value,
    checkedValue: true,
    uncheckedValue: false,
  },
)
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div class="flex flex-col">
    <div class="relative mt-1 flex items-center">
      <input
        v-bind="$attrs"
        v-model="selectedValue"
        type="checkbox"
        :class="[
          {
            'bg-gray-200': !errorMessage,
            'bg-red-100': errorMessage,
          },
        ]"
        class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
        :aria-invalid="errorMessage ? true : false"
      >
      <label
        v-if="label"
        :for="$attrs.id as string"
        class="ml-2 block text-sm text-gray-900 dark:text-gray-200"
      >{{ label }}
      </label>
    </div>
    <p v-show="errorMessage" class="mt-2 text-sm text-red-600">
      {{ errorMessage }}
    </p>
  </div>
</template>
