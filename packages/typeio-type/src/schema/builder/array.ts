import { SchemaAny } from '../alias/SchemaAny'
import { ArraySchema } from '../ArraySchema'

export function array<T extends SchemaAny>(type: T): ArraySchema<T> {
  return ArraySchema.create(type)
}
