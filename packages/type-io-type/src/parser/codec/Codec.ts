import { ConstructorType } from '../../alias/ConstructorType'
import { BaseSchema } from '../../schema/base/BaseSchema'
import { Decoder } from './Decoder'
import { Encoder } from './Encoder'

export interface Codec<T, O = T, I = unknown> extends Decoder<T, I>, Encoder<T, O> {
  /**
   * Supported schema type
   */
  readonly type: ConstructorType<BaseSchema<T>>
}
