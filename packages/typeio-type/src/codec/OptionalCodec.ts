import { TypeOf } from '../schema/helper/TypeOf'
import { OptionalSchema } from '../schema/OptionalSchema'
import { CodecAny } from './alias/CodecAny'
import { InputOf } from './helper/InputOf'
import { OutputOf } from './helper/OutputOf'
import { SchemaOf } from './helper/SchemaOf'
import { Codec } from './interface/Codec'

export class OptionalCodec<T extends CodecAny>
  implements
    Codec<
      OptionalSchema<SchemaOf<T>>,
      OutputOf<T> | undefined,
      InputOf<T> | undefined
    >
{
  readonly name: string

  readonly codec: T

  constructor(codec: T) {
    this.name = OptionalSchema.createName(codec.name)
    this.codec = codec
  }

  decode(value: InputOf<T> | undefined): TypeOf<SchemaOf<T>> | undefined {
    return value === undefined ? undefined : this.codec.decode(value)
  }

  encode(value: TypeOf<SchemaOf<T>> | undefined): OutputOf<T> | undefined {
    return value === undefined
      ? undefined
      : (this.codec.encode(value) as OutputOf<T>)
  }
}
