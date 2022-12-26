<script setup lang="ts">
import { useCountriesQuery } from './graphql/types'

const { result, refetch, loading, error } = useCountriesQuery()
</script>

<template>
  <div>
    <div v-if="loading">
      {{ loading }}
    </div>
    <div v-else-if="error">
      {{ error }}
    </div>
    <div v-else>
      {{ result?.data.countries }}
    </div>
    <NuxtWelcome />
    <button @click="refetch()">
      refecth
    </button>
  </div>
</template>
