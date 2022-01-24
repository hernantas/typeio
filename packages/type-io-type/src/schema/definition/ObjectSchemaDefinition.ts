import { BaseSchemaDefinition } from './BaseSchemaDefinition'
import { ObjectSchemaType } from '../object/ObjectSchemaType'

export interface ObjectSchemaDefinition<T extends ObjectSchemaType> extends BaseSchemaDefinition {
  readonly properties: T
}
