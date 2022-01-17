import { BooleanSchema } from '../../schema/primitive/BooleanSchema'
import { Codec } from '../codec/Codec'

export class BooleanCodec implements Codec<boolean> {
  readonly type = BooleanSchema

  readonly base = this.type.create()

  decode (value: unknown): boolean {
    if (this.base.is(value)) {
      return value
    }

    return Boolean(value)
  }

  encode (value: boolean): boolean {
    return value
  }
}
