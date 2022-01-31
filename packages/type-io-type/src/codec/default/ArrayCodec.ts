import { ArraySchema } from '../../schema/ArraySchema'
import { TypeOf } from '../../schema/helper/TypeOf'
import { Codec } from '../Codec'
import { DecodeError } from '../error/DecodeError'
import { InputOf } from '../helper/InputOf'
import { OutputOf } from '../helper/OutputOf'
import { SchemaOf } from '../helper/SchemaOf'
import { AnyCodec } from './AnyCodec'

export class ArrayCodec<T extends AnyCodec>
  implements
    Codec<ArraySchema<SchemaOf<T>>, OutputOf<T>[], InputOf<T>[] | unknown>
{
  readonly schema: ArraySchema<SchemaOf<T>>

  readonly codec: T

  constructor(codec: T) {
    this.codec = codec
    this.schema = ArraySchema.create(codec.schema)
  }

  decode(value: InputOf<T>[] | unknown): TypeOf<SchemaOf<T>>[] {
    if (Array.isArray(value)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return value.map((v) => this.codec.decode(v))
    }

    throw new DecodeError(this.schema.name)
  }

  encode(value: TypeOf<SchemaOf<T>>[]): OutputOf<T>[] {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value.map((v) => this.codec.encode(v))
  }
}
