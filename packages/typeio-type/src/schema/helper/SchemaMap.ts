import { Schema } from '../Schema'

export type SchemaMap<T> = {
  [K in keyof T]: Schema<T[K]>
}
