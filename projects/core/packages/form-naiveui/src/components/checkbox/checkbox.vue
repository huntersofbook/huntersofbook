<script setup lang="ts">
import { NCheckbox } from 'naive-ui'
import type { CheckboxProps } from 'naive-ui'
import { useField } from 'vee-validate'
import { computed, defineComponent, toRef, unref, useAttrs } from 'vue'

interface Props extends CheckboxProps {
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
  meta,
  handleChange,
  handleBlur,
  errorMessage,
} = useField(name, undefined, {
  initialValue: attrs.init ? (attrs.init as string) : undefined,
  validateOnValueUpdate: false,
  checkedValue: attrs.checkedValue ? attrs.checkedValue : true,
  uncheckedValue: attrs.uncheckedValue ? attrs.uncheckedValue : false,
})

const validationListeners = {
  'blur': handleBlur,
  'on-update:value': handleChange,
  'on-value': (e: boolean) => handleChange(e, !!errorMessage.value),
  'on-update:checked': handleChange,
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
      :for="attrs.id"
      class="block text-sm font-medium text-gray-900 dark:text-gray-200"
    >{{ attrs.label }}
    </label>

    <NCheckbox
      :id="attrs.id"
      v-bind="getBindValue"
      v-model:checked="inputValue"
      :status="errorMessage ? 'error' : 'success'"
    >
      <template v-for="child in options" #[child.slot] :key="child.meta.id">
        {{ child.meta.value }}
        <component :is="child.meta.render" />
      </template>
    </NCheckbox>

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
