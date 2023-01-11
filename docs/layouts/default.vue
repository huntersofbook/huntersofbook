<script setup lang="ts">
const { trackEvent } = usePlausible()
</script>

<template>
  <DocsPageLayout class="min-h-page">
    <div class="fixed px-4 font bottom-20 right-10 space-y-4 w-56 z-50">
      <a
        href="https://github.com/sponsors/productdevbook" target="_blank"
        class="px-4 hover:bg-red-400 flex shadow shadow-red-100 flex-none h-10 font-semibold items-center justify-center  bg-red-500 row-span-full text-base text-white rounded-full"
        @click="trackEvent('sponsor')"
      >
        <Icon name="uil:github" size="20" class="mr-2" />
        <p>sponsor us</p>
      </a>
      <!-- <LanguageChange /> -->
    </div>
    <slot />
  </DocsPageLayout>
</template>
