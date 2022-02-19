import { NumberSchema } from '../schema/NumberSchema'
import { Codec } from './interface/Codec'
import { DecodeError } from './error/DecodeError'
import { number } from '../schema/builder/number'

export class NumberCodec implements Codec<NumberSchema> {
  readonly schema = number()

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
