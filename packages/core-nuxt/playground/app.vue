<script setup lang="ts">
import { useTimeFromNow, useTimeFromNowStrict } from '@huntersofbook/core'
import { HDateTime } from '@huntersofbook/ui'
const date = new Date('2022-08-24 04:49:00+00')
const nowDate = useTimeFromNowStrict(new Date(), 1000, true)
const nowDatea = useTimeFromNowStrict(
  new Date('2022-10-06 06:01:00+00'),
  1000,
  false,
  true,
)
const data = useTimeFromNow(date, 1000)
</script>

<template>
  <div class="mt-20">
    <div>{{ data }}</div>
    <div>{{ nowDate }}</div>
    <div>{{ nowDatea }}</div>
    <HDateTime
      value="1661182742000"
      format="yyyy MMMM"
      strict
    />
  </div>
</template>
