import { ObjectType } from '../../alias/ObjectType'
import { SchemaAny } from '../alias/SchemaAny'
import { ObjectSchema } from '../ObjectSchema'

export function object<T extends ObjectType<SchemaAny>>(
  properties: T
): ObjectSchema<T> {
  return ObjectSchema.create(properties)
}
