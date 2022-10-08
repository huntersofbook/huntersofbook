<script setup lang="ts">
import { useGlobalConfig, useTimeFromNow } from '@huntersofbook/core'
import { HColorModal, HDateTime } from '@huntersofbook/ui'
const date = new Date('2022-08-24 04:49:00+00')
const { getGlobalConfig } = useGlobalConfig()
const data = useTimeFromNow(date, 1000)

const open = ref(false)
const close = () => {
  open.value = !open.value
}
</script>

<template>
  <div class="mt-20">
    <div>{{ data }}</div>
    <div>
      <HDateTime
        :time="date"
        format="yyyy dd MMMM HH:ss:mm"
        unix
        strict
      />
    </div>
    <div>
      {{ getGlobalConfig() }}
    </div>
    <HColorModal :visible="open" @close="() => (open = false)" />
    <button @click="open = !open">
      open
    </button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
