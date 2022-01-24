import { LiteralType } from '../../alias/LiteralType'
import { LiteralSchema } from '../../schema/literal/LiteralSchema'
import { Codec } from '../Codec'

export class LiteralCodec<T extends LiteralType> implements Codec<LiteralSchema<T>> {
  readonly schema: LiteralSchema<T>

  constructor (value: T) {
    this.schema = LiteralSchema.create(value)
  }

  decode (value: unknown): T {
    if (this.schema.is(value)) {
      return value
    }

    throw new Error(`Input "${String(value)}" type cannot be parsed into "${this.schema.name}" literal type`)
  }

  encode (value: T): T {
    return value
  }
}
