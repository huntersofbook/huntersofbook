<script lang="ts" setup>
import { getGithubUrl } from "./../composables/url"
defineProps({
    to: String
})
</script>
<template>
    <a :href="getGithubUrl(to)" target="_blank">
        <slot></slot>
    </a>
</template>