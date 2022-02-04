import { IntersectMap } from '../../alias/helper/IntersectMap'
import { IntersectType } from '../../alias/IntersectType'
import { ObjectType } from '../../alias/ObjectType'
import { TypeOfMap } from '../../schema/helper/TypeOfMap'
import { IntersectSchema } from '../../schema/IntersectSchema'
import { Codec } from '../interface/Codec'
import { InputOfMap } from '../helper/InputOfMap'
import { OutputOfMap } from '../helper/OutputOfMap'
import { SchemaOfMap } from '../helper/SchemaOfMap'
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
    /* 
      eslint-disable 
        @typescript-eslint/no-unsafe-return, 
        @typescript-eslint/no-unsafe-assignment, 
        @typescript-eslint/no-unsafe-argument,
        @typescript-eslint/no-unsafe-member-access
    */
    return this.codecs
      .map((c) => c.decode(value))
      .filter((v) => typeof v === 'object')
      .reduce(
        (result, v) =>
          Object.keys(v)
            .filter((k) => !Object.keys(result).includes(k))
            .reduce(
              (prev, key) => ({
                ...prev,
                [key]: v[key],
              }),
              result
            ),
        {} as ObjectType
      )
  }
  encode(
    value: IntersectMap<TypeOfMap<SchemaOfMap<T>>>
  ): IntersectMap<OutputOfMap<T>> {
    /* 
      eslint-disable 
        @typescript-eslint/no-unsafe-return, 
        @typescript-eslint/no-unsafe-assignment, 
        @typescript-eslint/no-unsafe-argument,
        @typescript-eslint/no-unsafe-member-access
    */
    return this.codecs
      .map((c) => c.encode(value))
      .filter((v) => typeof v === 'object')
      .reduce(
        (result, v) =>
          Object.keys(v)
            .filter((k) => !Object.keys(result).includes(k))
            .reduce(
              (prev, key) => ({
                ...prev,
                [key]: v[key],
              }),
              result
            ),
        {} as ObjectType
      )
  }
}
