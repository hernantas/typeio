import { ConstructorType } from '../alias/ConstructorType'
import { ObjectMap } from '../alias/helper/ObjectMap'
import { KeyMap } from '../alias/KeyMap'
import { ObjectType } from '../alias/ObjectType'
import { BaseSchema } from '../schema/BaseSchema'
import { TypeSchema } from '../schema/TypeSchema'
import { CodecAny } from './alias/CodecAny'
import { Codec } from './Codec'
import { DecodeError } from './error/DecodeError'
import { CodecMap } from './helper/CodecMap'

export class TypeCodec<T> implements Codec<TypeSchema<T>, ObjectMap<T>> {
  readonly name: string

  constructor(
    readonly Ctor: ConstructorType<T>,
    readonly properties: Partial<CodecMap<T>>,
    readonly inKey: Partial<KeyMap<T>> = {},
    readonly outKey: Partial<KeyMap<T>> = {}
  ) {
    this.name = TypeSchema.createName(Ctor.name)
  }

  decode(value: unknown): T {
    if (typeof value === 'object' && value !== null) {
      const tValue = value as ObjectType
      const instance = new this.Ctor()

      Object.keys(this.properties).forEach((key) => {
        const tKey = key as keyof T
        const inKey = this.inKey[tKey] ?? tKey
        const codec = this.properties[tKey]
        if (codec !== undefined) {
          instance[tKey] = codec.decode(tValue[inKey])
        }
      })

      return instance
    }

    throw new DecodeError(this.name)
  }

  encode(value: T): ObjectMap<T> {
    return Object.fromEntries(
      Object.entries<CodecAny<BaseSchema<T[keyof T]>> | undefined>(
        this.properties
      ).map(([key, codec]) => [
        key,
        codec !== undefined ? codec.encode(value[key as keyof T]) : undefined,
      ])
    ) as ObjectMap<T>
  }
}
