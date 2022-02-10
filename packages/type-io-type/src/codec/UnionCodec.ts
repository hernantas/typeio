import { UnionMap } from '../alias/helper/UnionMap'
import { UnionType } from '../alias/UnionType'
import { TypeOfMap } from '../schema/helper/TypeOfMap'
import { UnionSchema } from '../schema/UnionSchema'
import { CodecAny } from './alias/CodecAny'
import { DecodeError } from './error/DecodeError'
import { EncodeError } from './error/EncodeError'
import { InputOfMap } from './helper/InputOfMap'
import { OutputOfMap } from './helper/OutputOfMap'
import { SchemaOfMap } from './helper/SchemaOfMap'
import { Codec } from './interface/Codec'

export class UnionCodec<T extends UnionType<CodecAny>>
  implements
    Codec<
      UnionSchema<SchemaOfMap<T>>,
      UnionMap<OutputOfMap<T>>,
      UnionMap<InputOfMap<T>>
    >
{
  readonly schema: UnionSchema<SchemaOfMap<T>>

  readonly codecs: T

  constructor(codecs: T) {
    this.codecs = codecs
    this.schema = UnionSchema.create(
      codecs.map((c) => c.schema) as SchemaOfMap<T>
    )
  }

  decode(value: UnionMap<InputOfMap<T>>): UnionMap<TypeOfMap<SchemaOfMap<T>>> {
    for (const codec of this.codecs) {
      try {
        return codec.decode(value)
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    throw new DecodeError(this.schema.name)
  }

  encode(value: UnionMap<TypeOfMap<SchemaOfMap<T>>>): UnionMap<OutputOfMap<T>> {
    for (const codec of this.codecs) {
      try {
        return codec.encode(value) as UnionMap<OutputOfMap<T>>
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    throw new EncodeError(this.schema.name)
  }
}