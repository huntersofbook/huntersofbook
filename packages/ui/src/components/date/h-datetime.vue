<script setup lang="ts">
import {
  localizedFormat,
  localizedFormatDistance,
  localizedFormatDistanceStrict,
  localizedFormatInTimeZone,
  useGlobalConfigSafe,
} from '@huntersofbook/core'
import { fromUnixTime } from 'date-fns'
import { PropType, computed } from 'vue'

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
  time: {
    type: [Number, Date] as PropType<number | Date>,
    default: undefined, // For unix or non unix mode, it should be different default value
  },
  to: {
    type: [Number, Date] as PropType<number | Date>,
    default: undefined, // the same as `time` prop
  },
  type: {
    type: String as PropType<'date' | 'datetime'>,
    default: 'dateTime',
  },
  timeZone: String,
  autoUpdate: {
    type: [Number, Boolean],
    required: false,
    default: null,
  },
  text: Boolean,
  unix: Boolean,
})
const now = Date.now()
const mergedFormatRef = computed(() => {
  const { timeZone } = props
  if (timeZone) {
    return (
      time: number | Date,
      _format: string,
      options: { locale: Locale },
    ) => {
      return localizedFormatInTimeZone(time, timeZone, _format, options)
    }
  }
  return (
    time: number | Date,
    _format: string,
    options: { locale: Locale },
  ) => {
    return localizedFormat(time, _format, options)
  }
})

const dateFnsOptionsRef = computed(() => {
  const gc = useGlobalConfigSafe()
  if (!gc) {
    throw new Error(
      'huntersofbook GlobalConfigPlugin is not registered!',
    )
  }
  const { globalConfig } = gc
  return {
    locale: globalConfig.value.dateLocale,
  }
})

const mergedToRef = computed(() => {
  const { to } = props
  if (props.unix) {
    if (to === undefined) return now
    return fromUnixTime(typeof to === 'number' ? to : to.valueOf())
  }
  return to ?? now
})

const mergedTimeRef = computed(() => {
  const { time } = props
  if (props.unix) {
    if (time === undefined) return now
    return fromUnixTime(typeof time === 'number' ? time : time.valueOf())
  }
  return time ?? now
})

const relativeFormat = (value: number | Date, to: number | Date) => {
  const fn = props.strict
    ? localizedFormatDistanceStrict(value, to, {
      addSuffix: props.suffix,
      roundingMethod: props.round,
      locale: dateFnsOptionsRef.value.locale,
    })
    : localizedFormatDistance(value, to, {
      addSuffix: props.suffix,
      includeSeconds: true,
      locale: dateFnsOptionsRef.value.locale,
    })
  return fn
}

const renderedTimeRef = computed(() => {
  if (props.format) {
    return mergedFormatRef.value(
      mergedTimeRef.value,
      props.format,
      dateFnsOptionsRef.value,
    )
  }
  else if (props.type === 'date') {
    return mergedFormatRef.value(
      mergedTimeRef.value,
      props.format,
      dateFnsOptionsRef.value,
    )
  }
  else if (props.type === 'datetime') {
    return mergedFormatRef.value(
      mergedTimeRef.value,
      props.format,
      dateFnsOptionsRef.value,
    )
  }
  else {
    return relativeFormat(mergedTimeRef.value, mergedToRef.value)
  }
})
</script>

<template>
  <time>{{ renderedTimeRef }}</time>
</template>
