import { BaseSchemaDefinition } from './BaseSchemaDefinition'
import { UnionSchemaType } from '../union/UnionSchemaType'

export interface UnionSchemaDefinition<T extends UnionSchemaType> extends BaseSchemaDefinition {
  readonly items: T
}
