import { UnionMap } from '../alias/helper/UnionMap'
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
  readonly name: string

  readonly codecs: T

  constructor(codecs: T) {
    this.name = UnionSchema.createName(codecs.map((codec) => codec.name))
    this.codecs = codecs
  }

  decode(value: UnionMap<InputOfMap<T>>): UnionMap<TypeOfMap<SchemaOfMap<T>>> {
    for (const codec of this.codecs) {
      try {
        return codec.decode(value)
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    throw new DecodeError(this.name)
  }

  encode(value: UnionMap<TypeOfMap<SchemaOfMap<T>>>): UnionMap<OutputOfMap<T>> {
    for (const codec of this.codecs) {
      try {
        return codec.encode(value) as UnionMap<OutputOfMap<T>>
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    throw new EncodeError(this.name)
  }
}
