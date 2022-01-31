import { TypeOfMap } from '../../schema/helper/TypeOfMap'
import { UnionMap } from '../../schema/helper/UnionMap'
import { UnionSchema } from '../../schema/UnionSchema'
import { Codec } from '../Codec'
import { InputOfMap } from '../helper/InputOfMap'
import { OutputOfMap } from '../helper/OutputOfMap'
import { SchemaOfMap } from '../helper/SchemaOfMap'
import { UnionCodecType } from '../type/UnionCodecType'

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
    this.schema = UnionSchema.create(
      codecs.map((c) => c.schema) as SchemaOfMap<T>
    )
  }

  decode(value: UnionMap<InputOfMap<T>>): UnionMap<TypeOfMap<SchemaOfMap<T>>> {
    for (const codec of this.codecs) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return codec.decode(value)
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    throw new Error(`Input type must be "${this.schema.name}"`)
  }

  encode(value: UnionMap<TypeOfMap<SchemaOfMap<T>>>): UnionMap<OutputOfMap<T>> {
    for (const codec of this.codecs) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return codec.encode(value)
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
    throw new Error(`Input type must be "${this.schema.name}"`)
  }
}
