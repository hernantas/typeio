import { ConstructorType } from '../alias/ConstructorType'
import { ObjectMap } from '../alias/helper/ObjectMap'
import { ObjectType } from '../alias/ObjectType'
import { TypeSchema } from '../schema/TypeSchema'
import { DecodeError } from './error/DecodeError'
import { CodecMap } from './helper/CodecMap'
import { Codec } from './Codec'
import { KeyMap } from '../alias/KeyMap'

export class TypeCodec<T> implements Codec<TypeSchema<T>, ObjectMap<T>> {
  readonly name: string

  readonly inKey: KeyMap<T>

  readonly outKey: KeyMap<T>

  constructor(
    readonly Ctor: ConstructorType<T>,
    readonly properties: Partial<CodecMap<T>>,
    inKey: Partial<KeyMap<T>> = {},
    outKey: Partial<KeyMap<T>> = {}
  ) {
    this.name = TypeSchema.createName(Ctor.name)
    this.inKey = Object.keys(properties).reduce(
      (prev, key) => ({
        ...prev,
        [key]: inKey[key as keyof T] ?? key,
      }),
      {} as KeyMap<T>
    )
    this.outKey = Object.keys(properties).reduce(
      (prev, key) => ({
        ...prev,
        [key]: outKey[key as keyof T] ?? key,
      }),
      {} as KeyMap<T>
    )
  }

  decode(value: unknown): T {
    if (typeof value === 'object' && value !== null) {
      const instance = new this.Ctor()

      Object.keys(this.properties).forEach((key) => {
        const tKey = key as keyof T
        const codec = this.properties[tKey]
        if (codec !== undefined) {
          instance[tKey] = codec.decode((value as ObjectType)[this.inKey[tKey]])
        }
      })

      return instance
    }

    throw new DecodeError(this.name)
  }

  encode(value: T): ObjectMap<T> {
    return Object.keys(this.properties).reduce((prev, key) => {
      const tKey = key as keyof T
      const codec = this.properties[tKey]
      return codec !== undefined
        ? {
            ...prev,
            [this.outKey[tKey]]: codec.encode(value[tKey]),
          }
        : prev
    }, {} as ObjectMap<T>)
  }
}
