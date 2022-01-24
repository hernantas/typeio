import { BaseSchemaDefinition } from './BaseSchemaDefinition'
import { ObjectSchemaType } from '../type/ObjectSchemaType'

export interface ObjectSchemaDefinition<T extends ObjectSchemaType> extends BaseSchemaDefinition {
  readonly properties: T
}
