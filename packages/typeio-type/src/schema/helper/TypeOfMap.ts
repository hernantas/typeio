import { SchemaAny } from '../alias/SchemaAny'
import { TypeOf } from './TypeOf'

export type TypeOfMap<T> = {
  [K in keyof T]: T[K] extends SchemaAny ? TypeOf<T[K]> : never
}
