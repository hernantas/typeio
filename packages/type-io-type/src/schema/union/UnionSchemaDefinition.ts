import { BaseSchemaDefinition } from '../base/BaseSchemaDefinition'
import { TypeOfMap } from '../base/TypeOfMap'
import { UnionSchemaType } from './UnionSchemaType'

export interface UnionSchemaDefinition<T extends UnionSchemaType> extends BaseSchemaDefinition<TypeOfMap<T>> {
  readonly items: T
}
