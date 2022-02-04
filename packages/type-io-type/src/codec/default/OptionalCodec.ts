import { TypeOf } from '../../schema/helper/TypeOf'
import { OptionalSchema } from '../../schema/OptionalSchema'
import { Codec } from '../interface/Codec'
import { InputOf } from '../helper/InputOf'
import { OutputOf } from '../helper/OutputOf'
import { SchemaOf } from '../helper/SchemaOf'
import { AnyCodec } from './AnyCodec'

export class OptionalCodec<T extends AnyCodec>
  implements
    Codec<
      OptionalSchema<SchemaOf<T>>,
      OutputOf<T> | undefined,
      InputOf<T> | undefined
    >
{
  readonly schema: OptionalSchema<T['schema']>

  readonly codec: T

  constructor(codec: T) {
    this.codec = codec
    this.schema = OptionalSchema.create(codec.schema)
  }

  decode(value: InputOf<T> | undefined): TypeOf<SchemaOf<T>> | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value === undefined ? undefined : this.codec.decode(value)
  }

  encode(value: TypeOf<SchemaOf<T>> | undefined): OutputOf<T> | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value === undefined ? undefined : this.codec.encode(value)
  }
}
