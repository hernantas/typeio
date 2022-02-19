import { BooleanSchema } from '../schema/BooleanSchema'
import { bool } from '../schema/builder/boolean'
import { Codec } from './interface/Codec'

export class BooleanCodec implements Codec<BooleanSchema> {
  readonly schema = bool()

  decode(value: unknown): boolean {
    if (this.schema.is(value)) {
      return value
    }

    return Boolean(value)
  }

  encode(value: boolean): boolean {
    return value
  }
}
