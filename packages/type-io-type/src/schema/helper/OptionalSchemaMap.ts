import { ObjectSchemaType } from '../alias/ObjectSchemaType'
import { OptionalSchema } from '../OptionalSchema'

export type OptionalSchemaMap<T extends ObjectSchemaType> = {
  [K in keyof T]: OptionalSchema<T[K]>
}
