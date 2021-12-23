import { BaseSchemaDefinition } from '../base'
import { TupleSchemaType } from '../tuple'

export interface IntersectSchemaDefinition<T extends TupleSchemaType> extends BaseSchemaDefinition {
  readonly items: T
}
