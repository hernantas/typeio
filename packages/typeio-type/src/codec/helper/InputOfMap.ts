import { CodecAny } from '../alias/CodecAny'
import { InputOf } from './InputOf'

export type InputOfMap<T> = {
  [K in keyof T]: T[K] extends CodecAny ? InputOf<T[K]> : never
}
