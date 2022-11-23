import {
  Component,
  ComponentOptions,
  HTMLAttributes,
  InputHTMLAttributes,
  VNodeChild,
} from 'vue'

import { Field } from './fields'
import { DeepPartial } from './misc'

export type VueNode = VNodeChild | JSX.Element

export interface IForm<T, K extends Array<String>> {
  component?: Component
  footer?: {
    render?: () => VueNode
    text?: string
  }
  id: HTMLAttributes['id']
  name: keyof T | K[number]
  successMessage?: string
  label: string
  hidden?: boolean
  width?: string[]
  init?: any
  attrs?: Record<string, unknown> | InputHTMLAttributes
  options:
  | DeepPartial<Field>[]
  | {
    standard: DeepPartial<Field>[]
    advanced: DeepPartial<Field>[]
  }
  | ComponentOptions
  | null
}

export interface IFormProps {
  id: string
  name: string
  label: string
  width?: string[]
  init?: any
  attrs?: Record<string, unknown> | InputHTMLAttributes
  options:
  | DeepPartial<Field>[]
  | {
    standard: DeepPartial<Field>[]
    advanced: DeepPartial<Field>[]
  }
  | ComponentOptions
  | null
}

export interface FormData<T, K extends Array<String> = []> {
  schema: any
  forms: IForm<T, K>[]
}

export type InputSchema<
  T,
  ARRAY extends string,
  K extends Array<String> = [],
> = {
  [key in ARRAY]: FormData<T, K>;
}
