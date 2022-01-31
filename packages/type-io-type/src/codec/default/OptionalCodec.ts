import { TypeOf } from '../../schema/helper/TypeOf'
import { OptionalSchema } from '../../schema/OptionalSchema'
import { AnyCodec } from './AnyCodec'
import { Codec } from '../Codec'

export class OptionalCodec<T extends AnyCodec>
  implements Codec<OptionalSchema<T['schema']>>
{
  readonly schema: OptionalSchema<T['schema']>

  readonly codec: T

  constructor(codec: T) {
    this.codec = codec
    this.schema = OptionalSchema.create(codec.schema)
  }

  decode(value: unknown): TypeOf<T['schema']> | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value === undefined ? undefined : this.codec.decode(value)
  }

  encode(
    value: TypeOf<T['schema']> | undefined
  ): TypeOf<T['schema']> | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value === undefined ? undefined : this.codec.encode(value)
  }
}
