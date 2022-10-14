<script setup lang="ts">
import { NInputNumber } from 'naive-ui'
import type { InputNumberProps } from 'naive-ui'
import { useField } from 'vee-validate'
import { computed, defineComponent, toRef, unref, useAttrs } from 'vue'

interface Props extends InputNumberProps {
  data?: any
  options?: any
  name: string
  successMessage?: string
}
const props = defineProps<Props>()

const attrs = useAttrs() as any
const name = toRef(props, 'name')

const {
  value: inputValue,
  handleChange,
  handleBlur,
  errorMessage,
  meta,
} = useField<number | undefined>(name, undefined, {
  initialValue: attrs.init ? (attrs.init as number) : undefined,
  validateOnValueUpdate: false,
})

const validationListeners = {
  'on-blur': handleBlur,
  'on-update:value': handleChange,
  'on-value': (e: boolean) => handleChange(e, !!errorMessage.value),
}

const getBindValue = computed(() => ({
  ...unref(attrs),
  ...props,
  ...validationListeners,
}))
</script>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
})
</script>

<template>
  <div
    class="FormField"
    :class="{ 'has-error': !!errorMessage, 'success': meta.valid }"
  >
    <label
      v-if="attrs.label && !attrs.hideLabel"
      :for="attrs.name as string"
      class="block text-sm font-medium text-gray-900 dark:text-gray-200"
    >{{ attrs.label }}
    </label>
    <NInputNumber
      v-bind="getBindValue"
      :status="errorMessage ? 'error' : 'success'"
      :aria-invalid="errorMessage ? true : false"
      :value="inputValue"
    >
      <template v-for="child in options" #[child.slot] :key="child.meta.id">
        {{ child.meta.value }}
        <component :is="child.meta.render" />
      </template>
    </NInputNumber>

    <p v-show="errorMessage || meta.valid" class="help-message">
      {{ errorMessage || successMessage }}
    </p>
  </div>
</template>

<style scoped>
.FormField.has-error .help-message {
  color: var(--hob-error);
}

.FormField.success .help-message {
  color: var(--hob-success);
}
</style>
