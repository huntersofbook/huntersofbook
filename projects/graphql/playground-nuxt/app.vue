<script setup lang="ts">
import { useCountriesQuery } from './graphql/types'

const { result } = useCountriesQuery()
</script>

<template>
  <div>
    <div>
      {{ result }}
    </div>
    <NuxtWelcome />
  </div>
</template>
