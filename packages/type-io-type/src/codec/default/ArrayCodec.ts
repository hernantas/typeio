import { ArraySchema } from '../../schema/ArraySchema'
import { TypeOf } from '../../schema/helper/TypeOf'
import { AnyCodec } from '../AnyCodec'
import { Codec } from '../Codec'

export class ArrayCodec<T extends AnyCodec> implements Codec<ArraySchema<T['schema']>> {
  readonly schema: ArraySchema<T['schema']>

  readonly codec: T

  constructor (codec: T) {
    this.codec = codec
    this.schema = ArraySchema.create(codec.schema)
  }

  decode (value: unknown): Array<TypeOf<T['schema']>> {
    if (Array.isArray(value)) {
      return value.map(v => this.codec.decode(v))
    }
    throw new Error(`Input type cannot be parsed into "${this.schema.name}" type`)
  }

  encode (value: Array<TypeOf<T['schema']>>): Array<TypeOf<T['schema']>> {
    return value.map(v => this.codec.encode(v))
  }
}
