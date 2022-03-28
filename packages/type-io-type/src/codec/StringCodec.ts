import { StringSchema } from '../schema/StringSchema'
import { Codec } from './Codec'

export class StringCodec implements Codec<StringSchema> {
  readonly name: string = StringSchema.createName()

  decode(value: unknown): string {
    if (typeof value === 'string') {
      return value
    }
    return String(value)
  }

  encode(value: string): string {
    return value
  }
}
