import { ConstructorType } from '../alias/ConstructorType'
import { ObjectMap } from '../alias/helper/ObjectMap'
import { ObjectType } from '../alias/ObjectType'
import { TypeSchema } from '../schema/TypeSchema'
import { DecodeError } from './error/DecodeError'
import { CodecMap } from './helper/CodecMap'
import { Codec } from './interface/Codec'

export class TypeCodec<T> implements Codec<TypeSchema<T>, ObjectMap<T>> {
  readonly name: string

  readonly Ctor: ConstructorType<T>

  readonly properties: Partial<CodecMap<T>>

  constructor(Ctor: ConstructorType<T>, properties: Partial<CodecMap<T>>) {
    this.name = TypeSchema.createName(Ctor.name)
    this.Ctor = Ctor
    this.properties = properties
  }

  decode(value: unknown): T {
    if (typeof value === 'object' && value !== null) {
      const instance = new this.Ctor()

      Object.keys(this.properties).forEach((key) => {
        const tKey = key as keyof T
        const codec = this.properties[tKey]
        if (codec !== undefined) {
          instance[tKey] = codec.decode((value as ObjectType)[key])
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
            [tKey]: codec.encode(value[tKey]),
          }
        : prev
    }, {} as ObjectMap<T>)
  }
}
