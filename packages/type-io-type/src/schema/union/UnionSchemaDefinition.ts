import { BaseSchemaDefinition } from '../base/BaseSchemaDefinition'
import { UnionSchemaType } from './UnionSchemaType'

export interface UnionSchemaDefinition<T extends UnionSchemaType> extends BaseSchemaDefinition {
  readonly items: T
}
