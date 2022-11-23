import type { Component, VNodeChild } from 'vue'

import type { DeepPartial } from './misc'

export type Width = 'half' | 'half-left' | 'half-right' | 'full' | 'fill'

export interface Column {
  name: string
  table: string
  data_type: string
  default_value: string | null
  max_length: number | null
  numeric_precision: number | null
  numeric_scale: number | null
  is_nullable: boolean
  is_unique: boolean
  is_primary_key: boolean
  is_generated: boolean
  generation_expression?: string | null
  has_auto_increment: boolean
  foreign_key_table: string | null
  foreign_key_column: string | null
  comment?: string | null
  schema?: string
  foreign_key_schema?: string | null
}

export const TYPES = ['data-array', 'data-json'] as const
export type Type = typeof TYPES[number]

export interface FieldMeta {
  id: number
  component?: Component
  hidden: boolean
  options: Record<string, any> | null
  width: Width | null
  note: string | null
  render?: () => VNodeChild
}

export interface FieldRaw {
  collection: string
  field: string
  schema: Column | null
  meta: FieldMeta | null
}

export interface Field extends FieldRaw {
  name: string
  slot: string
  children?: Field[] | null
}

export type RawField = DeepPartial<Field> & { field: string; type: Type }
