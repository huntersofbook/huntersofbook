<script setup lang="ts">
import { NInput } from 'naive-ui'
import type { InputProps } from 'naive-ui'
import { useField } from 'vee-validate'
import { computed, defineComponent, toRef, unref, useAttrs } from 'vue'

interface Props extends InputProps {
  data?: any
  options?: any
  footer?: any
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
} = useField<string>(name, undefined, {
  initialValue: attrs.init ? attrs.init : undefined,
  validateOnValueUpdate: false,
})

const validationListeners = {
  'on-blur': handleBlur,
  'on-update:value': handleChange,
  'on-input': (e: boolean) => handleChange(e, !!errorMessage.value),
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

    <component :is="footer.render" v-if="footer && footer.render" />

    <p v-if="footer && footer.text">
      {{ footer.text }}
    </p>

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
