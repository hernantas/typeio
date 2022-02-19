import { string } from '../schema/builder/string'
import { StringSchema } from '../schema/StringSchema'
import { Codec } from './interface/Codec'

export class StringCodec implements Codec<StringSchema> {
  readonly schema = string()

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
