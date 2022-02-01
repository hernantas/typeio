import { BaseDefinition } from './BaseDefinition'
import { UnionSchemaType } from '../type/UnionSchemaType'

export interface UnionDefinition<T extends UnionSchemaType>
  extends BaseDefinition {
  readonly items: T
}
