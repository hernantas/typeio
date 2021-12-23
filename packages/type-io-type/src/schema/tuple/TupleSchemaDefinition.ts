import { BaseSchemaDefinition } from '../base'
import { TupleSchemaType } from './TupleSchemaType'

export interface TupleSchemaDefinition<T extends TupleSchemaType> extends BaseSchemaDefinition {
  items: T
}
