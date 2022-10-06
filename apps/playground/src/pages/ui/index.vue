<script setup lang="ts">
import { HDateTime } from '@huntersofbook/ui'
import { useGlobalConfig, useTimeFromNow } from 'huntersofbook'
const date = new Date('2022-08-24 04:49:00+00')
const { getGlobalConfig } = useGlobalConfig()
const data = useTimeFromNow(date, 1000)
</script>

<template>
  <div class="mt-20">
    <div>{{ data }}</div>
    <HDateTime
      value="1661182742000"
      type="unixMillisecondTimestamp"
      format="yyyy MMMM"
      strict
    />
    <div>
      {{ getGlobalConfig() }}
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
