import { BaseSchemaDefinition } from './BaseSchemaDefinition'
import { TupleSchemaType } from '../tuple/TupleSchemaType'

export interface TupleSchemaDefinition<T extends TupleSchemaType> extends BaseSchemaDefinition {
  readonly items: T
}
