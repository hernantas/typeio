import { SchemaAny } from '../alias/SchemaAny'
import { NullableSchema } from '../NullableSchema'

export function nullable<T extends SchemaAny>(type: T): NullableSchema<T> {
  return new NullableSchema({ name: `Nullable<${type.name}>`, type })
}
