import { AnyCodec } from '../AnyCodec'
import { InputOf } from './InputOf'

export type InputOfMap<T> = {
  [K in keyof T]: T[K] extends AnyCodec ? InputOf<T[K]> : never
}
