import { AnySchema } from '../base/AnySchema'

export interface ObjectSchemaType {
  [key: string | number | symbol]: AnySchema
}
