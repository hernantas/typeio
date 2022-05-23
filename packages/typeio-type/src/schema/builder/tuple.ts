import { TupleSchemaType } from '../alias/TupleSchemaType'
import { TupleSchema } from '../TupleSchema'

export function tuple<T extends TupleSchemaType>(...items: T): TupleSchema<T> {
  return TupleSchema.create(items)
}
