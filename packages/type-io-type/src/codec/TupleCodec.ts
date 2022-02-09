import { TupleType } from '../alias/TupleType'
import { TypeOfMap } from '../schema/helper/TypeOfMap'
import { TupleSchema } from '../schema/TupleSchema'
import { CodecAny } from './alias/CodecAny'
import { DecodeError } from './error/DecodeError'
import { OutputOfMap } from './helper/OutputOfMap'
import { SchemaOfMap } from './helper/SchemaOfMap'
import { Codec } from './interface/Codec'

export class TupleCodec<T extends TupleType<CodecAny>>
  implements Codec<TupleSchema<SchemaOfMap<T>>, OutputOfMap<T>>
{
  readonly schema: TupleSchema<SchemaOfMap<T>>

  readonly codecs: T

  constructor(codecs: T) {
    this.codecs = codecs
    this.schema = TupleSchema.create(
      codecs.map((c) => c.schema) as SchemaOfMap<T>
    )
  }

  decode(value: unknown): TypeOfMap<SchemaOfMap<T>> {
    if (Array.isArray(value)) {
      return this.codecs.map((codec, index) =>
        codec.decode(value[index])
      ) as TypeOfMap<SchemaOfMap<T>>
    }

    throw new DecodeError(this.schema.name)
  }

  encode(value: TypeOfMap<SchemaOfMap<T>>): OutputOfMap<T> {
    return this.codecs.map((codec, index) =>
      codec.encode(value[index])
    ) as OutputOfMap<T>
  }
}
