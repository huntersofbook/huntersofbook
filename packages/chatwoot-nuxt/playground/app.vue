<script setup lang="ts">
const { isModalVisible, toggle, toggleBubbleVisibility, popoutChatWindow }
  = useChatWoot()

onMounted(() => {
  toggleBubbleVisibility('hide')
})
</script>

<template>
  <div class="flex space-x-3">
    <div>{{ isModalVisible }}</div>
    <button @click="toggle('open')">
      open
    </button>
    <button @click="toggle('close')">
      close
    </button>
    <div class="flex space-x-3">
      <button @click="toggleBubbleVisibility('hide')">
        hide
      </button>
      <button @click="toggleBubbleVisibility('show')">
        show
      </button>
      <button @click="popoutChatWindow()">
        open popup
      </button>
    </div>
  </div>
</template>
