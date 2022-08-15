<script lang="ts" setup>import { onBeforeMount, provide, ref, useSlots } from 'vue';
import TabPane from './TabPane.vue';

interface TabInterface {
    name: string,
    text: string,
}

const slots = useSlots()
const tabItems = ref<TabInterface[]>([])
const activeTabName = ref('')
onBeforeMount(() => {
    if (slots.default) {
        slots.default().forEach((element, i) => {
            let tab = element.props as TabInterface
            tabItems.value.push(tab)
            if (i === 0) activeTabName.value = tab.name
        });

    }
})

provide('activeTab', activeTabName)
</script>
<template>
    <div class="tabs">
        <div class="tab__pane-container">
            <tab-pane
                v-for="item in tabItems"
                :text="item.text"
                :active="activeTabName === item.name"
                @click="activeTabName = item.name"
            ></tab-pane>
        </div>
        <slot></slot>
    </div>
</template>
<style>
.tab__pane-container {
    --pane-top-left-radius: 0.5rem;
    --pane-top-right-radius: 0.5rem;

    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    padding: 0.5rem;
    border-top-left-radius: var(--pane-top-left-radius);
    border-top-right-radius: var(--pane-top-right-radius);
    background-color: var(--vp-c-gray-dark-5);
}
</style>