<script setup lang="ts">
import {
  localizedFormat,
  localizedFormatDistance,
  localizedFormatDistanceStrict,
  useHuntersofbook,
} from '@huntersofbook/core'
import { fromUnixTime, millisecondsToSeconds, parse, parseISO } from 'date-fns'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  value: string
  type:
    | 'dateTime'
    | 'date'
    | 'time'
    | 'timestamp'
    | 'unixMillisecondTimestamp'
    | DateFormat
  format?: string
  relative?: boolean
  strict?: boolean
  round?: 'round' | 'floor' | 'ceil'
  suffix?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  format: 'long',
  relative: false,
  strict: false,
  round: 'round',
  suffix: true,
  value: '',
  type: 'ISOString',
})

const EDateFormat = {
  dateTimeISO: 'yyyy-MM-dd HH:mm:ss',
  dateTimeJP: 'yyyy年MM月dd日 HH時mm分ss秒',
  timestampISO: 'yyyy-MM-dd HH:mm:ss.SSS',
  ISOString: "yyy-MM-dd'T'HH:mm:ssX",
} as const

type DateFormat = keyof typeof EDateFormat

const { t } = useI18n()
const { global } = useHuntersofbook()

const displayValue = ref<string | null>(null)

const localValue = computed(() => {
  if (!props.value) {
    return null
  }
  if (props.type === 'unixMillisecondTimestamp')
    return parseISO(
      fromUnixTime(millisecondsToSeconds(Number(props.value))).toISOString(),
    )
  else if (props.type === 'timestamp') {
    return parseISO(props.value)
  } else if (props.type === 'dateTime')
    return parse(props.value, "yyyy-MM-dd'T'HH:mm:ss", new Date())
  else if (props.type === 'date')
    return parse(props.value, 'yyyy-MM-dd', new Date())
  else if (props.type === 'time')
    return parse(props.value, 'HH:mm:ss', new Date())

  try {
    parse(props.value, EDateFormat[props.type], new Date())
  } catch (error) {
    return null
  }
  return null
})

const relativeFormat = (value: Date) => {
  const fn = props.strict
    ? localizedFormatDistanceStrict(value, new Date(), {
        addSuffix: props.suffix,
        roundingMethod: props.round,
      })
    : localizedFormatDistance(value, new Date(), {
        addSuffix: props.suffix,
        includeSeconds: true,
      })
  return fn
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
    } else {
      let format
      if (props.format === 'long') {
        format = `${t('date-fns_date')} ${t('date-fns_time')}`
        if (props.type === 'date') {
          format = String(t('date-fns_date'))
        }
        if (props.type === 'time') {
          format = String(t('date-fns_time'))
        }
      } else if (props.format === 'short') {
        format = `${t('date-fns_date_short')} ${t('date-fns_time_short')}`
        if (props.type === 'date') {
          format = String(t('date-fns_date_short'))
        }
        if (props.type === 'time') {
          format = String(t('date-fns_time_short'))
        }
      } else {
        format = props.format
      }
      displayValue.value = localizedFormat(newValue, format, {
        locale: global.dateLocale.value,
      })
    }
  },
  { immediate: true },
)

let refreshInterval: number | null = null
onMounted(async () => {
  if (!props.relative) {
    return
  }
  refreshInterval = window.setInterval(async () => {
    if (!localValue.value) {
      return
    }

    displayValue.value = relativeFormat(localValue.value)
  }, 60000)
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})
</script>

<template>
  <span v-bind="$attrs">{{ displayValue }}</span>
</template>
