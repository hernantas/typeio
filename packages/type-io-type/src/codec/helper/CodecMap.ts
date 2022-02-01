import { BaseSchema } from '../../schema/BaseSchema'
import { AnyCodec } from '../default/AnyCodec'

export type CodecMap<T> = {
  [K in keyof T]: AnyCodec<BaseSchema<T[K]>>
}
