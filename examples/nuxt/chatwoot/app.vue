<script setup lang="ts">
const {
  isModalVisible,
  toggle,
  toggleBubbleVisibility,
  popoutChatWindow,
  ...more
} = useChatWoot()
</script>

<template>
  <div class="mx-auto w-full max-w-4xl mt-20">
    <div class="grid gap-10 grid-cols-3">
      <div class="col-span-full bg-gray-200 p-4">
        isModalVisible: <span class="font-black"> {{ isModalVisible }}</span>
      </div>
      <HButton @click="toggle('open')">
        toggle open
      </HButton>
      <HButton @click="toggle('close')">
        toggle close
      </HButton>

      <HButton @click="toggleBubbleVisibility('hide')">
        toggleBubbleVisibility-hide
      </HButton>
      <HButton @click="toggleBubbleVisibility('show')">
        toggleBubbleVisibility-show
      </HButton>
      <HButton @click="popoutChatWindow()">
        popoutChatWindow
      </HButton>
    </div>
  </div>
</template>
