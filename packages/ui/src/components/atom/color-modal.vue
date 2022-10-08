<script setup lang="ts">
import { useMotions } from '@vueuse/motion'
import { Teleport, toRefs } from 'vue'
const props = defineProps({
  visible: { type: Boolean },
})
const emit = defineEmits(['update:visible', 'close'])
const { visible } = toRefs(props)

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
  emit('update:visible', false)
}
</script>

<template>
  <Teleport to="#dialog-outlet">
    <div v-if="visible" class="fixed z-[99999] h-screen w-screen">
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
            <div>
              <div class="text-left">
                <h3 id="modal-title" class="text-lg font-medium leading-6">
                  Change Color Site
                </h3>
                <slot />
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <button
                type="button"
                class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
                @click="close"
              >
                Go back to
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
