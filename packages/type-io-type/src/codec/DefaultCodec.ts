import { SchemaAny } from '../schema/alias/SchemaAny'
import { TypeOf } from '../schema/helper/TypeOf'
import { DecodeError } from './error/DecodeError'
import { Codec } from './interface/Codec'

/**
 * Fallback codec. If codec is not found for particular schema, use its own
 * schema to decode/encode
 */
export class DefaultCodec<T extends SchemaAny> implements Codec<T> {
  readonly name: string
  readonly schema: T

  constructor(schema: T) {
    this.name = schema.name
    this.schema = schema
  }

  decode(value: unknown): TypeOf<T> {
    if (this.schema.is(value)) {
      return value
    }

    throw new DecodeError(this.schema.name)
  }

  encode(value: TypeOf<T>): TypeOf<T> {
    return value
  }
}
