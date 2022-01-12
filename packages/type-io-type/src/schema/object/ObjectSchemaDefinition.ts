import { BaseSchemaDefinition, TypeOfMap } from '../base'
import { ObjectSchemaType } from './ObjectSchemaType'

export interface ObjectSchemaDefinition<T extends ObjectSchemaType> extends BaseSchemaDefinition<TypeOfMap<T>> {
  readonly properties: T
}
