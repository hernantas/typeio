import { ArraySchema } from '../schema/ArraySchema'
import { TypeOf } from '../schema/helper/TypeOf'
import { CodecAny } from './alias/CodecAny'
import { InputOf } from './helper/InputOf'
import { OutputOf } from './helper/OutputOf'
import { SchemaOf } from './helper/SchemaOf'
import { Codec } from './interface/Codec'

export class ArrayCodec<T extends CodecAny>
  implements
    Codec<ArraySchema<SchemaOf<T>>, OutputOf<T>[], InputOf<T>[] | InputOf<T>>
{
  readonly name: string

  readonly codec: T

  constructor(codec: T) {
    this.name = ArraySchema.createName(codec.name)
    this.codec = codec
  }

  decode(value: InputOf<T>[] | InputOf<T>): TypeOf<SchemaOf<T>>[] {
    if (Array.isArray(value)) {
      return value.map((v) => this.codec.decode(v))
    }

    return [this.codec.decode(value)]
  }

  encode(value: TypeOf<SchemaOf<T>>[]): OutputOf<T>[] {
    return value.map((v) => this.codec.encode(v) as OutputOf<T>)
  }
}
