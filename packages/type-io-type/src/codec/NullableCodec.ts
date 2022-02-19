import { nullable } from '../schema/builder/nullable'
import { TypeOf } from '../schema/helper/TypeOf'
import { NullableSchema } from '../schema/NullableSchema'
import { CodecAny } from './alias/CodecAny'
import { InputOf } from './helper/InputOf'
import { OutputOf } from './helper/OutputOf'
import { SchemaOf } from './helper/SchemaOf'
import { Codec } from './interface/Codec'

export class NullableCodec<T extends CodecAny>
  implements
    Codec<NullableSchema<SchemaOf<T>>, OutputOf<T> | null, InputOf<T> | null>
{
  readonly schema: NullableSchema<T['schema']>

  readonly codec: T

  constructor(codec: T) {
    this.codec = codec
    this.schema = nullable(codec.schema)
  }

  decode(value: InputOf<T>): TypeOf<SchemaOf<T>> | null {
    return value === null ? null : this.codec.decode(value)
  }

  encode(value: TypeOf<SchemaOf<T>> | null): OutputOf<T> | null {
    return value === null ? null : (this.codec.encode(value) as OutputOf<T>)
  }
}
