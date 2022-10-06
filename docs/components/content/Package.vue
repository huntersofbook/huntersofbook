<script lang="ts" setup>
defineProps({
  title: String,
  logo: String,
  description: String,
  username: String,
  href: String,
})
</script>

<template>
  <li class="group relative flex flex-col items-start">
    <div
      class="relative z-[1] flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-gray-800/5 ring-1 ring-gray-900/5 dark:border dark:border-gray-700/50 dark:bg-gray-800 dark:ring-0"
    >
      <img
        :alt="title"
        :src="`/logo/${logo}`"
        width="32"
        height="32"
        decoding="async"
        data-nimg="future"
        class="h-8 w-8"
        loading="lazy"
        style="color: transparent"
      />
    </div>
    <h2 class="mt-6 text-base font-semibold text-gray-800 dark:text-gray-100">
      <div
        class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-gray-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-gray-800/50 sm:-inset-x-6 sm:rounded-2xl"
      />
      <NuxtLink :to="href">
        <span
          class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"
        /><span class="relative z-10">{{ title }}</span>
      </NuxtLink>
    </h2>
    <p class="relative z-10 mt-2 text-sm text-gray-600 dark:text-gray-400">
      {{ description }}
    </p>
    <p
      class="relative z-10 mt-6 flex text-sm font-medium text-gray-400 transition group-hover:text-teal-500 dark:text-gray-200"
    >
      {{ username }}
    </p>
  </li>
</template>
