<script lang="ts">
import type { timeZone } from '@huntersofbook/core'
import {
  localizedFormat,
  localizedFormatDistance,
  localizedFormatDistanceStrict,
  localizedFormatInTimeZone,
  useGlobalConfigSafe,
} from '@huntersofbook/core'
import { fromUnixTime } from 'date-fns'
import enUS from 'date-fns/locale/en-US/index.js'
import type { PropType } from 'vue'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
  props: {
    format: {
      type: String as PropType<string>,
      default: undefined,
    },
    strict: Boolean,
    round: {
      default: 'round',
      type: String as PropType<'round' | 'floor' | 'ceil' | undefined>,
    },
    suffix: { type: Boolean, default: true },
    time: {
      type: [Number, Date] as PropType<number | Date>,
      default: new Date(), // For unix or non unix mode, it should be different default value
    },
    to: {
      type: [Number, Date] as PropType<number | Date>,
      default: undefined, // the same as `time` prop
    },
    type: {
      type: String as PropType<'date' | 'datetime' | 'relative'>,
      default: 'dateTime',
    },
    timeZone: String as PropType<timeZone>,
    autoUpdate: {
      type: [Number, Boolean],
      required: false,
      default: null,
    },
    text: Boolean,
    unix: Boolean,
  },
  setup(props) {
    const now = Date.now()
    const TIMEDATA = ref()
    const updateTimer = ref<ReturnType<typeof setInterval>>()

    const mergedFormat = computed(() => {
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

    const gc = useGlobalConfigSafe()
    if (!gc) {
      throw new Error(
        'huntersofbook GlobalConfigPlugin is not registered!',
      )
    }
    const { globalConfig } = gc

    const mergedTo = computed(() => {
      const { to } = props
      if (props.unix) {
        if (to === undefined)
          return now
        return fromUnixTime(typeof to === 'number' ? to : to.valueOf())
      }
      return to ?? now
    })

    const mergedTime = computed(() => {
      const { time } = props
      if (props.unix) {
        if (time === undefined)
          return now
        return fromUnixTime(typeof time === 'number' ? time : time.valueOf())
      }
      return time ?? now
    })

    const relativeFormat = (time: number | Date, to: number | Date) => {
      const fn = props.strict
        ? localizedFormatDistanceStrict(time, to, {
          addSuffix: props.suffix,
          roundingMethod: props.round,
          locale: globalConfig.value.dateFns.locale || enUS,
        })
        : localizedFormatDistance(time, to, {
          addSuffix: props.suffix,
          includeSeconds: true,
          locale: globalConfig.value.dateFns.locale || enUS,
        })
      return fn
    }
    function dataTableDark() {
      if (props.format) {
        return mergedFormat.value(
          mergedTime.value,
          props.format,
          { locale: globalConfig.value.dateFns.locale || enUS },
        )
      }
      else if (props.type === 'date') {
        return mergedFormat.value(
          mergedTime.value,
          globalConfig.value.dateFns.dateFormat ?? 'yyyy-MM-dd',
          { locale: globalConfig.value.dateFns.locale || enUS },
        )
      }
      else if (props.type === 'datetime') {
        return mergedFormat.value(
          mergedTime.value,
          globalConfig.value.dateFns.dateTimeFormat ?? 'yyyy-MM-dd',
          { locale: globalConfig.value.dateFns.locale || enUS },
        )
      }
      else {
        return !props.autoUpdate ? relativeFormat(mergedTime.value, mergedTo.value) : relativeFormat(new Date(), props.time)
      }
    }

    const renderedTimeRef = computed(() => {
      return dataTableDark()
    })

    // startUpdater starts a new update timer based on the user's input
    function startUpdater() {
      if (props.autoUpdate) {
        const autoUpdate = props.autoUpdate === true ? 0 : props.autoUpdate
        updateTimer.value = setInterval(() => {
          TIMEDATA.value = dataTableDark()
        }, autoUpdate * 1000)
      }
    }

    // stopUpdater stops the current update timer
    function stopUpdater() {
      if (updateTimer.value) {
        clearInterval(updateTimer.value)
        updateTimer.value = undefined
      }
    }

    onMounted(() => {
      if (props.autoUpdate)
        startUpdater()
    })
    // update converter if property changed
    watch(
      () => props.autoUpdate,
      (newValue) => {
        stopUpdater()
        if (newValue)
          startUpdater()
      },
    )

    return { renderedTimeRef, auto: props.autoUpdate, TIMEDATA }
  },
})
</script>

<template>
  <time>{{ auto ? TIMEDATA : renderedTimeRef }}</time>
</template>
