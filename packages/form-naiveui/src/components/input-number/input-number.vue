<script setup lang="ts">
import { NInputNumber } from 'naive-ui'
import { useField } from 'vee-validate'
import { useAttrs } from 'vue'

const attrs = useAttrs() as any

const {
  value: inputValue,
  handleChange,
  handleBlur,
  errorMessage,
} = useField<number | undefined>(attrs.name as string, undefined, {
  initialValue: attrs.init ? attrs.init as number : undefined,
  validateOnValueUpdate: false,
})

const validationListeners = {
  'on-blur': handleBlur,
  'on-update:value': handleChange,
  'on-value': (e: boolean) => handleChange(e, !!errorMessage.value),
}

const bind = {
  ...attrs,
  ...validationListeners,
}
</script>

<template>
  <label
    v-if="attrs.label"
    :for="attrs.id as string"
    class="block text-sm font-medium text-gray-900 dark:text-gray-200"
  >{{ attrs.label }}
  </label>
  <div class="relative mt-1 rounded-md shadow-sm">
    <NInputNumber
      v-bind="bind"
      :status="errorMessage ? 'error' : 'success'"
      :aria-invalid="errorMessage ? true : false"
      :value="inputValue"
    >
      <template v-for="child in attrs.options" #[child.slot] :key="child.meta.id">
        {{ child.meta.value }}
        <component :is="child.meta.render" />
      </template>
    </NInputNumber>
  </div>

  <p v-show="errorMessage" class="mt-2 text-sm text-red-600">
    {{ errorMessage }}
  </p>
</template>
