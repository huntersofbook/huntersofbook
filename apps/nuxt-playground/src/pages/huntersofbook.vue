<script setup lang="ts">
import { HColorModal, HDateTime } from '@huntersofbook/ui'
import { useTimeFromNow, useTimeFromNowStrict } from 'huntersofbook'
const date = new Date('2022-08-24 04:49:00+00')
const nowDate = useTimeFromNowStrict(new Date(), 1000, true)
const nowDatea = useTimeFromNowStrict(
  new Date('2022-10-06 06:01:00+00'),
  1000,
  false,
  true,
)
const data = useTimeFromNow(date, 1000)
const open = ref(false)
const close = () => {
  open.value = !open.value
}
</script>

<template>
  <div class="mx-auto mt-4 max-w-sm">
    <div class="mb-10 flex items-center justify-between">
      <a target="_blank" href="https://productdevbook.com">productdevbook.com</a>
      <div class="flex space-x-2">
        <TemLanguageChange />
        <TemColorChange />
      </div>
    </div>
    <ClientOnly>
      <HColorModal :visible="open" @close="() => (open = false)" />
    </ClientOnly>
    <button @click="open = !open">
      open
    </button>
    <div class="mt-20">
      <div>{{ data }}</div>
      <div>{{ nowDate }}</div>
      <div>{{ nowDatea }}</div>
      <HDateTime
        value="1661182742000"
        type="unixMillisecondTimestamp"
        format="yyyy MMMM"
        strict
      />
    </div>
  </div>
</template>
