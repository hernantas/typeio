import { AnySchema } from '../../schema/AnySchema'
import { TypeOf } from '../../schema/base/TypeOf'
import { Codec } from '../Codec'

/**
 * Fallback codec. If codec is not found for particular schema, use its own schema
 * to decode/encode
 */
export class DefaultCodec<T extends AnySchema> implements Codec<T> {
  readonly schema: T

  constructor (schema: T) {
    this.schema = schema
  }

  decode (value: unknown): TypeOf<T> {
    if (this.schema.is(value)) {
      return value
    }

    throw new Error(`Input type cannot be parsed into "${this.schema.name}" type`)
  }

  encode (value: TypeOf<T>): TypeOf<T> {
    return value
  }
}
