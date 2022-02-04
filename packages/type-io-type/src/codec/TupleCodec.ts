import { TupleType } from '../alias/TupleType'
import { TypeOfMap } from '../schema/helper/TypeOfMap'
import { TupleSchema } from '../schema/TupleSchema'
import { Codec } from './interface/Codec'
import { DecodeError } from './error/DecodeError'
import { OutputOfMap } from './helper/OutputOfMap'
import { SchemaOfMap } from './helper/SchemaOfMap'
import { AnyCodec } from './AnyCodec'

export class TupleCodec<T extends TupleType<AnyCodec>>
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        codec.decode(value[index])
      ) as TypeOfMap<SchemaOfMap<T>>
    }

    throw new DecodeError(this.schema.name)
  }

  encode(value: TypeOfMap<SchemaOfMap<T>>): OutputOfMap<T> {
    return this.codecs.map((codec, index) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      codec.encode(value[index])
    ) as OutputOfMap<T>
  }
}
