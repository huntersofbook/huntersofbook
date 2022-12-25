<script setup lang="ts">
import { useCountriesQuery } from './graphql/types'

const { result } = useCountriesQuery()
</script>

<template>
  <div>
    <NuxtWelcome />

    {{ result }}
  </div>
</template>
