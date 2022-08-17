import { Component, ComponentOptions, HTMLAttributes, InputHTMLAttributes } from 'vue'
import { Field } from './fields'
import { DeepPartial } from './misc'

export interface IForm<T> {
  component: Component
  id: HTMLAttributes['id']
  name: keyof T
  label: string
  width?: string[]
  init?: any
  attrs?: Record<string, unknown> | InputHTMLAttributes
  options: DeepPartial<Field>[] | {
    standard: DeepPartial<Field>[]
    advanced: DeepPartial<Field>[]
  } | ComponentOptions | null
}

export interface IFormProps {
  id: string
  name: string
  label: string
  width?: string[]
  init?: any
  attrs?: Record<string, unknown> | InputHTMLAttributes
  options: DeepPartial<Field>[] | {
    standard: DeepPartial<Field>[]
    advanced: DeepPartial<Field>[]
  } | ComponentOptions | null
}

export interface FormData<T> {
  schema: any
  forms: IForm<T>[]
}

export type InputSchema<T, ARRAY extends string> = {
  [key in ARRAY]: FormData<T>
}

