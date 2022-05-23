import { CodecAny } from '../alias/CodecAny'
import { OutputOf } from './OutputOf'

export type OutputOfMap<T> = {
  [K in keyof T]: T[K] extends CodecAny ? OutputOf<T[K]> : never
}
