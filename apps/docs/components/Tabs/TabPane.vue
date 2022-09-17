<script setup lang="ts">
const props = defineProps({
  text: String,
  active: Boolean
})
defineEmits(['click'])
</script>

<template>
  <div class="tab__pane" :class="[active ? 'tab__pane--active' : '']">
    <a href="#" @click.prevent="$emit('click')">{{ text }}</a>
  </div>
</template>

<style>
.tab__pane a {
  padding: 0.5rem;
  border-radius: var(--pane-top-left-radius);
  font-size: var(--vp-code-font-size);
  display: block;
  color: var(--tab-text-color);
}
.tab__pane--active a {
  background-color: var(--tab-active-bg);
  color: var(--vp-c-brand);
  pointer-events: none;
}
</style>
