import { BooleanSchema } from '../../schema/primitive/BooleanSchema'
import { Codec } from '../../codec/Codec'

export class BooleanCodec implements Codec<BooleanSchema> {
  readonly schema = BooleanSchema.create()

  decode (value: unknown): boolean {
    if (this.schema.is(value)) {
      return value
    }

    return Boolean(value)
  }

  encode (value: boolean): boolean {
    return value
  }
}
