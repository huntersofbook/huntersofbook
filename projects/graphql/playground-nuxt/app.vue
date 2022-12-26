<script setup lang="ts">
import { useCountriesQuery } from './graphql/types'

const { result, refetch, loading, error } = useCountriesQuery()
</script>

<template>
  <button @click="refetch({ filter: { code: { eq: 'AD' } } })">
    refecth
  </button>
  <section>
    <div v-if="loading">
      {{ loading }}
    </div>
    <div v-else-if="error">
      {{ error }}
    </div>
    <div v-else>
      <div v-for="item in result?.data.countries.slice(0, 20)" :key="item.code">
        <NuxtLink :to="`library/${item.name}`">
          <div class="p-4 dark:bg-dark-200 my-2 rounded bg-kalem-100">
            {{ item.name }}
            {{ item.code }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
