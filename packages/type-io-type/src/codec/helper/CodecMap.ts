import { BaseSchema } from '../../schema/BaseSchema'
import { CodecAny } from '../alias/CodecAny'

export type CodecMap<T> = {
  [K in keyof T]: CodecAny<BaseSchema<T[K]>>
}
