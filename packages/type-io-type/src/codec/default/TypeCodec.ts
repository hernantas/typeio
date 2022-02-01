import { ConstructorType } from '../../alias/ConstructorType'
import { DynamicObjectType } from '../../alias/DynamicObjectType'
import { UnknownMap } from '../../schema/helper/UnknownMap'
import { TypeSchema } from '../../schema/TypeSchema'
import { Codec } from '../Codec'
import { DecodeError } from '../error/DecodeError'
import { CodecMap } from '../helper/CodecMap'

export class TypeCodec<T> implements Codec<TypeSchema<T>, UnknownMap<T>> {
  readonly schema: TypeSchema<T>

  readonly Ctor: ConstructorType<T>

  readonly properties: Partial<CodecMap<T>>

  constructor(Ctor: ConstructorType<T>, properties: Partial<CodecMap<T>>) {
    this.schema = TypeSchema.create(Ctor)
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
          instance[tKey] = codec.decode((value as DynamicObjectType)[key])
        }
      })

      return instance
    }

    throw new DecodeError(this.schema.name)
  }

  encode(value: T): UnknownMap<T> {
    return Object.keys(this.properties).reduce((prev, key) => {
      const tKey = key as keyof T
      const codec = this.properties[tKey]
      return codec !== undefined
        ? {
            ...prev,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
            [tKey]: codec.encode(value[tKey]),
          }
        : prev
    }, {} as UnknownMap<T>)
  }
}
