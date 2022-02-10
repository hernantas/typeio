import { StringSchema } from '../schema/StringSchema'
import { Codec } from './interface/Codec'

export class StringCodec implements Codec<StringSchema> {
  readonly schema = StringSchema.create()

  decode(value: unknown): string {
    if (this.schema.is(value)) {
      return value
    }
    return String(value)
  }

  encode(value: string): string {
    return value
  }
}