import { ObjectType } from '../../alias/ObjectType'
import { SchemaAny } from '../alias/SchemaAny'
import { OptionalSchema } from '../OptionalSchema'

export type OptionalSchemaMap<T extends ObjectType<SchemaAny>> = {
  [K in keyof T]: OptionalSchema<T[K]>
}
