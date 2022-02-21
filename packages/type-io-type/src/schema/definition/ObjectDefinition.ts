import { ObjectSchemaType } from '../alias/ObjectSchemaType'
import { BaseDefinition } from './BaseDefinition'

export interface ObjectDefinition<T extends ObjectSchemaType>
  extends BaseDefinition {
  readonly properties: T
}
