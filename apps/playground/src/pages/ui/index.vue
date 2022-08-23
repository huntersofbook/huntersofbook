<script setup lang="ts">
import { HDateTime } from '@huntersofbook/ui'
import { useTimeFromNow } from 'huntersofbook'
const date = new Date('2022-08-23 17:25:30+00')

const data = useTimeFromNow(date, 500)
</script>

<template>
  <div class="mt-20">
    {{ data }}
    <HDateTime value="1661182742000" type="unixMillisecondTimestamp" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
