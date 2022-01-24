import { BaseSchemaDefinition } from '../definition/BaseSchemaDefinition'
import { TupleSchemaType } from './TupleSchemaType'

export interface TupleSchemaDefinition<T extends TupleSchemaType> extends BaseSchemaDefinition {
  readonly items: T
}
