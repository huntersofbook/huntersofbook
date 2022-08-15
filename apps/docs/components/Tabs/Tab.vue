<script setup lang="ts">import { inject } from 'vue';

const props = defineProps({
    name: String,
    text: String,
    maxHeight: Number,
})
const activeTab = inject<string>('activeTab')
</script>
<template>
    <div class="tab__content" v-show="activeTab === name" :style="{ maxHeight: `${maxHeight}px` }">
        <slot></slot>
    </div>
</template>
<style>
.vp-doc .tab__content [class*="language-"] {
    margin-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    margin-left: 0;
}
.tab__content {
    overflow-y: auto;
    overflow-x: visible;
}
</style>