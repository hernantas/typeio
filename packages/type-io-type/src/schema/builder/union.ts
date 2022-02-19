import { UnionType } from '../../alias/UnionType'
import { SchemaAny } from '../alias/SchemaAny'
import { UnionSchema } from '../UnionSchema'

export function union<T extends UnionType<SchemaAny>>(
  items: T
): UnionSchema<T> {
  return UnionSchema.create(items)
}
