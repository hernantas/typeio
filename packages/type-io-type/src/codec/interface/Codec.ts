import { SchemaAny } from '../../schema/alias/SchemaAny'
import { TypeOf } from '../../schema/helper/TypeOf'
import { Decoder } from './Decoder'
import { Encoder } from './Encoder'

export interface Codec<
  T extends SchemaAny = SchemaAny,
  O = TypeOf<T>,
  I = unknown
> extends Decoder<TypeOf<T>, I>,
    Encoder<TypeOf<T>, O> {
  /** Supported schema type */
  readonly schema: T
}
