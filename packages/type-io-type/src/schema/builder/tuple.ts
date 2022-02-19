import { TupleType } from '../../alias/TupleType'
import { SchemaAny } from '../alias/SchemaAny'
import { TupleSchema } from '../TupleSchema'

export function tuple<T extends TupleType<SchemaAny>>(
  items: T
): TupleSchema<T> {
  return TupleSchema.create(items)
}
