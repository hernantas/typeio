import { BaseSchemaDefinition, TypeOfMap } from '../base'
import { UnionSchemaType } from './UnionSchemaType'

export interface UnionSchemaDefinition<T extends UnionSchemaType> extends BaseSchemaDefinition<TypeOfMap<T>> {
  readonly items: T
}
