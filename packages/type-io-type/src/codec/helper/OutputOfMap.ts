import { AnyCodec } from '../AnyCodec'
import { OutputOf } from './OutputOf'

export type OutputOfMap<T> = {
  [K in keyof T]: T[K] extends AnyCodec ? OutputOf<T[K]> : never
}
