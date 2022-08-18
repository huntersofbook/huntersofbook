<script setup lang="ts">
import { useAttrs } from 'vue'
import AtomSectionTitle from '../atom/section-title.vue'

interface Props {
  forms?: any
  theme?: 'default' | 'design'
}
const props = withDefaults(defineProps<Props>(), {
  theme: 'default',
})

const emit = defineEmits<{ (e: 'post', value: Event): void }>()

const attrs = useAttrs() as any
const post = (e: Event) => {
  emit('post', e)
}
</script>

<template>
  <template v-if="props.theme === 'default'">
    <form :class="attrs.class ? attrs.class : 'mb-4 grid grid-cols-6 lg:grid-cols-12 gap-8'" @submit.prevent="post($event)">
      <div v-for="item in props.forms" :key="item.name" :class="item.width ? item.width : 'col-span-full'">
        <slot name="itemsHeader" v-bind="item" />
        <component
          :is="item.component" v-if="!$slots.form"
          :id="item.id"
          :name="item.name"
          :init="item.init"
          :label="item.label"
          :options="item.options"
          v-bind="item.attrs"
        />
        <slot name="itemsFooter" v-bind="item" />
      </div>

      <slot v-if="$slots.actions" name="actions" />
    </form>
  </template>
  <template v-else>
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
          <div :class="attrs.class ? attrs.class : 'mb-4 grid grid-cols-6 lg:grid-cols-12 gap-8'">
            <div v-for="item in attrs.forms" :key="item.name" :class="item.width ? item.width : 'col-span-full'">
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
</template>
