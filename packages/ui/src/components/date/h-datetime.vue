<script setup lang="ts">
import {
  localizedFormat,
  localizedFormatDistance,
  localizedFormatDistanceStrict,
  useHuntersofbook,
} from '@huntersofbook/core'
import { fromUnixTime, millisecondsToSeconds, parse, parseISO } from 'date-fns'
import { PropType, computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  format: {
    type: String as PropType<string>,
    default: 'PPP HH:mm:ss',
  },
  relative: {
    type: Boolean,
    default: false,
  },
  strict: Boolean,
  round: {
    default: 'round',
    type: String as PropType<'round' | 'floor' | 'ceil' | undefined>,
  },
  suffix: Boolean,
  value: String,
  type: String as PropType<
    'dateTime' | 'date' | 'time' | 'timestamp' | 'unixMillisecondTimestamp'
  >,
})

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
    parse(props.value, props.format, new Date())
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
    const { global } = useHuntersofbook()

    if (newValue === null) {
      displayValue.value = null
      return
    }
    if (props.relative) {
      displayValue.value = relativeFormat(newValue)
    } else {
      displayValue.value = localizedFormat(newValue, props.format, {
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
