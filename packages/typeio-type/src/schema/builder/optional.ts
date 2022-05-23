import { SchemaAny } from '../alias/SchemaAny'
import { OptionalSchema } from '../OptionalSchema'

export function optional<T extends SchemaAny>(type: T): OptionalSchema<T> {
  return OptionalSchema.create(type)
}
