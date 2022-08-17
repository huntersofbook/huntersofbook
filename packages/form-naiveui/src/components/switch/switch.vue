<script setup lang="ts">
import { NSwitch } from 'naive-ui'
import { useField } from 'vee-validate'
import { useAttrs } from 'vue'

const attrs = useAttrs() as any

const {
  value: inputValue,
  handleChange,
  handleBlur,
  errorMessage,
} = useField(attrs.name, undefined, {
  initialValue: attrs.init ? attrs.init as string : undefined,
  validateOnValueUpdate: false,
})

const validationListeners = {
  'blur': handleBlur,
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
    :for="$attrs.id as string"
    class="block text-sm font-medium text-gray-900 dark:text-gray-200"
  >{{ attrs.label }}
  </label>
  <div class="relative mt-1 rounded-md shadow-sm">
    <NSwitch
      v-bind="bind"
      v-model:value="inputValue"
      :status="errorMessage ? 'error' : 'success'"
    >
      <template v-for="child in attrs.options" #[child.slot] :key="child.meta.id">
        {{ child.meta.value }}
        <component :is="child.meta.render" />
      </template>
    </NSwitch>
  </div>
  <p v-show="errorMessage" class="mt-2 text-sm text-red-600">
    {{ errorMessage }}
  </p>
</template>
