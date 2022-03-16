import { BooleanSchema } from '../schema/BooleanSchema'
import { Codec } from './interface/Codec'

export class BooleanCodec implements Codec<BooleanSchema> {
  readonly name: string = BooleanSchema.createName()

  decode(value: unknown): boolean {
    if (typeof value === 'boolean') {
      return value
    }

    return Boolean(value)
  }

  encode(value: boolean): boolean {
    return value
  }
}
