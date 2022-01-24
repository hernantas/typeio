import { BaseSchemaDefinition } from './BaseSchemaDefinition'
import { TupleSchemaType } from '../type/TupleSchemaType'

export interface IntersectSchemaDefinition<T extends TupleSchemaType> extends BaseSchemaDefinition {
  readonly items: T
}
