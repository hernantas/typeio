import { UnionMap } from '../alias/helper/UnionMap'
import { union } from '../schema/builder/union'
import { TypeOfMap } from '../schema/helper/TypeOfMap'
import { UnionSchema } from '../schema/UnionSchema'
import { UnionCodecType } from './alias/UnionCodecType'
import { DecodeError } from './error/DecodeError'
import { EncodeError } from './error/EncodeError'
import { InputOfMap } from './helper/InputOfMap'
import { OutputOfMap } from './helper/OutputOfMap'
import { SchemaOfMap } from './helper/SchemaOfMap'
import { Codec } from './interface/Codec'

export class UnionCodec<T extends UnionCodecType>
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
    this.schema = union(codecs.map((c) => c.schema) as SchemaOfMap<T>)
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
