import { CodecAny } from '../alias/CodecAny'
import { SchemaOf } from './SchemaOf'

export type SchemaOfMap<T> = {
  [K in keyof T]: T[K] extends CodecAny ? SchemaOf<T[K]> : never
}
