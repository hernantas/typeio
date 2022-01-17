import { StringSchema } from '../../schema/primitive/StringSchema'
import { Codec } from '../codec/Codec'

export class StringCodec implements Codec<string> {
  readonly type = StringSchema

  readonly base = StringSchema.create()

  decode (value: unknown): string {
    if (this.base.is(value)) {
      return value
    }
    return String(value)
  }

  encode (value: string): string {
    return value
  }
}
