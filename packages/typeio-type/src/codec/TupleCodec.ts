import { TypeOfMap } from '../schema/helper/TypeOfMap'
import { TupleSchema } from '../schema/TupleSchema'
import { TupleCodecType } from './alias/TupleCodecType'
import { DecodeError } from './error/DecodeError'
import { OutputOfMap } from './helper/OutputOfMap'
import { SchemaOfMap } from './helper/SchemaOfMap'
import { Codec } from './interface/Codec'

export class TupleCodec<T extends TupleCodecType>
  implements Codec<TupleSchema<SchemaOfMap<T>>, OutputOfMap<T>>
{
  readonly name: string

  readonly codecs: T

  constructor(codecs: T) {
    this.name = TupleSchema.createName(codecs.map((codec) => codec.name))
    this.codecs = codecs
  }

  decode(value: unknown): TypeOfMap<SchemaOfMap<T>> {
    if (Array.isArray(value)) {
      return this.codecs.map((codec, index) =>
        codec.decode(value[index])
      ) as TypeOfMap<SchemaOfMap<T>>
    }

    throw new DecodeError(this.name)
  }

  encode(value: TypeOfMap<SchemaOfMap<T>>): OutputOfMap<T> {
    return this.codecs.map((codec, index) =>
      codec.encode(value[index])
    ) as OutputOfMap<T>
  }
}
