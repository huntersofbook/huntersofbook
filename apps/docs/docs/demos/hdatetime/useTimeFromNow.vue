<script setup lang="ts">
import { useTimeFromNow } from 'huntersofbook'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
const date = new Date()
const { locale } = useI18n()
const data = useTimeFromNow(date, 100)
</script>

<template>
  <div>
    {{ data }}
  </div>
</template>

