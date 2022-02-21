import { UnionSchemaType } from '../alias/UnionSchemaType'
import { BaseDefinition } from './BaseDefinition'

export interface UnionDefinition<T extends UnionSchemaType>
  extends BaseDefinition {
  readonly items: T
}
