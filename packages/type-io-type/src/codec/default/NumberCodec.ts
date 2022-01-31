import { NumberSchema } from '../../schema/primitive/NumberSchema'
import { Codec } from '../Codec'
import { DecodeError } from '../error/DecodeError'

export class NumberCodec implements Codec<NumberSchema> {
  readonly schema = NumberSchema.create()

  decode(value: unknown): number {
    if (this.schema.is(value)) {
      return value
    }

    const result = Number(value)
    if (!Number.isNaN(result)) {
      return result
    }

    throw new DecodeError(this.schema.name)
  }

  encode(value: number): number {
    return value
  }
}
