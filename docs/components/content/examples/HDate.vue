<script setup lang="ts">
import { useTimeFromNow, useTimeFromNowStrict } from '@huntersofbook/core'
import { HDateTime } from '@huntersofbook/ui'
import type { PropType } from 'vue'

const props = defineProps({
  type: {
    type: String as PropType<'date' | 'time' | 'datetime'>,
    default: 'date',
  },
})
const { t, locale } = useI18n()
const date = new Date('2022-08-24 04:49:00+00')
const data = useTimeFromNow(date, 1000)
const data2 = useTimeFromNowStrict(date, 1000)
const data3 = useTimeFromNowStrict(new Date(), 1000, true)
</script>

<template>
  <div class="mt-20">
    <div v-if="props.type === 'date'">
      {{ data }}
    </div>
    {{ t('hello') }}

    <!-- <div>{{ data2 }}</div>
    <div>{{ data3 }}</div>
    <HDateTime
      value="1661182742000"
      type="unixMillisecondTimestamp"
      format="yyyy MMMM"
      strict
    /> -->
  </div>
</template>
