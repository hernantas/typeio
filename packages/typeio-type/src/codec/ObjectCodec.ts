import { ObjectType } from '../alias/ObjectType'
import { TypeOfMap } from '../schema/helper/TypeOfMap'
import { ObjectSchema } from '../schema/ObjectSchema'
import { ObjectCodecType } from './alias/ObjectCodecType'
import { DecodeError } from './error/DecodeError'
import { InputOfMap } from './helper/InputOfMap'
import { OutputOfMap } from './helper/OutputOfMap'
import { SchemaOfMap } from './helper/SchemaOfMap'
import { Codec } from './Codec'

export class ObjectCodec<T extends ObjectCodecType>
  implements
    Codec<
      ObjectSchema<SchemaOfMap<T>>,
      OutputOfMap<T>,
      InputOfMap<T> | unknown
    >
{
  readonly name: string

  readonly codecs: T

  constructor(codecs: T) {
    this.name = ObjectSchema.createName(
      Object.entries(codecs).map((props) => [props[0], props[1].name])
    )
    this.codecs = codecs
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

    throw new DecodeError(this.name)
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
