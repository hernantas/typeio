import { NumberSchema } from '../schema/NumberSchema'
import { DecodeError } from './error/DecodeError'
import { Codec } from './Codec'

export class NumberCodec implements Codec<NumberSchema> {
  readonly name: string = NumberSchema.createName()

  decode(value: unknown): number {
    if (typeof value === 'number') {
      return value
    }

    const result = Number(value)
    if (!Number.isNaN(result)) {
      return result
    }

    throw new DecodeError(this.name)
  }

  encode(value: number): number {
    return value
  }
}
