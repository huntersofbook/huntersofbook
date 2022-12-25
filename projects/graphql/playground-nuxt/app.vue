<script setup lang="ts">
import { useCountriesQuery } from './graphql/types'

const { result } = useCountriesQuery({ ssr: true })
</script>

<template>
  <div>
    <NuxtWelcome />

    {{ result }}
  </div>
</template>
