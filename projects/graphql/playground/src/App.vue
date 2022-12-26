<script setup lang="ts">
import { onMounted } from 'vue'
import { useCountriesQuery } from './graphql/types'

const { result, loading, error, refetch, load } = useCountriesQuery({ fetchPolicy: 'network-only', skip: true })
</script>

<template>
  <div>
    <button @click="load()">
      load
    </button>
    <div v-if="loading ">
      {{ loading }}
    </div>
    <div v-else-if="error">
      {{ error }}
    </div>
    <div v-else>
      {{ result?.data.countries }}
    </div>

    <button @click="refetch()">
      refecth
    </button>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo">
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo">
    </a>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
