import { NumberSchema } from '../../schema/primitive/NumberSchema'
import { Codec } from '../codec/Codec'

export class NumberCodec implements Codec<number> {
  readonly type = NumberSchema

  readonly base = this.type.create()

  decode (value: unknown): number {
    if (this.base.is(value)) {
      return value
    }

    const result = Number(value)
    if (Number.isNaN(result)) {
      return result
    }

    throw new Error('Input type cannot be parsed into "Number"')
  }

  encode (value: number): number {
    return value
  }
}
