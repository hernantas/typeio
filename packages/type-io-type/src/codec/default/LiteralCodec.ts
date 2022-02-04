import { LiteralType } from '../../alias/LiteralType'
import { LiteralSchema } from '../../schema/LiteralSchema'
import { BooleanSchema } from '../../schema/BooleanSchema'
import { NumberSchema } from '../../schema/NumberSchema'
import { StringSchema } from '../../schema/StringSchema'
import { Codec } from '../Codec'
import { DecodeError } from '../error/DecodeError'
import { AnyCodec } from './AnyCodec'
import { BooleanCodec } from './BooleanCodec'
import { NumberCodec } from './NumberCodec'
import { StringCodec } from './StringCodec'

export class LiteralCodec<T extends LiteralType>
  implements Codec<LiteralSchema<T>>
{
  readonly schema: LiteralSchema<T>

  readonly value: T

  readonly codec: AnyCodec<StringSchema | NumberSchema | BooleanSchema>

  constructor(value: T) {
    this.value = value
    switch (typeof this.value) {
      case 'string':
        this.codec = new StringCodec()
        break
      case 'number':
        this.codec = new NumberCodec()
        break
      case 'boolean':
        this.codec = new BooleanCodec()
        break
    }
    this.schema = LiteralSchema.create(value)
  }

  decode(value: unknown): T {
    const comparator = this.codec.schema.is(value)
      ? value
      : this.codec.decode(value)
    if (this.schema.is(comparator)) {
      return this.value
    }
    throw new DecodeError(this.schema.name)
  }

  encode(value: T): T {
    return value
  }
}
