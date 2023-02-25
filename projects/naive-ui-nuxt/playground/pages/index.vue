<script setup lang="ts"></script>

<template>
  <div>
    <NConfigProvider>
      <NGlobalStyle />
      <div class="mx-auto mt-4 max-w-sm">
        <NButton class="px-4 bg-red-500">
          Default
        </NButton>
        <NButton>Default</NButton>
        <NInput>Default</NInput>
      </div>
    </NConfigProvider>
  </div>
</template>
