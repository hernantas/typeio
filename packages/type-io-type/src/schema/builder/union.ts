import { UnionSchemaType } from '../alias/UnionSchemaType'
import { UnionSchema } from '../UnionSchema'

export function union<T extends UnionSchemaType>(...items: T): UnionSchema<T> {
  return UnionSchema.create(items)
}
