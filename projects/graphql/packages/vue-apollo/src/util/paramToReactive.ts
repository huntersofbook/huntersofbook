import type { Ref } from 'vue'
import { computed, isRef, reactive } from 'vue'
import type { ReactiveFunction } from './ReactiveFunction'

type TObject = object

export function paramToReactive<T extends TObject>(param: T | Ref<T> | ReactiveFunction<T>): T | Ref<T> {
  if (isRef(param))
    return param

  else if (typeof param === 'function')
    return computed(param as ReactiveFunction<T>)

  else if (param)
    return reactive(param) as T

  else
    return param
}
