import { BaseSchemaDefinition } from '..'
import { TupleSchemaType } from '../tuple'

export interface UnionSchemaDefinition<T extends TupleSchemaType> extends BaseSchemaDefinition {
  readonly items: T
}
