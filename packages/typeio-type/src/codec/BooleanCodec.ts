import { BooleanSchema } from '../schema/BooleanSchema'
import { Codec } from './Codec'

export class BooleanCodec implements Codec<BooleanSchema> {
  readonly name: string = BooleanSchema.createName()

  decode(value: unknown): boolean {
    if (typeof value === 'boolean') {
      return value
    }

    if (typeof value === 'string' && value === 'false') {
      return false
    }

    return Boolean(value)
  }

  encode(value: boolean): boolean {
    return value
  }
}
