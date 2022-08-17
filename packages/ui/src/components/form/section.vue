<script setup lang="ts">
import { defineProps } from 'vue'
import { FormData } from '@huntersofbook/core'
import AtomSectionTitle from '../atom/section-title.vue'

const props = defineProps<{
  forms: FormData<any>['forms']
}>()
const emit = defineEmits<{ (e: 'post', value: Event): void }>()
const post = (e: Event) => {
  emit('post', e)
}
</script>

<template>
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <AtomSectionTitle v-if="$slots.title || $slots.description">
      <template #title>
        <slot name="title" />
      </template>
      <template #description>
        <slot name="description" />
      </template>
    </AtomSectionTitle>

    <div
      class="mt-5 md:mt-0"
      :class="
        $slots.title || $slots.description ? 'md:col-span-2' : 'col-span-full'
      "
    >
      <form @submit.prevent="post($event)">
        <div class="mb-4 grid grid-cols-6 lg:grid-cols-12 gap-8">
          <template v-for="item in props.forms" :key="item.name">
            <div :class="item.width ? item.width : 'col-span-full'">
              <component
                :is="item.component" v-if="!$slots.form"
                :id="item.id"
                :name="item.name"
                :init="item.init"
                :label="item.label"
                :options="item.options"
                v-bind="item.attrs"
              />
            </div>
          </template>
          <slot name="form" />
        </div>

        <div
          v-if="$slots.actions"
          class="flex items-center justify-end py-3 text-right"
        >
          <slot name="actions" />
        </div>
      </form>
      <slot />
    </div>
  </div>
</template>
