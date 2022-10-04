<script lang="ts">
import { NScrollbar } from 'naive-ui'
import { computed, defineComponent, provide, ref } from 'vue'

type size = '90vw' | '80vw' | '70vw' | '856px'
export default defineComponent({
  components: {
    NScrollbar,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      default: undefined,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: 'i-ph-books-duotone',
    },
    sidebarLabel: {
      type: String,
      default: 'sidebar',
    },
    cancelable: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String as () => size,
      default: '856px',
    },
  },
  emits: ['cancel', 'update:modelValue'],
  setup(props, { emit }) {
    const isFilter = ref(false)
    const isHeaderScroll = ref(false)
    const isScroll = (e: Event) => {
      if ((e.target as HTMLElement).scrollTop > 50) {
        isHeaderScroll.value = true
      } else {
        isHeaderScroll.value = false
      }
    }
    const localActive = ref(false)
    const mainEl = ref<Element>()
    provide('main-element', mainEl)
    const internalActive = computed({
      get() {
        return props.modelValue === undefined
          ? localActive.value
          : props.modelValue
      },
      set(newActive: boolean) {
        localActive.value = newActive
        emit('update:modelValue', newActive)
      },
    })
    return {
      internalActive,
      mainEl,
      isFilter,
      isHeaderScroll,
      isScroll,
    }
  },
})
</script>

<template>
  <AtomHDialog
    v-model="internalActive"
    :persistent="persistent"
    placement="right"
    @esc="$emit('cancel')">
    <template #activator="{ on }">
      <slot name="activator" v-bind="{ on }" />
    </template>

    <article class="h-drawer w-full" :class="`max-w-[${size}]`">
      <div
        :class="
          isHeaderScroll
            ? 'border-b border-toprak-300 dark:border-dark-300'
            : ''
        "
        class="grid h-14 grid-cols-3 place-content-center px-4">
        <div class="flex w-full items-center space-x-2">
          <AtomHButton
            v-if="cancelable"
            class="cancel"
            icon
            rounded
            secondary
            kind="danger"
            size="sm"
            @click="$emit('cancel')">
            <AtomHIcon name="i-ph-x-light" />
          </AtomHButton>
          <slot name="header:right" />
        </div>
        <div
          class="flex h-full w-full items-center justify-center place-self-center">
          <Transition>
            <div v-show="isHeaderScroll" class="text-sm font-semibold">
              {{ title }}
            </div>
          </Transition>
        </div>
        <div class="flex w-full flex-row-reverse space-x-2 space-x-reverse">
          <slot name="header:left" />
        </div>
      </div>
      <NScrollbar
        ref="scrollContainerRef"
        :native-scrollbar="false"
        @scroll="isScroll($event)">
        <h1 class="mt-1 px-4 text-lg font-bold">
          {{ title }}
        </h1>
        <div class="flex flex-col p-4 lg:flex-row">
          <nav
            v-if="$slots.sidebar"
            class="sidebar hidden w-full max-w-[250px] flex-none flex-col border-r border-toprak-100 pr-2 dark:border-dark-200 lg:flex">
            <slot name="sidebar" />
          </nav>
          <main ref="mainEl" class="main lg:w-2/3">
            <AtomHDetail
              v-if="$slots.sidebar"
              class="mobile-sidebar"
              :label="sidebarLabel">
              <nav>
                <slot name="sidebar" />
              </nav>
            </AtomHDetail>

            <slot />
          </main>
        </div>
      </NScrollbar>
    </article>
  </AtomHDialog>
</template>

<style lang="scss" scoped>
.h-drawer {
  @apply mt-20 h-full lg:mt-0 lg:h-[98%];
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--background-page);
  .spacer {
    flex-grow: 1;
  }
  .header-icon {
    --h-button-background-color: var(--background-normal);
    --h-button-background-color-active: var(--background-normal);
    --h-button-background-color-hover: var(--background-normal-alt);
    --h-button-color-disabled: var(--foreground-normal);
  }
  .content {
    --border-radius: 6px;
    --input-height: 60px;
    --input-padding: 16px; /* (60 - 4 - 24) / 2 */
    --form-vertical-gap: 52px;
    position: relative;
    display: flex;
    flex-grow: 1;
    overflow: hidden;
    /* Page Content Spacing (Could be converted to Project Setting toggle) */
    font-size: 15px;
    line-height: 24px;
    .sidebar {
      @apply rounded-lg;
      --h-list-item-background-color-hover: var(--background-normal-alt);
      --h-list-item-background-color-active: var(--background-normal-alt);
      display: none;
      @media (min-width: 960px) {
        position: relative;
        z-index: 2;
        display: block;
        flex-basis: 240px;
        flex-shrink: 0;
        width: 240px;
        height: 100%;
        height: auto;
        background-color: var(--background-normal);
      }
    }
    .h-overlay {
      --h-overlay-z-index: 1;
      @media (min-width: 960px) {
        --h-overlay-z-index: none;
        display: none;
      }
    }
    .main {
      --content-padding: 16px;
      --content-padding-bottom: 32px;
      position: relative;
      flex-grow: 1;
      overflow: auto;
      @media (min-width: 600px) {
        --content-padding: 32px;
        --content-padding-bottom: 132px;
      }
    }
  }
  @media (min-width: 960px) {
    width: calc(100% - 64px);
  }
}
.mobile-sidebar {
  nav {
    border-radius: var(--border-radius);
  }
  @media (min-width: 960px) {
    display: none;
  }
}
</style>
