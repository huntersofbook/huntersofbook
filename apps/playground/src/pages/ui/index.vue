<script setup lang="ts">
import { HDateTime } from '@huntersofbook/ui'
const date = new Date('2022-08-15 11:56:40+00')
</script>

<template>
  <div class="mt-20">
    <HDateTime value="1661182742000" type="unixMillisecondTimestamp" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
