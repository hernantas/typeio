import { AnyCodec } from '../AnyCodec'
import { SchemaOf } from './SchemaOf'

export type SchemaOfMap<T> = {
  [K in keyof T]: T[K] extends AnyCodec ? SchemaOf<T[K]> : never
}
