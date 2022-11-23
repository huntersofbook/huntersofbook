import { useForm } from 'vee-validate'
import type { Ref } from 'vue'
import { isRef, unref } from 'vue'
import type { SchemaOf } from 'yup'

// Raw value or a ref
export type MaybeRef<T> = Ref<T> | T
// Can't be a raw value
export type LazyOrRef<T> = Ref<T> | (() => T)
// Can be a ref, a getter, or a raw value
export type MaybeLazyRef<T> = MaybeRef<T> | (() => T)

export function isWatchable<T>(value: MaybeLazyRef<T>): value is LazyOrRef<T> {
  return isRef(value) || typeof value === 'function'
}

export function unravel<T>(value: MaybeLazyRef<T>): T {
  if (typeof value === 'function') {
    // casting because there is  a typescript bug
    // https://github.com/microsoft/TypeScript/issues/37663
    return (value as () => T)()
  }

  return unref(value)
}

export function useFormSection<T extends Record<string, any> = Record<string, any>>(
  schema: MaybeRef<{ data: SchemaOf<T> } | undefined>,
  initialValues?: MaybeRef<{ data: T }>,
) {
  const _schema = unravel(schema)
  const _initialValues = unravel(initialValues)

  const options = useForm<T>({
    validationSchema: _schema?.data,
    initialValues: _initialValues?.data,
  })

  function onInvalidSubmit<T>({ errors }: { errors: T }): void {
    const fieldName = Object.keys(errors as any)[0]
    const fieldEl: HTMLInputElement | null = document.querySelector(
      `#${fieldName}`,
    )
    fieldEl?.focus?.()
    fieldEl?.scrollIntoView()
  }

  return {
    form: options,
    onInvalidSubmit,
  }
}
