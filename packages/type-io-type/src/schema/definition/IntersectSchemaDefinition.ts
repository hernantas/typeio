import { BaseSchemaDefinition } from './BaseSchemaDefinition'
import { TupleSchemaType } from '../tuple/TupleSchemaType'

export interface IntersectSchemaDefinition<T extends TupleSchemaType> extends BaseSchemaDefinition {
  readonly items: T
}
