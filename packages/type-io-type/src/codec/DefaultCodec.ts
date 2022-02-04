import { AnySchema } from '../schema/AnySchema'
import { TypeOf } from '../schema/helper/TypeOf'
import { Codec } from './interface/Codec'
import { DecodeError } from './error/DecodeError'

/**
 * Fallback codec. If codec is not found for particular schema, use its own schema
 * to decode/encode
 */
export class DefaultCodec<T extends AnySchema> implements Codec<T> {
  readonly schema: T

  constructor(schema: T) {
    this.schema = schema
  }

  decode(value: unknown): TypeOf<T> {
    if (this.schema.is(value)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return value
    }

    throw new DecodeError(this.schema.name)
  }

  encode(value: TypeOf<T>): TypeOf<T> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value
  }
}
