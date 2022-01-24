import { TypeOf } from '../../schema/helper/TypeOf'
import { NullableSchema } from '../../schema/NullableSchema'
import { AnyCodec } from '../AnyCodec'
import { Codec } from '../Codec'

export class NullableCodec<T extends AnyCodec> implements Codec<NullableSchema<T['schema']>> {
  readonly schema: NullableSchema<T['schema']>

  readonly codec: T

  constructor (codec: T) {
    this.codec = codec
    this.schema = NullableSchema.create(codec.schema)
  }

  decode (value: unknown): TypeOf<T['schema']> | null {
    return value === null ? null : this.codec.decode(value)
  }

  encode (value: TypeOf<T['schema']> | null): TypeOf<T['schema']> | null {
    return this.codec.encode(value)
  }
}
