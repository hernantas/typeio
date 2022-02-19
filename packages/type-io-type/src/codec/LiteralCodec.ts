import { LiteralType } from '../alias/LiteralType'
import { BooleanSchema } from '../schema/BooleanSchema'
import { literal } from '../schema/builder/literal'
import { LiteralSchema } from '../schema/LiteralSchema'
import { NumberSchema } from '../schema/NumberSchema'
import { StringSchema } from '../schema/StringSchema'
import { CodecAny } from './alias/CodecAny'
import { BooleanCodec } from './BooleanCodec'
import { DecodeError } from './error/DecodeError'
import { Codec } from './interface/Codec'
import { NumberCodec } from './NumberCodec'
import { StringCodec } from './StringCodec'

export class LiteralCodec<T extends LiteralType>
  implements Codec<LiteralSchema<T>>
{
  readonly schema: LiteralSchema<T>

  readonly value: T

  readonly codec: CodecAny<StringSchema | NumberSchema | BooleanSchema>

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
    this.schema = literal(value)
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
