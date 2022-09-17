<script setup lang="ts">
import { useTimeFromNow } from 'huntersofbook'
const date = new Date()
const data = useTimeFromNow(date, 100)
</script>

<template>
  <div>
    {{ data }}
  </div>
</template>
