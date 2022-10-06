export * from './create-huntersofbook'
export * from './create-huntersofbook-essential'

// export function useHuntersofbook() {
//   const instance = getCurrentInstance()
//   if (instance == null)
//     throw new Error('useHuntersofbook must be called in a Vue component')
//   if (
//     !instance.isCE &&
//     instance.appContext.app != null &&
//     !instance.appContext.app.__VUE_HUNTERSOFBOOK_SYMBOL__
//   )
//     throw new Error('useHuntersofbook not installed')

//   const huntersofbook = getHuntersofbookInstance(instance)
//   return huntersofbook
// }

// function getHuntersofbookInstance(
//   instance: ComponentInternalInstance
// ): Ihuntersofbook {
//   const huntersofbook = inject(
//     !instance.isCE
//       ? (instance.appContext.app
//           .__VUE_HUNTERSOFBOOK_SYMBOL__ as InjectionKey<Ihuntersofbook>)
//       : ''
//   )

//   if (!huntersofbook) throw new Error('useHuntersofbook not installed')

//   return huntersofbook
// }
