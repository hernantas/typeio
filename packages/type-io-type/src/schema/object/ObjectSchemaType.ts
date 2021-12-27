import { AnySchema } from '../base'

export interface ObjectSchemaType {
  [key: string | number | symbol]: AnySchema
}
