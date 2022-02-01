import { BaseDefinition } from './BaseDefinition'
import { ObjectSchemaType } from '../type/ObjectSchemaType'

export interface ObjectDefinition<T extends ObjectSchemaType>
  extends BaseDefinition {
  readonly properties: T
}
