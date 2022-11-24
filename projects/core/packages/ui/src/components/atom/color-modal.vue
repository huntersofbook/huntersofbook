<script setup lang="ts">
import { useMotions } from '@vueuse/motion'
import type { PropType } from 'vue'
import { toRefs } from 'vue'
const props = defineProps({
  opened: { type: Boolean as PropType<boolean>, default: false },
  themeStatus: { type: String as PropType<'design' | 'empty'>, default: 'design' },
})
const emit = defineEmits(['update:opened', 'close'])
const { opened } = toRefs(props)

const leaveTransition = async () => {
  const { windowTransition, overlayTransition } = useMotions()
  await Promise.all([
    overlayTransition.apply('leave'),
    windowTransition.apply('leave'),
  ])
}

const close = async () => {
  await leaveTransition()
  emit('close')
  emit('update:opened', false)
}
</script>

<template>
  <div v-if="opened" class="fixed z-[99999] h-screen w-screen">
    <div
      v-motion="'overlayTransition'"
      :initial="{
        opacity: 0,
      }"
      :enter="{
        opacity: 1,
      }"
      :leave="{ opacity: 0 }"
      class="fixed inset-0 bg-gray-500 bg-opacity-10 backdrop-blur-[3px] transition-opacity"
    />

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          v-motion="'windowTransition'"
          :initial="{
            opacity: 0,
            scale: 0,
          }"
          :enter="{
            opacity: 1,
            scale: 1,
            transition: {
              type: 'keyframes',
              duration: 50,
            },
          }"
          :leave="{
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              type: 'keyframes',
              ease: 'easeInOut',
            },
          }"
          :delay="100"
          class="relative w-full transform overflow-hidden rounded-lg bg-white dark:bg-dark-400 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
        >
          <div v-if="themeStatus === 'design'" class="text-left">
            <h3 id="modal-title" class="text-lg font-medium leading-6">
              <slot v-if="$slots.title" name="title" />
            </h3>
            <slot />
          </div>
          <div v-if="themeStatus === 'design'" class="mt-5 sm:mt-6">
            <template v-if="$slots.footer">
              <slot name="footer" :close="close" />
            </template>
            <template v-else>
              <button
                type="button"
                class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
                @click="close"
              >
                Go back to
              </button>
            </template>
          </div>

          <template v-if="themeStatus === 'empty'">
            <slot />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
