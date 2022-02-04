import { TypeOf } from '../schema/helper/TypeOf'
import { NullableSchema } from '../schema/NullableSchema'
import { Codec } from './interface/Codec'
import { InputOf } from './helper/InputOf'
import { OutputOf } from './helper/OutputOf'
import { SchemaOf } from './helper/SchemaOf'
import { AnyCodec } from './AnyCodec'

export class NullableCodec<T extends AnyCodec>
  implements
    Codec<NullableSchema<SchemaOf<T>>, OutputOf<T> | null, InputOf<T> | null>
{
  readonly schema: NullableSchema<T['schema']>

  readonly codec: T

  constructor(codec: T) {
    this.codec = codec
    this.schema = NullableSchema.create(codec.schema)
  }

  decode(value: InputOf<T>): TypeOf<SchemaOf<T>> | null {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value === null ? null : this.codec.decode(value)
  }

  encode(value: TypeOf<SchemaOf<T>> | null): OutputOf<T> | null {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value === null ? null : this.codec.encode(value)
  }
}
