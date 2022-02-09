import { IntersectMap } from '../alias/helper/IntersectMap'
import { IntersectType } from '../alias/IntersectType'
import { ObjectType } from '../alias/ObjectType'
import { TypeOfMap } from '../schema/helper/TypeOfMap'
import { IntersectSchema } from '../schema/IntersectSchema'
import { Codec } from './interface/Codec'
import { InputOfMap } from './helper/InputOfMap'
import { OutputOfMap } from './helper/OutputOfMap'
import { SchemaOfMap } from './helper/SchemaOfMap'
import { AnyCodec } from './AnyCodec'

export class IntersectCodec<T extends IntersectType<AnyCodec>>
  implements
    Codec<
      IntersectSchema<SchemaOfMap<T>>,
      IntersectMap<OutputOfMap<T>>,
      IntersectMap<InputOfMap<T>>
    >
{
  readonly schema: IntersectSchema<SchemaOfMap<T>>

  readonly codecs: T

  constructor(codecs: T) {
    this.codecs = codecs
    this.schema = IntersectSchema.create(
      this.codecs.map((c) => c.schema) as SchemaOfMap<T>
    )
  }

  decode(
    value: IntersectMap<InputOfMap<T>>
  ): IntersectMap<TypeOfMap<SchemaOfMap<T>>> {
    return this.codecs
      .map((c) => c.decode(value))
      .filter((v) => typeof v === 'object')
      .reduce(
        (result, v) => merge(result, v),
        {} as ObjectType
      ) as IntersectMap<TypeOfMap<SchemaOfMap<T>>>
  }

  encode(
    value: IntersectMap<TypeOfMap<SchemaOfMap<T>>>
  ): IntersectMap<OutputOfMap<T>> {
    return (
      this.codecs
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .map((c) => c.encode(value))
        .filter((v) => typeof v === 'object')
        .reduce(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          (result, v) => merge(result, v),
          {} as ObjectType
        ) as IntersectMap<OutputOfMap<T>>
    )
  }
}

function merge<T, U>(base: T, target: U): T & U {
  return {
    ...target,
    ...base,
  }
}
