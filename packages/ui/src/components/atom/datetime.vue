<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { fromUnixTime, millisecondsToSeconds, parse, parseISO } from 'date-fns'
import { localizedFormat, localizedFormatDistance, localizedFormatDistanceStrict } from '@huntersofbook/core'

interface Props {
  value: string
  type: 'dateTime' | 'date' | 'time' | 'timestamp' | 'unixMillisecondTimestamp'
  format?: string
  relative?: boolean
  strict?: boolean
  round?: string
  suffix?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  format: 'long',
  relative: false,
  strict: false,
  round: 'round',
  suffix: true,
})

const { t } = useI18n()
const displayValue = ref<string | null>(null)

const localValue = computed(() => {
  if (!props.value)
    return null
  if (props.type === 'unixMillisecondTimestamp')
    return parseISO(fromUnixTime(millisecondsToSeconds(Number(props.value))).toISOString())
  else if (props.type === 'timestamp')
    return parseISO(props.value)
  else if (props.type === 'dateTime')
    return parse(props.value, 'yyyy-MM-dd\'T\'HH:mm:ss', new Date())
  else if (props.type === 'date')
    return parse(props.value, 'yyyy-MM-dd', new Date())
  else if (props.type === 'time')
    return parse(props.value, 'HH:mm:ss', new Date())

  return null
})

const relativeFormat = (value: Date) => {
  const fn = props.strict ? localizedFormatDistanceStrict : localizedFormatDistance
  return fn(value, new Date(), {
    addSuffix: props.suffix,
    roundingMethod: props.round,
  })
}

watch(
  localValue,
  async (newValue) => {
    if (newValue === null) {
      displayValue.value = null
      return
    }
    if (props.relative) {
      displayValue.value = relativeFormat(newValue)
    }
    else {
      let format
      if (props.format === 'long') {
        format = `${t('date-fns_date')} ${t('date-fns_time')}`
        if (props.type === 'date')
          format = String(t('date-fns_date'))
        if (props.type === 'time')
          format = String(t('date-fns_time'))
      }
      else if (props.format === 'short') {
        format = `${t('date-fns_date_short')} ${t('date-fns_time_short')}`
        if (props.type === 'date')
          format = String(t('date-fns_date_short'))
        if (props.type === 'time')
          format = String(t('date-fns_time_short'))
      }
      else {
        format = props.format
      }
      displayValue.value = localizedFormat(newValue, format)
    }
  },
  { immediate: true },
)

let refreshInterval: number | null = null
onMounted(async () => {
  if (!props.relative)
    return
  refreshInterval = window.setInterval(async () => {
    if (!localValue.value)
      return
    displayValue.value = relativeFormat(localValue.value)
  }, 60000)
})

onUnmounted(() => {
  if (refreshInterval)
    clearInterval(refreshInterval)
})
</script>

<template>
  <span v-bind="$attrs">{{ displayValue }}</span>
</template>

