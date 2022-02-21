import { ObjectSchemaType } from '../alias/ObjectSchemaType'
import { ObjectSchema } from '../ObjectSchema'

export function object<T extends ObjectSchemaType>(
  properties: T
): ObjectSchema<T> {
  return ObjectSchema.create(properties)
}
