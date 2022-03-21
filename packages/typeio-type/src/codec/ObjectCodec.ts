import { KeyMap } from '../alias/KeyMap'
import { ObjectType } from '../alias/ObjectType'
import { TypeOfMap } from '../schema/helper/TypeOfMap'
import { ObjectSchema } from '../schema/ObjectSchema'
import { ObjectCodecType } from './alias/ObjectCodecType'
import { Codec } from './Codec'
import { DecodeError } from './error/DecodeError'
import { InputOfMap } from './helper/InputOfMap'
import { OutputOfMap } from './helper/OutputOfMap'
import { SchemaOfMap } from './helper/SchemaOfMap'

export class ObjectCodec<T extends ObjectCodecType>
  implements
    Codec<
      ObjectSchema<SchemaOfMap<T>>,
      OutputOfMap<T>,
      InputOfMap<T> | unknown
    >
{
  readonly name: string

  readonly inKey: KeyMap<T>

  readonly outKey: KeyMap<T>

  constructor(
    readonly codecs: T,
    inKey: Partial<KeyMap<T>> = {},
    outKey: Partial<KeyMap<T>> = {}
  ) {
    this.name = ObjectSchema.createName(
      Object.entries(codecs).map((props) => [props[0], props[1].name])
    )
    this.inKey = Object.keys(codecs).reduce(
      (prev, key) => ({
        ...prev,
        [key]: inKey[key] ?? key,
      }),
      {} as KeyMap<T>
    )
    this.outKey = Object.keys(codecs).reduce(
      (prev, key) => ({
        ...prev,
        [key]: outKey[key] ?? key,
      }),
      {} as KeyMap<T>
    )
  }

  decode(value: InputOfMap<T> | unknown): TypeOfMap<SchemaOfMap<T>> {
    if (typeof value === 'object' && value !== null) {
      const tValue = value as ObjectType
      return Object.keys(this.codecs).reduce(
        (prev, key: keyof T) => ({
          ...prev,
          [key]: this.codecs[key]?.decode(tValue[this.inKey[key]]),
        }),
        {} as TypeOfMap<SchemaOfMap<T>>
      )
    }

    throw new DecodeError(this.name)
  }

  encode(value: TypeOfMap<SchemaOfMap<T>>): OutputOfMap<T> {
    return Object.keys(this.codecs).reduce(
      (prev, key: keyof T) => ({
        ...prev,
        [this.outKey[key]]: this.codecs[key]?.encode(value[key]),
      }),
      {} as OutputOfMap<T>
    )
  }
}
