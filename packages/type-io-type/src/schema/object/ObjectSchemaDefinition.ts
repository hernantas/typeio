import { BaseSchemaDefinition } from '../base'
import { ObjectSchemaType } from './ObjectSchemaType'

export interface ObjectSchemaDefinition<T extends ObjectSchemaType> extends BaseSchemaDefinition {
  readonly properties: T
}
