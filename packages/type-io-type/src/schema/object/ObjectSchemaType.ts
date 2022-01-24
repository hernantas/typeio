import { AnySchema } from '../AnySchema'

export interface ObjectSchemaType {
  [key: string | number | symbol]: AnySchema
}
