import { BaseSchema } from './BaseSchema'

export type SchemaMap<T> = {
  [K in keyof T]: BaseSchema<T[K]>
}
