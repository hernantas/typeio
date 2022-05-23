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
  implements Codec<ObjectSchema<SchemaOfMap<T>>, OutputOfMap<T>, InputOfMap<T>>
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
      Object.entries(codecs).map(([key, codec]) => [key, codec.name])
    )
    this.inKey = Object.fromEntries(
      Object.keys(codecs).map((key) => [key, inKey[key] ?? key])
    ) as KeyMap<T>
    this.outKey = Object.fromEntries(
      Object.keys(codecs).map((key) => [key, outKey[key] ?? key])
    ) as KeyMap<T>
  }

  decode(value: InputOfMap<T> | unknown): TypeOfMap<SchemaOfMap<T>> {
    if (typeof value === 'object' && value !== null) {
      return Object.fromEntries(
        Object.entries(this.codecs).map(([key, codec]) => [
          key,
          codec.decode((value as ObjectType)[this.inKey[key as keyof T]]),
        ])
      ) as TypeOfMap<SchemaOfMap<T>>
    }

    throw new DecodeError(this.name)
  }

  encode(value: TypeOfMap<SchemaOfMap<T>>): OutputOfMap<T> {
    return Object.fromEntries(
      Object.entries(this.codecs).map(([key, codec]) => [
        this.outKey[key as keyof T],
        codec.encode(value[key]),
      ])
    ) as OutputOfMap<T>
  }
}
