import { ObjectType } from '../alias/ObjectType'
import { TypeOfMap } from '../schema/helper/TypeOfMap'
import { ObjectSchema } from '../schema/ObjectSchema'
import { CodecAny } from './alias/CodecAny'
import { DecodeError } from './error/DecodeError'
import { InputOfMap } from './helper/InputOfMap'
import { OutputOfMap } from './helper/OutputOfMap'
import { SchemaOfMap } from './helper/SchemaOfMap'
import { Codec } from './interface/Codec'

export class ObjectCodec<T extends ObjectType<CodecAny>>
  implements
    Codec<
      ObjectSchema<SchemaOfMap<T>>,
      OutputOfMap<T>,
      InputOfMap<T> | unknown
    >
{
  readonly schema: ObjectSchema<SchemaOfMap<T>>

  readonly codecs: T

  constructor(codecs: T) {
    this.codecs = codecs
    this.schema = ObjectSchema.create(
      Object.keys(codecs).reduce(
        (prev, key) => ({
          ...prev,
          [key]: codecs[key]?.schema,
        }),
        {} as SchemaOfMap<T>
      )
    )
  }

  decode(value: InputOfMap<T> | unknown): TypeOfMap<SchemaOfMap<T>> {
    if (typeof value === 'object' && value !== null) {
      const tValue = value as ObjectType
      return Object.keys(this.codecs).reduce(
        (prev, key) => ({
          ...prev,
          [key]: this.codecs[key]?.decode(tValue[key]),
        }),
        {} as TypeOfMap<SchemaOfMap<T>>
      )
    }

    throw new DecodeError(this.schema.name)
  }

  encode(value: TypeOfMap<SchemaOfMap<T>>): OutputOfMap<T> {
    return Object.keys(this.codecs).reduce(
      (prev, key) => ({
        ...prev,
        [key]: this.codecs[key]?.encode(value[key]),
      }),
      {} as OutputOfMap<T>
    )
  }
}
