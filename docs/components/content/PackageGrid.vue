<script lang="ts" setup></script>

<template>
  <div>
    <h2 class="text-2xl font-bold">
      <slot name="title" />
    </h2>
    <div class="mt-16 sm:mt-20 sm:mb-40">
      <ul
        role="list"
        class="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        <slot />
      </ul>
    </div>
  </div>
</template>
