import { Schema } from '../../schema/Schema'
import { CodecAny } from '../alias/CodecAny'

export type CodecMap<T> = {
  [K in keyof T]: CodecAny<Schema<T[K]>>
}
