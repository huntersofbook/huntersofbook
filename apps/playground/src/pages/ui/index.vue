<script setup lang="ts">
import { DateTime } from '@huntersofbook/ui'
const date = new Date()
</script>

<template>
  <div class="mt-20">
    <DateTime value="2014-02-11T11:30:30" type="timestamp" />

  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
