import { BaseSchema } from '../../schema/base/BaseSchema'
import { Decoder } from './Decoder'
import { Encoder } from './Encoder'

export interface Codec<T = unknown, O = T, I = unknown> extends Decoder<T, I>, Encoder<T, O> {
  /**
   * Supported schema type
   */
  readonly schema: BaseSchema<T>
}
