import defu from 'defu'
import { App, onBeforeUnmount, onMounted, ref } from 'vue'

declare global {
  interface Window {
    chatwootSettings: ChatwootSettings
    chatwootSDK: ChatwootSdk
    $chatwoot: Chatwoot
  }
}

export interface ScriptLoaderOption extends Partial<HTMLScriptElement> {}

export const loadScript = (
  source: string,
  options: ScriptLoaderOption = {} as ScriptLoaderOption,
) => {
  return new Promise((resolve, reject) => {
    const head = document.head || document.getElementsByTagName('head')[0]
    const script = document.createElement('script')
    const {
      src,
      type = 'text/javascript',
      defer = false,
      async = false,
      ...restAttrs
    } = options
    script.type = type
    script.defer = defer
    script.async = async
    script.src = src || source

    Object.keys(restAttrs).forEach((key) => {
      (script as any)[key] = (restAttrs as any)[key]
    })

    head.appendChild(script)
    script.onload = resolve
    script.onerror = reject
  })
}

export interface ChatwootSetUserProps {
  name?: string
  avatar_url?: string
  email?: string
  identifier_hash?: string
  phone_number?: string
  description?: string
  country_code?: string
  city?: string
  company_name?: string
  social_profiles?: {
    twitter?: string
    linkedin?: string
    facebook?: string
    github?: string
  }
}
interface ChatwootInit {
  /**
   * Token
   * @type string
   */
  websiteToken: string
  /**
   * Base url
   * @default 'https://app.chatwoot.com'
   * @type string
   *
   */
  baseUrl?: string
}
/**
 *
 * https://www.chatwoot.com/docs/product/channels/live-chat/sdk/setup/#sdk-settings
 *
 * */
export interface ChatwootSettings {
  hideMessageBubble?: boolean
  position?: 'left' | 'right'
  /**
   * Chat Widget Language
   * @default 'en'
   * @type Locale
   *
   */
  locale?: 'en' | Locale
  type?: 'standard' | 'expanded_bubble'
  /**
   * Chat with us title
   * @default 'Chat with us'
   * @type string
   *
   */
  launcherTitle?: string
  /**
   * Theme
   * @default 'auto'
   * @type 'light' | 'auto'
   *
   */
  darkMode?: 'light' | 'auto'
  showPopoutButton?: boolean
}

export interface ChatwootSdk {
  run: (init: ChatwootInit) => void
}

/**
 *
 * https://github.com/chatwoot/chatwoot/blob/develop/app/javascript/packs/sdk.js#L21
 *
 *
 * */
export interface Chatwoot {
  isModalVisible: boolean
  toggle: (state?: 'open' | 'close') => void
  setUser: (key: string, args: ChatwootSetUserProps) => void
  setCustomAttributes: (attributes: { [key: string]: string }) => void
  deleteCustomAttribute: (key: string) => void
  setLocale: (local: string) => void
  setLabel: (label: string) => void
  removeLabel: (label: string) => void
  reset: () => void
  toggleBubbleVisibility: (visibility: 'hide' | 'show') => void
  popoutChatWindow: () => void
}

type Locale =
  | 'ar'
  | 'ca'
  | 'cs'
  | 'da'
  | 'de'
  | 'el'
  | 'en'
  | 'es'
  | 'fa'
  | 'fi'
  | 'fr'
  | 'hi'
  | 'hu'
  | 'id'
  | 'it'
  | 'ja'
  | 'ko'
  | 'ml'
  | 'nl'
  | 'no'
  | 'pl'
  | 'pt_BR'
  | 'pt'
  | 'ro'
  | 'ru'
  | 'sk'
  | 'sv'
  | 'ta'
  | 'th'
  | 'tr'
  | 'uk'
  | 'vi'
  | 'zh_CN'
  | 'zh_TW'

export interface OptionPlugin {
  /**
   * ChatwootInit options
   * @type ChatwootInit
   */
  init: ChatwootInit

  /**
   * Chatwoot Settings
   * @type ChatwootSettings
   */
  settings?: ChatwootSettings
}

export const createChatWoot = (options: OptionPlugin) => {
  const ChatWoot = {
    install(app: App): void {
      const chatwoot = defu(options, {
        init: { baseUrl: 'https://app.chatwoot.com' },
      } as OptionPlugin)

      const chatwootSettings: ChatwootSettings = defu(chatwoot.settings, {
        showPopoutButton: false,
        darkMode: 'auto',
        hideMessageBubble: false,
        position: 'right',
        locale: 'en',
        launcherTitle: 'Chat with us',
        type: 'expanded_bubble',
      } as ChatwootSettings)

      chatwoot.settings = chatwootSettings
      app.config.globalProperties.$chatwoot = chatwoot

      loadScript(`${chatwoot.init.baseUrl}/packs/js/sdk.js`, {
        async: true,
        defer: true,
      }).then(() => {
        window.chatwootSettings = chatwootSettings
        if (window.chatwootSDK) {
          window.chatwootSDK.run({
            websiteToken: options.init.websiteToken,
            baseUrl: chatwoot.init.baseUrl,
          })
        }
      })

      app.provide('$chatwoot', chatwoot)
    },
  }
  return ChatWoot
}

export const useChatWoot = () => {
  const observer = ref<any>(null)
  const start = ref(1)
  let timer: ReturnType<typeof setTimeout>
  const isModalVisible = ref(false)

  function observerStart(data: any) {
    try {
      const callback = (mutationList: MutationRecord[]) => {
        for (const mutation of mutationList) {
          if (mutation.type === 'attributes') {
            const data = (mutation.target as HTMLElement).className.includes(
              'hide',
            )
            if (data)
              isModalVisible.value = false
            else
              isModalVisible.value = true
          }
        }
      }
      observer.value = new MutationObserver(callback)
      observer.value.observe(data, { attributes: true })
    }
    catch (e) {}
  }

  onMounted(() => {
    timer = setInterval(() => {
      start.value += 1
      const data = document.querySelector('.woot-widget-holder')
      if (data || start.value > 100) {
        clearInterval(timer)
        observerStart(data)
      }
    }, 100)
  })

  onBeforeUnmount(() => {
    if (observer.value)
      observer.value.disconnect()
  })

  const toggle = (state: Parameters<Chatwoot['toggle']>[0]) => {
    isLoadTimer().then(() => window.$chatwoot.toggle(state))
  }

  const setUser = (
    key: Parameters<Chatwoot['setUser']>[0],
    args: Parameters<Chatwoot['setUser']>[1],
  ) => {
    isLoadTimer().then(() => window.$chatwoot.setUser(key, args))
  }

  const setCustomAttributes = (
    attributes: Parameters<Chatwoot['setCustomAttributes']>[0],
  ) => {
    isLoadTimer().then(() => window.$chatwoot.setCustomAttributes(attributes))
  }

  const deleteCustomAttribute = (
    attributes: Parameters<Chatwoot['deleteCustomAttribute']>[0],
  ) => {
    isLoadTimer().then(() =>
      window.$chatwoot.deleteCustomAttribute(attributes),
    )
  }

  const setLocale = (local: Parameters<Chatwoot['setLocale']>[0]) => {
    isLoadTimer().then(() => window.$chatwoot.setLocale(local))
  }

  const setLabel = (label: Parameters<Chatwoot['setLabel']>[0]) => {
    isLoadTimer().then(() => window.$chatwoot.setLabel(label))
  }

  const removeLabel = (label: Parameters<Chatwoot['removeLabel']>[0]) => {
    isLoadTimer().then(() => window.$chatwoot.removeLabel(label))
  }

  const reset = () => {
    isLoadTimer().then(() => window.$chatwoot.reset())
  }

  const toggleBubbleVisibility = (
    visibility: Parameters<Chatwoot['toggleBubbleVisibility']>[0],
  ) => {
    isLoadTimer().then(() => {
      window.$chatwoot.toggleBubbleVisibility(visibility)
    })
  }

  const popoutChatWindow = () => {
    isLoadTimer().then(() => window.$chatwoot.popoutChatWindow())
  }

  return {
    isModalVisible,
    toggle,
    setUser,
    setCustomAttributes,
    deleteCustomAttribute,
    setLocale,
    setLabel,
    removeLabel,
    reset,
    toggleBubbleVisibility,
    popoutChatWindow,
  }
}

function isLoadTimer() {
  return new Promise((resolve, reject) => {
    let loadNumber = 0
    const timer = setInterval(() => {
      const data = document.querySelector('.woot-widget-holder')
      const widgetElm = document.querySelector('.woot--bubble-holder')

      loadNumber += 1

      if (
        data
        && window.chatwootSDK
        && widgetElm
        && window.$chatwoot
        && window
      ) {
        clearInterval(timer)
        resolve('Chatwoot loaded')
      }
      else if (loadNumber === 200) {
        clearInterval(timer)
        reject(new Error('Chatwoot not loaded'))
      }
    }, 150)
  })
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $chatwoot: OptionPlugin
  }
}
