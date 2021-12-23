import { UnknownSchema } from '.'
import { TypeOf } from './TypeOf'

export type TypeOfMap<T extends [...UnknownSchema[]]> = {
  [K in keyof T]: T[K] extends UnknownSchema ? TypeOf<T[K]> : never
}
