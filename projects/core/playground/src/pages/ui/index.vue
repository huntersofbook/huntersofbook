<script setup lang="ts">
import { useGlobalConfig, useTimeFromNow } from '@huntersofbook/core'
import { HColorModal, HDateTime } from '@huntersofbook/ui'
const date = new Date('2022-08-24 04:49:00+00')
const { getGlobalConfig } = useGlobalConfig()
const data = useTimeFromNow(date, 1000)
const data2 = new Date()
const isOpen = ref(false)
const close = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="mt-20 grid grid-cols-1 gap-10">
    <div>{{ data }}</div>
    <HDateTime
      :time="data2"
      :to="new Date()"
      type="relative"
      strict

      round="round"
      :auto-update="true"
    />
    <HDateTime
      :time="0" :to="1663432864000"
      type="relative"

      strict
    />
    <HDateTime
      :time="1663432864000"
      type="date"
      strict
    />

    <HDateTime
      :time="1663432864000"
      format="yyyy-dd-mm HH:mm:ss"
    />

    <div>
      {{ getGlobalConfig() }}
    </div>
    <HColorModal :opened="isOpen" @close="close" />
    <button @click="isOpen = !isOpen">
      open
    </button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
