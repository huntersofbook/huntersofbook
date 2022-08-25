<script setup lang="ts">
import { useTimeFromNowStrict } from 'huntersofbook'
import { useI18n } from 'vue-i18n'
const date = new Date()
const { locale } = useI18n()
const data = useTimeFromNowStrict(date, 100, locale.value)
</script>

<template>
  <div>
    {{ data }}
  </div>
</template>

