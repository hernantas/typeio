import { BaseSchemaDefinition } from '../base/BaseSchemaDefinition'
import { TypeOfMap } from '../base/TypeOfMap'
import { ObjectSchemaType } from './ObjectSchemaType'

export interface ObjectSchemaDefinition<T extends ObjectSchemaType> extends BaseSchemaDefinition<TypeOfMap<T>> {
  readonly properties: T
}
