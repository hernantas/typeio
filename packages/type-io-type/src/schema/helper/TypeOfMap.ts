import { AnySchema } from '../AnySchema'
import { TypeOf } from './TypeOf'

export type TypeOfMap<T> = {
  [K in keyof T]: T[K] extends AnySchema ? TypeOf<T[K]> : never
}
